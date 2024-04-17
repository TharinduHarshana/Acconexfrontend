import React from 'react';
import {Form, Input,Button,Typography,Divider } from 'antd';
import { GoogleOutlined,FacebookOutlined,TwitterOutlined  } from '@ant-design/icons';
import '../styles/webLoginRegister.css';
import { SafetyDivider} from '@mui/icons-material';




const Login = () => {
  return (
    <div className='maindiv'>
        <Form className='loginform'>
            <Typography.Title level={2}>Login</Typography.Title>
            <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>
            <Button type='primary' className='login-btn' >Login</Button>
            <Divider style={{borderColor:'black'}}>or Login With </Divider>
            <div className='socialloggin'>
              <GoogleOutlined className='socialicon' style={{color:'red'}}/>
              <FacebookOutlined className='socialicon' style={{color:'blue'}}/>
              <TwitterOutlined className='socialicon' style={{color:'cyan'}}/>
              
            <div/>
            <div className='register'>
              <Typography.Text>Don't have an account? </Typography.Text>
              <a href='/web/register'>Register</a>
            </div>
            </div>
        </Form>
    </div>
  )
}

export default Login;
