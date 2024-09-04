import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import WebHeader from './WebHeader';

const WebLogin = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post('https://acconex-backend.vercel.app/webuser/login', values);
            if (response.data.status === "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                });
            } else {
                // Save token to local storage
                localStorage.setItem('token', response.data.token);
                //save token cookie
                document.cookie = `token=${response.data.token}`;
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                navigate('/web/home');
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An unexpected error occurred. Please try again later.',
            });
        }
    };

    return (
        <div>
            <WebHeader/>
            <div className="login-container">
                <div className="login-content">
                    <h2>Login</h2>
                    <Form
                        name="login"
                        form={form}
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
                        preserve={true}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>

                        <p>Don't have an account? <Link to="/web/register">Register</Link></p>
                        
                        <Link to="/web/forgotpassword">Forgot Password</Link>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default WebLogin;
