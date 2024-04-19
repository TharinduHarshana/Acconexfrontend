import React, { useState } from 'react';
import '../../styles/customer.css';
import { CloseOutlined } from '@ant-design/icons';

const CustomerForm = ({ handleSubmit, handleOnChange, handleClose, formData ,editing}) => {
  const [mobileError, setMobileError] = useState('');

  // Function to handle input change and restrict to numeric values for mobile field
  const handleMobileChange = (e) => {
    let { value } = e.target;
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');
  
    if (!/^[0-9]+$/.test(value)) {
      setMobileError('Only numbers are allowed');
    } else {
      setMobileError('');
    }
  
    // Truncate the value if it exceeds 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
  
    // Update the form data
    handleOnChange({ target: { name: 'mobile', value } });
    if(!/^\d{10}$/.test(value)){
      setMobileError('please enter a vlid 10- digit mobile number');

    }
    else{
      setMobileError('');
    }
  };
  

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Check if mobile number is 10 digits
    if (formData.mobile.length !== 10) {
      setMobileError('Mobile number must be 10 digits long.');
    } else {
      setMobileError('');
      // Call the handleSubmit function passed as prop
      handleSubmit(e);
    }
  };

  return (
    <div className='addContainer'>
      <form onSubmit={onSubmit}>
        <div className='close-btn' onClick={handleClose}>
          <CloseOutlined />
        </div>
        <label htmlFor='cusid'>Customer ID :</label>
        <input type='text' id='cusid' name='cusid' onChange={handleOnChange} value={formData.cusid} required  disabled={editing}/>

        <label htmlFor='name'>Customer Name :</label>
        <input type='text' id='name' name='name' onChange={handleOnChange} value={formData.name} required pattern="[A-Za-z]+" title="Only letters allowed" />

        <label htmlFor='address'>Customer Address :</label>
        <input type='text' id='address' name='address' onChange={handleOnChange} value={formData.address} required />

        <label htmlFor='mobile'>Contact NO :</label>
        <input type='tel' id='mobile' name='mobile' onChange={handleMobileChange} value={formData.mobile} maxLength={10} minLength={10} required pattern='[0-9]+' title='Only numbers are allowed'/>
        {mobileError && <p className="error">{mobileError}</p>}

        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
