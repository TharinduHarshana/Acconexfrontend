import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, Typography } from "antd";

import "../../styles/userform.css";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

function UpdateUser() {
  const users = {
    userId: "",
    firstName: "",
    phoneNumber: "",
    role: "",
  };

  const { id } = useParams();
  const [user, setUser] = useState(users);
  const [phoneError, setPhoneError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault(); // Prevent default form submission behavior

  //     try {
  //       // Send a PUT request to update the user information
  //       const response = await axios.put(`http://localhost:8000/user/${id}`, user);

  //       // Handle successful response, you might want to navigate to a different page or show a success message
  //       console.log("User updated successfully:", response.data);
  //       // Navigate to a different page after successful update
  //       navigate("/admin/userlist");
  //     } catch (error) {
  //       // Handle errors from the API
  //       console.error("Error updating user:", error);
  //       // You might want to show an error message to the user
  //     }
  //   };

  // Phone number validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^\d+$/.test(value);
    if (containsOnlyDigits || value === "") {
      setUser({ ...user, phoneNumber: value });
      setPhoneError(""); // Clear any previous error message
    } else {
      setPhoneError("Please enter only numbers");
    }
  };

  return (
    <>
      <Form {...formItemLayout} variant="filled" className="form-container">
        <Typography>Update User</Typography>
        <Form.Item
          label="User Id"
          name="userId"
          className="form-item"
          rules={[
            {
              message: "Please input user id!",
            },
          ]}
        >
          <Input
            value={user.userId}
            onChange={(e) => setUser({ ...user, userId: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              message: "Please input first name!",
            },
          ]}
        >
          <Input
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              message: "Please input phone number!",
            },
          ]}
          validateStatus={phoneError ? "error" : ""}
          help={phoneError}
        >
          <Input value={user.phoneNumber} onChange={handlePhoneChange} />
        </Form.Item>

        <Form.Item
          label="User Role"
          name="role"
          rules={[
            {
              message: "Please select user role!",
            },
          ]}
        >
          <Select
            value={user.role}
            onChange={(value) => setUser({ ...user, role: value })}
          >
            <Option value="admin">Admin</Option>
            <Option value="inventory manager">Inventory Manager</Option>
            <Option value="cashier">Cashier</Option>
            <Option value="sales staff">Sales Staff</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateUser;
