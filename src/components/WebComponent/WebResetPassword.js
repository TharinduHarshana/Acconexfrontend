import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Import Link
import { useNavigate,useParams } from 'react-router-dom'; // Import useNavigate
import WebHeader from './WebHeader';



const ResetPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {token} = useParams();

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`http://localhost:8000/webuser/resetPassword/${token}`, values);
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
                navigate('/web/login'); // Navigate to web login page on successful password reset
                console.log(response.data.message);
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
                        label="New Password"
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
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;
