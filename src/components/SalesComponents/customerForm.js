import React from 'react';
import '../../styles/customer.css';
import { CloseOutlined } from '@ant-design/icons';

const CustomerForm = ({ handleSubmit, handleOnChange, handleClose, formData }) => {
  
  // Function to handle input change and restrict to numeric values for mobile field
  const handleMobileChange = (e) => {
    let { value } = e.target;
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');
    
    // If non-numeric characters were found
    if (value !== e.target.value) {
        alert('Only numbers are allowed');
        return;
    }
    
    // Truncate the value if it exceeds 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
        alert('Limit to 10');
    }
    
    
    // Update the form data
    handleOnChange({ target: { name: 'mobile', value } });
};

//function for only allow letters for name
const handleNameAddressChange =(e)=>{
  let{value}=e.target;
  //remove number
  value = value.replace(/[^A-Za-z]/g, '');
   if (value !== e.target.value) {
    alert('Only letter are allowed');
    return;
}
handleOnChange({target:{name:e.target.name,value}});

};

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (Object.values(formData).some(value => typeof value === 'string' && value.trim() === '')) {
      alert('Please fill in all fields.');
      return;
    }
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
        <input type='text' id='cusid' name='cusid' onChange={handleOnChange} value={formData.cusid}  />

        <label htmlFor='name'>Customer Name :</label>
        <input type='text' id='name' name='name' onChange={handleNameAddressChange} value={formData.name} />

        <label htmlFor='address'>Customer Address :</label>
        <input type='text' id='address' name='address' onChange={handleOnChange} value={formData.address} alert='can only enter character'/>

        <label htmlFor='mobile'>Contact NO :</label>
        {/* Use input type "tel" to bring up numeric keypad on mobile devices */}
        <input type='tel' id='mobile' name='mobile' onChange={handleMobileChange} value={formData.mobile} maxLength={10} minLength={10} />

        <button className='btn'>Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
