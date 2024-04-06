import React from 'react';
import '../../styles/customer.css';
import { CloseOutlined } from '@ant-design/icons';

const CustomerForm = ({ handleSubmit, handleOnChange, handleClose, formData }) => {
  
  // Function to handle input change and restrict to numeric values for mobile field
  const handleMobileChange = (e) => {
    let { value } = e.target;
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');
    // Truncate the value if it exceeds 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    // Update the form data
    handleOnChange({ target: { name: 'mobile', value } });
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Call the handleSubmit function passed as prop
    handleSubmit(e);
  };

  return (
    <div className='addContainer'>
      <form onSubmit={onSubmit}>
        <div className='close-btn' onClick={handleClose}>
          <CloseOutlined />
        </div>
        <label htmlFor='cusid'>Customer ID :</label>
        <input type='text' id='cusid' name='cusid' onChange={handleOnChange} value={formData.cusid} required />

        <label htmlFor='name'>Customer Name :</label>
        <input type='text' id='name' name='name' onChange={handleOnChange} value={formData.name} required pattern="[A-Za-z]+" title="Only letters allowed" />

        <label htmlFor='address'>Customer Address :</label>
        <input type='text' id='address' name='address' onChange={handleOnChange} value={formData.address} required />

        <label htmlFor='mobile'>Contact NO :</label>
        <input type='tel' id='mobile' name='mobile' onChange={handleMobileChange} value={formData.mobile} maxLength={10} minLength={10} required />

        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
