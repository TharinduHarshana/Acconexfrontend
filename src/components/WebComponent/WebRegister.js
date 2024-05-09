import React from "react";
import { Form, Input, Button } from 'antd';
import '../../styles/webLoginRegister.css';
import axios from "axios";
import Swal from 'sweetalert2';
import { Link  } from 'react-router-dom';
import WebHeader from './WebHeader';
import { useNavigate } from 'react-router-dom';

const WebRegister = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

   
    const onFinish = (values) => {
        axios.post('http://localhost:8000/webuser/register', values)
            .then(res => {
                console.log(res);
                if (res.data.status === 'succes') { // Correct the status spelling to 'success'
                    Swal.fire({
                        icon: 'success',
                        title: 'Register Success',
                    });
                    navigate('/web/login');
                    
                    
                } else {
                    // Display error message from the server response
                    Swal.fire({
                        icon: 'error',
                        title: 'Register Failed',
                        text: res.data.message, // Display the error message from the server
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: err.response ? err.response.data.message : 'Something went wrong',
                });
            });
    };
        

    return (
        <div>
        <WebHeader/>
        <div className="login-container">
            <div className="login-content">
                <h2>Register</h2>
                <Form
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not a valid email!',
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="contactNumber"
                        label="Contact Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your contact number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    <p>Already You Register <Link to="/web/login">Login</Link></p>
                </Form>
            </div>
        </div>
        </div>
    );
}

export default WebRegister;
