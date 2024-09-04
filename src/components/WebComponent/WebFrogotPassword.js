import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Import Link
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import WebHeader from './WebHeader';

const FrogotPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // Initi alize useNavigate hook

    const onFinish = async (values) => {
        try {
            const response = await axios.post('https://acconex-backend.vercel.app/webuser/frogotpassword', values);
            console.log(response);
            if (response.data.status === "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                navigate('/web/home'); // Navigate to web home page on successful login
            }
        } catch (error) {
            console.error('Error:', error.message);
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
                    form={form} // Assign the form instance
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                    preserve={true} // Preserve form data after submission
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Send Email Link
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </div>
    );
};

export default FrogotPassword;
