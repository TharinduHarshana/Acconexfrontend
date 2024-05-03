import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Divider, Row, Col } from 'antd';
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import '../styles/webLoginRegister.css';
import swal from 'sweetalert';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    contactnumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (values) => {
    try {
      axios.post('http://localhost:8000/webcustomer/register', formData)
        .then(res => {
          console.log('Response:', res.data);
          swal("Registration Successful!")
        });
    }
    catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <div className='maindiv'>
        <Form className='loginform' onFinish={handleSubmit}>
          <Typography.Title level={2}>Register</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='First Name'
                name='firstname'
                rules={[{ required: true, message: 'Please input your Firstname!' }]}
              >
                <Input name="firstname" placeholder="Enter your First Name" onChange={handleInputChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Last Name'
                name='lastname'
                rules={[{ required: true, message: 'Please input Last Name!' }]}
              >
                <Input name='lastname' placeholder="Enter your Last Name" onChange={handleInputChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='Address'
                name='address'
              >
                <Input name='address' placeholder="Enter your Address" onChange={handleInputChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Contact Number'
                name='contactnumber'
                rules={[{ required: true, message: 'Please input Contact Number!' }]}
              >
                <Input name='contactnumber' placeholder="Enter your Contact Number" onChange={handleInputChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { type: 'email', message: 'Please enter a valid email address!' }
                ]}
              >
                <Input name='email' placeholder="Enter your email address" onChange={handleInputChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Username'
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { min: 5, message: 'Username must be at least 6 characters long' }
                ]}
              >
                <Input name='username' placeholder="Enter your username" onChange={handleInputChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters long' }
                ]}
              >
                <Input.Password name='password' placeholder="Enter your password" onChange={handleInputChange} />
              </Form.Item>
            </Col>
          </Row>

          <Button type='primary' htmlType="submit" className='login-btn'>Register</Button>

          <Divider style={{ borderColor: 'black' }}>or Register With</Divider>
          <div className='socialloggin'>
            <GoogleOutlined className='socialicon' style={{ color: 'red' }} />
            <FacebookOutlined className='socialicon' style={{ color: 'blue' }} />
            <TwitterOutlined className='socialicon' style={{ color: 'cyan' }} />
          </div>
          <div className='register'>
            <Typography.Text>Already have an account? </Typography.Text>
            <a href='/web/login'>Login</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
