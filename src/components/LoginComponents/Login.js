import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aconexImage from "../../images/icon.jpg";
import "../../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("Sending request to:", "/user/login");
    console.log("Request payload:", values);

    try {
      const response = await axios.post(
        "https://acconexfrontend.vercel.app/user/login",
        values,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);

      if (response.status === 200) {
        document.cookie = `token=${response.data.token}; path=/; Secure; HttpOnly`;
        message.success("Login successful");
        navigate("/admin/dashboard");
      } else if (response.data.message === "Token expired") {
        message.error("Your session has expired. Please log in again.");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        message.error("Incorrect password or username. Please try again.");
      } else {
        message.error("Error occurred. Please login again.");
      }
    }
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <div className="header">
          <img src={aconexImage} alt="Aconex Logo" className="header-image" />
        </div>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            LOGIN
          </Button>
        </Form.Item>
        <div className="login-form-topic">
          <p>Problem with signing in?</p>
          <div className="login-form-contact">
            <p>Contact support: 0713214568</p>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;


