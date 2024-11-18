import React, { useState , useEffect} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import "../../styles/customer.css";
import { message } from 'antd';


const CustomerForm = ({ handleSubmit, handleClose, formData = {}, editing, }) => {
  const [mobileError, setMobileError] = useState('');
  const [customerData, setCustomerData] = useState({
    cusid: formData.cusid || '',
    name: formData.name || '',
    address: formData.address || '',
    mobile: formData.mobile || '',
  });
  
  useEffect(() => {
    setCustomerData(formData);
  }, [formData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  //handle the mobile error
  const handleMobileChange = (e) => {
    let { value } = e.target;
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');

    if (!/^[0-9]+$/.test(value)) {
      message.error('Only numbers are allowed');
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

  const mobileUnique = (mobile) => {
    // Assuming you have a way to access the list of customers (e.g., via props or fetching it from a context or global state)
    const existingCustomers = []; // Replace with actual customer list
    message.error('The mobile number already exists. Please use a different mobile number.');
    return !existingCustomers.some(customer => customer.mobile === mobile);
  };
  
 
  //validate form(check empty)
  const validateForm = () => {
    if (!customerData.cusid || !customerData.name || !customerData.address || !customerData.mobile ) {
      message.error('Please fill in all the required fields.');
      return false;
    }
  
  
    if (mobileError) {
      message.error('Please correct the mobile number field.');
      return false;
    }
  
    return true;
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleSubmit(customerData);
  };
  

  return (
    <div className='addContainer'>
      <form onSubmit={onSubmit}>
        <div className='close-btn' onClick={handleClose}>
          <CloseOutlined />
        </div>

        <label htmlFor='cusid'>Customer ID :</label>
        <input type='text' id='cusid' name='cusid' value={customerData.cusid} onChange={handleInputChange}  disabled={editing}/>

        <label htmlFor='name'>Customer Name :</label>
        <input type='text' id='name' name='name' value={customerData.name} onChange={handleInputChange} />

        <label htmlFor='address'>Customer Address :</label>
        <input type='text' id='address' name='address' value={customerData.address} onChange={handleInputChange}  />

        <label htmlFor='mobile'>Contact NO :</label>
        <input type='tel' id='mobile' name='mobile' onChange={handleMobileChange} value={customerData.mobile} maxLength={10} minLength={10}  pattern='[0-9]+' title='Only numbers are allowed' />
       

        {mobileError && <p className="error">{mobileError}</p>}

        <button className='customer_form_btn'>Submit</button>
      </form>
    </div>
  );
}

export default CustomerForm;
