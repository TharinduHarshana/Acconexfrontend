import React from 'react';
import '../../styles/customer.css';
import { CloseOutlined } from '@ant-design/icons';


const CustomerForm = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  return (
   
    <div className='addContainer'>
      <form onSubmit={handleSubmit}>
        <div className='close-btn' onClick={handleClose}>
          <CloseOutlined />
        </div>
        <label htmlFor='cusid'>Customer ID :</label>
        <input type='text' id='cusid' name='cusid' onChange={handleOnChange} value={rest.cusid} />

        <label htmlFor='name'>Customer Name :</label>
        <input type='text' id='name' name='name' onChange={handleOnChange} value={rest.name} />

        <label htmlFor='address'>Customer Address :</label>
        <input type='text' id='address' name='address' onChange={handleOnChange} value={rest.address} />

        <label htmlFor='mobile'>Contact NO :</label>
        <input type='text' id='mobile' name='mobile' onChange={handleOnChange} value={rest.mobile} />

        <button className='btn'>Submit</button>
      </form>
    </div>
    
  );
}

export default CustomerForm;
