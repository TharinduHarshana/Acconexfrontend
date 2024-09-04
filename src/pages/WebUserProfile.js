import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form, Button, Col, Row, Image, Container, Card } from 'react-bootstrap';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../components/InventoryComponent/firebase';
import WebHeader from '../components/WebComponent/WebHeader';
import WebFooter from '../components/WebComponent/WebFooter';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you import Bootstrap CSS

function WebUserProfile() {
    const [userDetails, setUserDetails] = useState({});
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        contactNumber: '',
        profileImage: '',
        shippingAddres: '',
        shippingCity: '',
        shippingZip: '',
        shippingContactNumber: ''
    });
    const [file, setFile] = useState('');
    const [percent, setPercent] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert('Please upload an image first!');
            return;
        }

        const storageRef = ref(storage, `/profiles/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUserData({ ...userData, profileImage: url });
                });
            }
        );
    };

    const handleUpdateUserData = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.put('https://acconex-backend.vercel.app/webuser/update', userData, {
                    headers: { 'Authorization': token }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message
                });
                setEditMode(false);
                setUserDetails(userData);
            } catch (error) {
                console.error('Error updating user details:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update user details. Please try again later.'
                });
            }
        }
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://acconex-backend.vercel.app/webuser/get', {
                        headers: { 'Authorization': token }
                    });
                    const { fname, lname, email, address, city, zip, contactNumber, profileImage, shippingAddres, shippingCity, shippingZip, shippingContactNumber } = response.data;
                    setUserDetails({ fname, lname, email, address, city, zip, contactNumber, profileImage, shippingAddres, shippingCity, shippingZip, shippingContactNumber });
                    setUserData({ fname, lname, email, address, city, zip, contactNumber, profileImage, shippingAddres, shippingCity, shippingZip, shippingContactNumber });
                } catch (error) {
                    console.error('Error fetching user details:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to load user details. Please try again later.'
                    });
                }
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <WebHeader />
            <Container className="mt-0" style={{ padding: '60px' }}>
                {!editMode ? (
                    <Row className="justify-content-left">
                    <Col md={4} className="text-center">
                        <Card.Body>
                            <Card.Title style={{ fontSize: '25px' }}>{userDetails.fname} {userDetails.lname}</Card.Title>
                            <hr></hr>
                            {userDetails.profileImage && (
                                <Image src={userDetails.profileImage} roundedCircle fluid className="" />
                            )}
                        </Card.Body>
                    </Col>
                    <Col md={4}>
                        <Card.Body>
                            <Card.Title style={{ fontSize: '25px' }}>User Details</Card.Title>
                            <hr></hr>  
                            <table style={{ fontSize: '15px', borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Email:</td><td>{userDetails.email}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Contact Number:</td><td>{userDetails.contactNumber}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Address:</td><td>{userDetails.address}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>City:</td><td>{userDetails.city}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Zip Code:</td><td>{userDetails.zip}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Col>
                    <Col md={4}>
                        <Card.Body>
                            <Card.Title style={{ fontSize: '25px' }}>Shipping Details</Card.Title>
                            <hr></hr>
                            <table style={{ fontSize: '15px', borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Shipping Address:</td><td>{userDetails.shippingAddres}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Shipping City:</td><td>{userDetails.shippingCity}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Shipping Zip Code:</td><td>{userDetails.shippingZip}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                                        <td>Shipping Contact Number:</td><td>{userDetails.shippingContactNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Col>
                    <Row>
                        <Button variant="primary" onClick={() => setEditMode(true)} className="mt-2" style={{width:'20%', align:''}}>Edit Details</Button>
                    </Row>
                </Row>
                
                ) : (
                    <Form onSubmit={handleUpdateUserData}>
                        <Row className="justify-content-center mb-3">
                            <Col md={4} className="text-center">
                                {userData.profileImage && (
                                    <Image src={userData.profileImage} roundedCircle fluid className="mb-3" />
                                )}
                                <Button variant="secondary" onClick={() => fileInputRef.current.click()}>
                                    Choose File
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                {file && (
                                    <div className="mt-2">
                                        <Button variant="secondary" onClick={handleUpload}>Upload</Button>
                                        <p>{percent}% done</p>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formFname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fname"
                                        value={userData.fname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formLname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lname"
                                        value={userData.lname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formContactNumber">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contactNumber"
                                        value={userData.contactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={userData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={userData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formZip">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zip"
                                        value={userData.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <h4>Shipping Details</h4>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formShippingAddres">
                                    <Form.Label>Shipping Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="shippingAddres"
                                        value={userData.shippingAddres}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formShippingCity">
                                    <Form.Label>Shipping City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="shippingCity"
                                        value={userData.shippingCity}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formShippingZip">
                                    <Form.Label>Shipping Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="shippingZip"
                                        value={userData.shippingZip}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formShippingContactNumber">
                                    <Form.Label>Shipping Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="shippingContactNumber"
                                        value={userData.shippingContactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        <Button variant="secondary" onClick={() => setEditMode(false)} className="ms-2">
                            Cancel
                        </Button>
                    </Form>
                )}
            </Container>
            <WebFooter />
        </div>
    );
}

export default WebUserProfile;
