import React, { useState } from "react";
import "./login.css"; // Corrected import statement
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { login } from "../../Utility/api/user.api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  // Initialize useNavigate hook
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const res = await login(loginData);
      console.log(res);
      if (res && res.data) {
        // Navigate to dashboard route upon successful login
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Username or password is incorrect. Please try again.");
      } else {
        alert("Error Occurred. Please login again.");
      }
    }
  }

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={(e) =>
              e &&
              e.target &&
              setLoginData({ ...loginData, userName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password" // Modified this line to set the input type to "password"
            placeholder="Password"
            onChange={(e) =>
              e &&
              e.target &&
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
