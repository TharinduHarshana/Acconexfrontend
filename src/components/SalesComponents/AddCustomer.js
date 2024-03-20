import React, { useState } from 'react';
import DefaultHandleSales from './DefaultHandleSales';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import '../../styles/sales.css';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const AddCustomer = ({ children }) => {
  const [componentDisabled] = useState(true);
  const [form] = Form.useForm(); // Create a form instance

  const handleClear = () => {
    form.resetFields(); // Resetting all form fields
  };

  return (
    <DefaultHandleSales>
      <Form
        form={form} // Pass the form instance to the Form component
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        enable={componentDisabled}
        style={{
          maxWidth: 900,
        }}
      >
        <div className='content'>
          <Form.Item className='input' label="Customer ID:" name="customerId">
            <Input className='inbox' placeholder='Enter NIC' />
          </Form.Item>

          <Form.Item className='input' label="Customer Name:" name="customerName">
            <Input className='inbox' placeholder='Enter Name' />
          </Form.Item>

          <Form.Item className='input' label="Customer Address:" name="customerAddress">
            <TextArea rows={4} className='inbox' placeholder='Enter Address' />
          </Form.Item>

          <Form.Item className='input' label="Contact No:" name="contactNo">
            <Input className='inbox' placeholder='Enter contact no' />
          </Form.Item>

          <Form.Item label="Gender:" name="gender">
            <Radio.Group className='inbox'>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item className='input' label="Register Date:" name="registerDate">
            <DatePicker className='inbox' />
          </Form.Item>

          <div className='button-container'>
            <Button className='btnadd'>Add Customer</Button>
            <Link to="/viewcustomer">
              <Button className='btnview'>View Customer</Button>
            </Link>
            <Button className='btnreset' onClick={handleClear}>Clear</Button>
          </div>
        </div>
      </Form>

      {children}
    </DefaultHandleSales>
  );
};

export default AddCustomer;
