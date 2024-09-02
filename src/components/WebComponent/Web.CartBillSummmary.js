import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const CartSummary = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const getCartItems = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const res = await axios.get('https://acconex-backend.vercel.app/cart/get', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCartItems(res.data);
            calculateTotal(res.data); 
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

    return (
        <div style={{ width: '100%' }}>
            {cartItems.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price(LKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item._id}>
                                <td><img src={item.image} alt={item.itemDisplayName} style={{ width: '50px', height: '50px' }} />{item.itemDisplayName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price ? item.price.toFixed(2) : '0.00'}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2"><strong>Total(LKR)</strong></td>
                            <td><strong>{total.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default CartSummary;
