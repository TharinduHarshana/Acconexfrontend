import React, { useState } from 'react';
import { Form, Input, Button, Typography, Divider, Modal } from 'antd';
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import RegisterForm from '../pages/WebRegister'; // Import the Register form component
import axios from 'axios';
import {handleCancel } from '../components/WebComponent/WebHeader';
import swal from 'sweetalert';



const Login = () => {
  axios.defaults.withCredentials = true;
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/webcustomer/login', formData);
      console.log('Response:', response.data);
      swal("Successfully logged in!");
    } catch (error) {
      swal("Invalid username or password!")
    }
  };

  const handleRegisterModalOpen = () => {
    setRegisterModalVisible(true);
    handleCancel();
  };

  const handleRegisterModalClose = () => {
    setRegisterModalVisible(false);
  };

  return (
    <div>
      <div className='maindiv'>
        <Form className='loginform' onFinish={handleSubmit}>
          <Typography.Title level={2}>Login</Typography.Title>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input name='username' placeholder="Enter your username" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password name='password' placeholder="Enter your password" onChange={handleInputChange} />
          </Form.Item>
          <Button type='primary' className='login-btn' htmlType='submit'>
            Login
          </Button>
          <Divider style={{ borderColor: 'black' }}>or Login With</Divider>
          <div className='socialloggin'>
            <GoogleOutlined className='socialicon' style={{ color: 'red' }} />
            <FacebookOutlined className='socialicon' style={{ color: 'blue' }} />
            <TwitterOutlined className='socialicon' style={{ color: 'cyan' }} />
          </div>
          <div className='register'>
            <Typography.Text>Don't have an account? </Typography.Text>
            <a href='#' onClick={handleRegisterModalOpen}>Register</a>
          </div>
        </Form>
      </div>
      {/* Register Modal */}
      <Modal
        visible={registerModalVisible}
        onCancel={handleRegisterModalClose}
        destroyOnClose // This will unmount the modal when it's closed, ensuring the register form inside it resets
      >
        <RegisterForm onCancel={handleRegisterModalClose} />
      </Modal>
    </div>
  );
};

export default Login;
