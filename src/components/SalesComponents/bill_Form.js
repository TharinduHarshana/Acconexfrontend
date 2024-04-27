// bill_Form.js

import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const BillForm = ({ handleClose, handleConfirmAddToBill, selectedItem }) => {
  const [formData, setFormData] = useState({
    product: '',
    price: '',
    quantity: '',
    discount: '',
  });

  // Fetch item details when selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      // Fetch additional data related to the selected item
      const fetchItemData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/item/${selectedItem.productID}}`); // Assuming selectedItem has an id property
          const itemData = response.data; // Adjust this according to your API response structure
          // Update the formData state with the fetched data
          setFormData({
            product: itemData.product,
            price: itemData.price,
            quantity: itemData.quantity,
            discount: '', // You may fetch discount data as well if available
          });
        } catch (error) {
          console.error('Error fetching item data:', error.message);
        }
      };
      fetchItemData();
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirmAddToBill(formData);
    handleClose();
  };

  return (
    <form className='modal-content' onSubmit={handleSubmit}>
      <div className='close-btn' onClick={handleClose}>
        <CloseOutlined />
      </div>

      <label htmlFor='product'>Product Name:</label>
      <input type='text' id='product' name='product' value={formData.product} onChange={handleChange} />

      <label htmlFor='price'>Price:</label>
      <input type='text' id='price' name='price' value={formData.price} onChange={handleChange} />

      <label htmlFor='quantity'>Quantity:</label>
      <input type='number' id='quantity' name='quantity' value={formData.quantity} onChange={handleChange} />

      <label htmlFor='discount'>Discount:</label>
      <input type='number' id='discount' name='discount' value={formData.discount} onChange={handleChange} />

      <button className='btn' type='submit'>Add to Bill</button>
    </form>
  );
};

export default BillForm;
