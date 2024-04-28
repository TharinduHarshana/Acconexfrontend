import React from "react";
import { Form, Input, Button, message } from "antd";
import "../../styles/login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aconexImage from "../../images/icon.jpg";

function Login() {
  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();

  // Define async function to handle form submission
  const handleSubmit = async (values) => {
    console.log("Sending request to:", "/user/login");
    console.log("Request payload:", values);

    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(
        "http://localhost:8000/user/login", // URL of the login endpoint
        values, // Form values
        {
          withCredentials: true, // Include credentials in the request
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      // Log the response from the server
      console.log("Response:", response);

      if (response.status === 200) {
        // Set the token as a cookie
        document.cookie = `token=${response.data.token}; path=/; Secure; HttpOnly`;
        message.success("Login successful");
        // Navigate to the admin home page
        navigate("/admin/home");
      }
    } catch (error) {
      // Catch any errors that occur during the request
      console.error("Error:", error);
      // Check if the error is a 401 (unauthorized)
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
        onFinish={handleSubmit} // Call handleSubmit when the form is submitted
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
          <h5>Problem with signing in?</h5>
          <div className="login-form-contact">
            <p>Contact support: 0713214568</p>
          </div>
        </div>
      </Form>
    </div>
  );
}
// Export the Login component
export default Login;
