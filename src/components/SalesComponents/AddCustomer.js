import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddCustomer = () => {
  const [form] = Form.useForm(); // Create a form instance

  const handleClear = () => {
    form.resetFields(); // Resetting all form fields
  };

  const handleAddCustomer = async () => {
    try {
      const values = await form.validateFields();
      // Make a POST request to add customer to the database
      await axios.post('http://localhost:8000/sales/add', {
        Customer_ID: values.Cus_ID,
        Customer_Name: values.Cus_Name,
        Customer_Address: values.Cus_Address,
        Contact_NO: values.Con_NO,
      });
      message.success('Customer added successfully');
      handleClear(); // Clear the form fields after successful submission
    } catch (error) {
      message.error('Failed to add customer');
      console.error('Error adding customer:', error);
    }
  };
  
  return (
    <Form
      form={form} // Pass the form instance to the Form component
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 900,
      }}
    >
      <div className='content'>
        <Form.Item className='input' label="Customer ID:" name="Cus_ID" rules={[{ required: true, message: 'Please enter Customer ID' }]}>
          <Input className='inbox' placeholder='Enter NIC' />
        </Form.Item>
        <Form.Item className='input' label="Customer Name:" name="Cus_Name" rules={[{ required: true, message: 'Please enter Customer Name' }]}>
          <Input className='inbox' placeholder='Enter name' />
        </Form.Item>
        <Form.Item className='input' label="Customer Address:" name="Cus_Address" rules={[{ required: true, message: 'Please enter Customer Address' }]}>
          <Input className='inbox' placeholder='Enter address' />
        </Form.Item>
        <Form.Item className='input' label="Contact NO:" name="Con_NO" rules={[{ required: true, message: 'Please enter Customer contact no' }]}>
          <Input className='inbox' placeholder='Enter contact no' />
        </Form.Item>

        <div className='button-container'>
          <Button className='btnadd' onClick={handleAddCustomer}>Add Customer</Button>
          <Link to="/viewcustomer">
            <Button className='btnview'>View Customer</Button>
          </Link>
          <Button className='btnreset' onClick={handleClear}>Clear</Button>
        </div>
      </div>
    </Form>
  );
};

export default AddCustomer;
