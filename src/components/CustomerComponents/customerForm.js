import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const CustomerForm = ({ handleSubmit, handleClose, formData = {}, editing, handleUpdate }) => {
  const [mobileError, setMobileError] = useState('');
  const [customerData, setCustomerData] = useState({
    cusid: formData.cusid || '',
    name: formData.name || '',
    address: formData.address || '',
    mobile: formData.mobile || '',
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleMobileChange = (e) => {
    let { value } = e.target;
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    if (!/^[0-9]+$/.test(value)) {
      setMobileError('Only numbers are allowed');
    } else if (value.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number');
    } else {
      setMobileError('');
    }

    // Truncate the value if it exceeds 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Update the form data
    setCustomerData({
      ...customerData,
      mobile: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(customerData);
  };

  return (
    <div className='addContainer'>
      <form onSubmit={onSubmit}>
        <div className='close-btn' onClick={handleClose}>
          <CloseOutlined />
        </div>

        <label htmlFor='cusid'>Customer ID :</label>
        <input type='text' id='cusid' name='cusid' value={customerData.cusid} onChange={handleInputChange} required disabled={editing}/>

        <label htmlFor='name'>Customer Name :</label>
        <input type='text' id='name' name='name' value={customerData.name} onChange={handleInputChange} required />

        <label htmlFor='address'>Customer Address :</label>
        <input type='text' id='address' name='address' value={customerData.address} onChange={handleInputChange} required />

        <label htmlFor='mobile'>Contact NO :</label>
        <input type='tel' id='mobile' name='mobile' onChange={handleMobileChange} value={customerData.mobile} maxLength={10} minLength={10} required pattern='[0-9]+' title='Only numbers are allowed' />
        {mobileError && <p className="error">{mobileError}</p>}

        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
