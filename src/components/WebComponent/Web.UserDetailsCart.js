import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PaEd2GWcHQSEVCwjoJvb5S1ymSVcku4VWnkrWX6DmUYHw7A2xM750tNMMlvep7ctKnjjHUFMJn703K3sLo4dEPs006cDaWwjV');


const UserDetailsForm = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const getCartItems = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const res = await axios.get('http://localhost:8000/cart/get', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCartItems(res.data);
            calculateTotal(res.data); 
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load cart items. Please try again later.'
            });
        }
    };

    const deleteAllCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete('http://localhost:8000/cart/deleteAll', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 200) {
                setCartItems([]);
                setTotal(0);
            } else {
                
            }
        } catch (err) {
            console.error(err);
           
        }
    };


    useEffect(() => {
        getCartItems();
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price || 0), 0);
        setTotal(total);
    };

    const [userDetails, setUserDetails] = useState({
        fname: '',
        lname: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        contactNumber: ''
    });

    const [paymentMethod, setPaymentMethod] = useState(''); // State to track selected payment method

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/webuser/get', {
                        headers: { 'Authorization': token }
                    });
                    const { fname, lname, email, address, city, zip, contactNumber } = response.data;
                    setUserDetails({ fname, lname, email, address, city, zip, contactNumber });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const token = localStorage.getItem('token');
            const orderDetails = {
                userID: userDetails.id, // Assuming you have user ID in userDetails or fetch it from token
                name: `${userDetails.fname} ${userDetails.lname}`,
                email: userDetails.email,
                address: userDetails.address,
                city: userDetails.city,
                zip: userDetails.zip,
                contactNumber: userDetails.contactNumber,
                totalPrice: total, // Assuming total is already calculated
                orderSummary: cartItems.map(item => `${item.itemDisplayName} = ${item.quantity} = ${item.price}`).join('\n '), // Create order summary
                paymentMethod: paymentMethod,
                orderDate: new Date().toISOString() // Add current date
            };

            const res = await axios.post('http://localhost:8000/cart/submit', orderDetails, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed',
                    text: 'Your order has been placed successfully!'
                });
                deleteAllCartItems(); // Clear cart after order is placed
            } else {
                console.error('Failed to place order');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to place the order. Please try again later.'
                });
            }
        } catch (err) {
            console.error('Error submitting order:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please check your details and try again.'
            });
        }
    };




    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token');
            const line_items = cartItems.map(item => ({
                itemDisplayName: item.itemDisplayName, // Ensure this matches your backend
                price: item.price, // Ensure price is in the correct format
                quantity: item.quantity
            }));
    
            const orderDetails = {
                userID: userDetails.id,
                name: `${userDetails.fname} ${userDetails.lname}`,
                email: userDetails.email,
                address: userDetails.address,
                city: userDetails.city,
                zip: userDetails.zip,
                contactNumber: userDetails.contactNumber,
                totalPrice: total,
                orderSummary: cartItems.map(item => `${item.itemDisplayName} = ${item.quantity} = ${item.price}`).join('\n '),
                paymentMethod: paymentMethod,
                orderDate: new Date().toISOString(),
                line_items: line_items, // Added line_items to the request
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel'
            };
    
            // Call your backend to create a Stripe Checkout Session
            const response = await axios.post('http://localhost:8000/payment', orderDetails, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            const sessionId = response.data.sessionId;
    
            // Redirect to Stripe Checkout
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({
                sessionId: sessionId
            });
    
            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.error.message
                });
            }
        } catch (error) {
            console.error('Error during payment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to initiate payment. Please try again.'
            });
        }
    };
    
    
    



    return (
        <Form onSubmit={handleOrderSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={`${userDetails.fname} ${userDetails.lname}`}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    name="city"
                    value={userDetails.city}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    type="text"
                    name="zip"
                    value={userDetails.zip}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formcontactNumber">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                    type="text"
                    name="contactNumber"
                    value={userDetails.contactNumber}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <div>
                    <Form.Check
                        type="radio"
                        label="Cash on Delivery"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        checked={paymentMethod === 'cashOnDelivery'}
                        onChange={handlePaymentMethodChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Proceed to Pay"
                        name="paymentMethod"
                        value="proceedToPay"
                        checked={paymentMethod === 'proceedToPay'}
                        onChange={handlePaymentMethodChange}
                    />
                </div>
            </Form.Group>

            {paymentMethod === 'cashOnDelivery' && (
                <Button variant="primary" type="submit" onClick={handleOrderSubmit}>
                    Submit Order
                </Button>
            )}
            {paymentMethod === 'proceedToPay' && (
                <Button variant="primary" type="button" onClick={handlePayment}>
                    Proceed to Payment 
                </Button>
            )}
        </Form>
    );
};

export default UserDetailsForm;