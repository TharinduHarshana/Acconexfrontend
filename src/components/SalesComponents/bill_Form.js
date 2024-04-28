// bill_Form.js

import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const BillForm = ({ handleClose, handleConfirmAddToBill, selectedItem, invoiceNo, setInvoiceNo, date, setDate }) => {
  const [formData, setFormData] = useState({
    product: '',
    price: '',
    quantity: '1',
    discount: '0.00',
  });


  useEffect(() => {
    if (selectedItem) {
      // Update the formData state with the fetched data
      setFormData({
        product: selectedItem.displayName,
        price: selectedItem.sellingPrice,
        quantity:'1',
        discount: '0.00', // You may fetch discount data as well if available
      });
    }
    
  }, [selectedItem]);
 
    // Function to generate invoice number


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

      <label htmlFor='invoice'>Invoice NO:</label>
      <input type='text' id='invoice' name='invoice'  value={invoiceNo} readOnly />

      <label htmlFor='cashire'>Cashier:</label>
      <input type='text' id='cashire' name='cashire'  />

      <label htmlFor='date'>Date & Time:</label>
      <input type='text' id='date' name='date' value={date} readOnly />

      <label htmlFor='product'>Product Name:</label>
      <input type='text' id='product' name='product' value={formData.product} readOnly />

      <label htmlFor='price'>Price:</label>
      <input type='text' id='price' name='price' value={formData.price} readOnly />

      <label htmlFor='quantity'>Quantity:</label>
      <input type='number' id='quantity' name='quantity' value={formData.quantity} onChange={handleChange} />

      <label htmlFor='discount'>Discount:</label>
      <input type='text' id='discount' name='discount' value={formData.discount} onChange={handleChange}  />

      <button className='btn' type='submit'>Add to Bill</button>
    </form>
  );
};

export default BillForm;
