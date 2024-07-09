import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DefaultHandle from '../components/DefaultHandle';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';

function WebCODorders() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');
    const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);

    useEffect(() => {
        getCodConfirmOrders();
    }, []);

    const getCodConfirmOrders = async () => {
        try {
            const res = await axios.get('http://localhost:8000/cart/codOrders', {
                withCredentials: true,
            });
            setOrderDetails(res.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 403) {
                setIsAccessDeniedVisible(true);
            } else {
                swal({
                    title: "Error",
                    text: "An error occurred while fetching COD orders.",
                    icon: "error",
                    button: "OK",
                });
            }
        }
    };

    const getOrderSummaryString = (row) => {
        const { orderSummary, address, city, zip } = row;
        const items = orderSummary.split('\n').map(item => {
            const [itemName, quantity, price] = item.split(' = ');
            return (
                <div key={itemName}>
                    <div>Item name: {itemName}</div>
                    <div>Quantity: {quantity}</div>
                    <div>Price: {price}</div>
                    <br />
                </div>
            );
        });
    
        return (
            <div>
                {items}
                <div>Address: {address}</div>
                <div>City: {city}</div>
                <div>Zip: {zip}</div>
            </div>
        );
    };

    const handleConfirm = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTrackingCodeChange = (event) => {
        setTrackingCode(event.target.value);
    };

    const handleModalConfirm = () => {
        // Send the tracking code to the server or perform any other action
        console.log('Tracking code:', trackingCode);
        // Close the modal
        setShowModal(false);
    };

    const columns = [
        {
            name: 'Customer Name',
            selector: row => row.name,
            sortable: true,
            wrap: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            wrap: true
        },
        {
            name: 'Contact Number',
            selector: row => row.contactNumber,
            sortable: true,
            wrap: true
        },
        {
            name: 'Total Price',
            selector: row => row.totalPrice,
            sortable: true,
            wrap: true
        },
        {
            name: 'Order Summary',
            selector: row => getOrderSummaryString(row),
            sortable: true,
            wrap: true,
            minWidth: '400px' // Adjust the minimum width of the column
        },
        {
            name: 'Action',
            cell: row => (
                <Link onClick={() => handleConfirm(row)}>
                    Confirm
                </Link>
            ),
        }
    ];

    return (
        <DefaultHandle>
            <div style={{ display: 'flex', height: '500px', overflow: 'auto' }}>
                <div style={{ flex: 1 }}>
                    <DataTable
                        title="Cash on Delivery Orders"
                        columns={columns}
                        data={orderDetails}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        noHeader 
                    />
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Enter Tracking Code:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="trackingCode">
                            <Form.Label>Tracking Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter tracking code" onChange={handleTrackingCodeChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalConfirm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                title="Access Denied!"
                show={isAccessDeniedVisible}
                onHide={() => setIsAccessDeniedVisible(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Access Denied!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You do not have permission to view this page.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsAccessDeniedVisible(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </DefaultHandle>
    );
}

export default WebCODorders;
