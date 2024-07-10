import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DefaultHandle from "../components/DefaultHandle";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Modal as AntdModal } from "antd";
import Swal from "sweetalert2";

function WebCODorders() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCodConfirmOrders();
  }, []);

  const getCodConfirmOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/cart/codOrders", {
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
    const items = orderSummary.split("\n").map((item) => {
      const [itemName, quantity, price] = item.split(" = ");
      return (
        <div key={itemName}>
          <div>Item name: {itemName}</div>
          <div>Quantity: {quantity}</div>
          <div>Price(LKR): {price}</div>
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

  const handleConfirm = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTrackingCodeChange = (event) => {
    setTrackingCode(event.target.value);
  };

  const handleModalConfirm = async () => {
    try {
      const res = await axios.post("http://localhost:8000/cart/updateOrder", {
        orderId: selectedOrder.id,
        trackingCode,
      });
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Tracking Code Confirmed',
          text: 'The tracking code has been updated successfully!',
        });
        getCodConfirmOrders(); // Refresh the order list
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update tracking code. Please try again later.',
      });
    }
  };

  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contactNumber,
      sortable: true,
      wrap: true,
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice,
      sortable: true,
      wrap: true,
    },
    {
      name: "Order Summary",
      selector: (row) => getOrderSummaryString(row),
      sortable: true,
      wrap: true,
      minWidth: "400px", // Adjust the minimum width of the column
    },
    {
      name: "Action",
      cell: (row) => <Link onClick={() => handleConfirm(row)}>Confirm</Link>,
    },
  ];

  const closeModal = () => {
    setIsAccessDeniedVisible(false);
    navigate("/admin/dashboard");
  };

  return (
    <DefaultHandle>
      <div style={{ display: "flex", height: "500px", overflow: "auto" }}>
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Tracking Code:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="trackingCode">
              <Form.Label>Tracking Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tracking code"
                onChange={handleTrackingCodeChange}
              />
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
      <AntdModal
        title="Access Denied!"
        visible={isAccessDeniedVisible}
        onCancel={closeModal}
        footer={[
          <button onClick={closeModal} key="back">
            OK
          </button>,
        ]}
      >
        <p>You do not have permission to view this page.</p>
      </AntdModal>
    </DefaultHandle>
  );
}

export default WebCODorders;
