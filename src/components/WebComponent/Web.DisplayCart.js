import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

function DisplayCart({ show, handleClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const Navigate = useNavigate();

  // Get cart items
  const getCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const res = await axios.get('http://localhost:8000/cart/get', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCartItems(res.data);
      calculateTotal(res.data); // Calculate total when cart items are fetched
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (show) {
      getCartItems();
      
    }
  }, [show]);
  


  // Handle quantity change
  const handleQuantityChange = (item_id, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item._id === item_id) {
        const unitPrice = item.price / item.quantity;
        const updatedPrice = unitPrice * newQuantity;
        item.quantity = newQuantity;
        item.price = updatedPrice;
        updateCart(item_id, newQuantity, updatedPrice); // Update the cart in the backend
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // Remove item from cart
  const removeItem = async (item_id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const res = await axios.delete('http://localhost:8000/cart/delete', {
        data: { item_id },
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        }
      });
      if (res.status === 200) {
        console.log('Item removed from cart');
        const updatedItems = cartItems.filter(item => item._id !== item_id);
        setCartItems(updatedItems);
        calculateTotal(updatedItems); // Recalculate total after removing an item
        window.dispatchEvent(new Event('refreshPage')); // Trigger page refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update cart quantity and price
  const updateCart = async (item_id, quantity, price) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const res = await axios.put('http://localhost:8000/cart/update', {
        item_id,
        quantity,
        price
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        }
      });
      if (res.status === 200) {
        console.log('Cart updated');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotal(total);
  };

  //navigate to checkout page
  const handleCheckout = () => {
    Navigate('/web/checkout');
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '800px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td><img src={item.image} alt={item.itemDisplayName} style={{ width: '50px', height: '50px' }} /></td>
                  <td>{item.itemDisplayName}</td>
                  <td>
                    <input 
                      type="number" 
                      value={item.quantity || 1} 
                      onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>{item.price ? item.price.toFixed(2) : '0.00'}</td>
                  <td>
                    {/* Apply Bootstrap classes to the button */}
                    <Button variant="link" className="text-danger" onClick={() => removeItem(item._id)}>
                      <DeleteOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3">Total</td>
                <td>{total.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="5">
                  <Button variant="success" onClick={handleCheckout}>Checkout</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <h3 className='text-center' >Your cart is empty <br/> Please Login to the System First </h3>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default DisplayCart;
