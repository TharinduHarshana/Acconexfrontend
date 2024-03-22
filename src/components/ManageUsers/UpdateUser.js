import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, Typography,message } from "antd";
import DefaultHandle from "../DefaultHandle";

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
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //const response = await axios.put(`http://localhost:8000/user/${id}`, user);
      const response = axios.patch(
        `http://localhost:8000/user/update/${id}`,
        user
      );
      console.log("User updated successfully:", response.data);
      message.success("User update successfully!");

      // Navigate to a different page after successful update
      navigate("/admin/usertable");
    } catch (error) {
      message.error("Error updating user:", error);
    }
  };

  // Phone number validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if (containsOnlyDigits || value === "") {
      setUser({ ...user, phoneNumber: value });
      setPhoneError(""); // Clear any previous error message
    } else {
      setPhoneError("Please enter only numbers");
    }
  };

  return (
    <>
      <DefaultHandle>
        <Form {...formItemLayout} variant="filled" className="form-container" autoComplete="off" 
        style={{
          maxWidth: "500px",
          margin: "auto",
          marginTop: "5px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "16px",
          backgroundColor: "#fff",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
          <Typography
            style={{
              fontSize: "13px",
              fontFamily: "sans-serif",
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Update User
          </Typography>
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
            hasFeedback
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
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </DefaultHandle>
    </>
  );
}

export default UpdateUser;
