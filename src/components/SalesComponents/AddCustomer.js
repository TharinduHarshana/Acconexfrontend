import React, { useState } from 'react'
import DefaultHandleSales from './DefaultHandleSales'
import { Button, DatePicker, Form, Input,Radio,}from 'antd';
import '../../styles/sales.css';
import { Link } from 'react-router-dom';


// const { RangePicker } = DatePicker;
const { TextArea } = Input;
// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };
const AddCustomer = ({children}) => {
  const [componentDisabled] =useState(true);
  return (
    <DefaultHandleSales>
      <Form
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
        <Form.Item className='input' label="Cutomer ID : ">
          <Input className='inbox' placeholder='Enter NIC' />
        </Form.Item>

        <Form.Item className='input' label="Customer Name: ">
          <Input className='inbox' placeholder='Enter Name'/>
        </Form.Item>

        <Form.Item className='input' label="Customer Address: ">
          <TextArea rows={4} className='inbox' placeholder='Enter Address' />
        </Form.Item>

        <Form.Item className='input' label="Contact No : ">
          <Input className='inbox' placeholder='Enter contact no' />
        </Form.Item>

        <Form.Item label="Gender">
          <Radio.Group className='inbox'>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item className='input' label="Register Date">
          <DatePicker className='inbox' />
        </Form.Item>

        
        <Button  className='btnadd' >Add Customer</Button>
        <Link to ="/viewcustomer">
        <Button  className='btnview'>View Customer</Button>
        </Link>
        
        <Button  className='btnreset' >Clear</Button>
        
        </div>
        
      </Form>
      
    {children}
     </DefaultHandleSales> 
    
  );
};

export default AddCustomer;