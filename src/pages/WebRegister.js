import React from 'react';
import { Form, Input, Button, Typography, Divider, Row, Col } from 'antd';
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import '../styles/webLoginRegister.css';
import WebHeader from '../components/WebComponent/WebHeader';

const Register = () => {
  return (
    <div>
      <WebHeader />
      <div className='maindiv'>
        <Form className='loginform'>
          <Typography.Title level={2}>Register</Typography.Title>
          <Row gutter={[16, 16]}> {/* Set spacing between columns and rows */}
            <Col span={12}>
              <Form.Item
                label='First Name'
                name='firstname'
                rules={[{ required: true, message: 'Please input your Firstname!' }]}
              >
                <Input placeholder="Enter your First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Last Name'
                name='lastname'
                rules={[{ required: true, message: 'Please input Last Name!' }]}
              >
                <Input placeholder="Enter your Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}> {/* Set spacing between columns and rows */}
            <Col span={12}>
              <Form.Item
                label='Address'
                name='address'
              >
                <Input placeholder="Enter your Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Contact Number'
                name='contactnumber'
                rules={[{ required: true, message: 'Please input Contact Number!' }]}
              >
                <Input placeholder="Enter your Contact Number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}> {/* Set spacing between columns and rows */}
            <Col span={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { type: 'email', message: 'Please enter a valid email address!' }
                ]}
              >
                <Input placeholder="Enter your email address" />
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
                <Input placeholder="Enter your username" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}> {/* Set spacing between columns and rows */}
            <Col span={12}>
              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Confirm Password'
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Enter Same Passwords!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm your password" />
              </Form.Item>
            </Col>
          </Row>
          <Button type='primary' className='login-btn'>Register</Button>
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
  )
}

export default Register;
