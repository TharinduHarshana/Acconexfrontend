// import React, { useState } from "react";
// import "../../styles/login.css";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Typography,message } from "antd";
// import { login } from "../../Utility/api/user.api";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [loginData, setLoginData] = useState({ userName: "", password: "" });
//   const navigate = useNavigate();

//   async function handleSubmit() {
//     try {
//       const res = await login(loginData);
//       console.log(res);
//       if (res && res.data) {
//         // Navigate to dashboard route upon successful login
//         message.success("Login is successfull")
//         navigate("/admin/home");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         message.error("Username or password is incorrect. Please try again.");
//       } else {
//         message.error("Error Occurred. Please login again.");
//       }
//     }
//   }

//   return (
//     <div className="login-container">

//       <Form
//         name="normal_login"
//         className="login-form"
//         autoComplete="off"

//       >
//         <div className="header">

//       </div>
//         <Typography className="login-form-title">

//         </Typography>

//         <Form.Item
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Username!",
//             },
//           ]}
//         >
//           <Input
//             className="userName"
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//             onChange={(e) =>
//               e &&
//               e.target &&
//               setLoginData({ ...loginData, userName: e.target.value })
//             }
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Password!",
//             },
//           ]}
//         >
//           <Input.Password
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Password"
//             className="password"
//             onChange={(e) =>
//               e &&
//               e.target &&
//               setLoginData({ ...loginData, password: e.target.value })
//             }
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//             onClick={handleSubmit}
//           >
//             LOGIN
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default Login;

// import React from "react";
// import { Form, Input, Button, message } from "antd";
// import "../../styles/login.css";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Assuming you're using Axios for HTTP requests
// import aconexImage from "../../images/icon.jpg"

// function Login() {
//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     console.log("Sending request to:", "/user/login");
//     console.log("Request payload:", values);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/user/login",
//         values,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Response:", response);

//       if (response.status === 200) {
//         message.success("Login successful");
//         // Assuming you want to store the token in local storage for simplicity
//         localStorage.setItem("token", response.headers["set-cookie"]);
//         navigate("/admin/home");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response && error.response.status === 401) {
//         message.error("Incorrect password or username. Please try again.");
//       } else {
//         message.error("Error occurred. Please login again.");
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <Form
//         name="normal_login"
//         className="login-form"
//         autoComplete="off"
//         onFinish={handleSubmit}
//       >
//         <div className="header">
//         <img src={aconexImage} alt="Aconex Logo" className="header-image" />
//        </div>
//         <Form.Item
//           name="userName" // Ensure this matches the backend field
//           rules={[{ required: true, message: "Please input your Username!" }]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//           />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input.Password
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             placeholder="Password"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//           >
//             LOGIN
//           </Button>
//         </Form.Item>
//         <div className="login-form-topic">  
//         <h5>Problem with signing in ? </h5>
//         <div className="login-form-contact">
//         <p>Contact support: 0713214568</p>
//         </div> 
//       </div>
//       </Form>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { Form, Input, Button, message } from "antd";
import "../../styles/login.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import aconexImage from "../../images/icon.jpg";

function Login() {
 const navigate = useNavigate();

 const handleSubmit = async (values) => {
    console.log("Sending request to:", "/user/login");
    console.log("Request payload:", values);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
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
        navigate("/admin/home");
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
          <h5>Problem with signing in?</h5>
          <div className="login-form-contact">
            <p>Contact support: 0713214568</p>
          </div>
        </div>
      </Form>
    </div>
 );
}

export default Login;

