import React, { useState, useEffect } from "react";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "../../styles/userform.css";
import { Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";
const { Option } = Select;

const CreateUserForm = () => {
  const navigate = useNavigate();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    gmail: "",
    dob: "",
    phoneNumber: "",
    address: "",
    idNumber: "",
    gender: "",
    role: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    //e.preventDefault();

    axios
      .post("http://localhost:8000/user/add", {
        userId: formData.userId,
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        gmail: formData.gmail,
        dob: formData.dob,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        idNumber: formData.idNumber,
        gender: formData.gender,
        role: formData.role,
      })
      .then((result) => {
        console.log(result);
        message.success("User create successfull!");
        navigate("/admin/usertable");
      })
      .catch((err) => {
        console.log(err);
        message.error("Error adding user: " + err.message);
      });
  };

  //phone number validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if (containsOnlyDigits || value === "") {
      setFormData({ ...formData, phoneNumber: value });
      setPhoneError(""); // Clear any previous error message
    } else {
      setPhoneError("Please enter only numbers");
    }
  };

  //id number validation
  const handleIdNumberChange = (e) => {
    const { value } = e.target;
    const containsValidCharacters = /^[a-zA-Z0-9]+$/.test(value);
    if (containsValidCharacters || value === "") {
      setFormData({ ...formData, idNumber: value });
      setIdNumberError(""); // Clear any previous error message
    } else {
      setIdNumberError("Please enter only numbers and letters");
    }
  };

  return (
    <>
      <DefaultHandle>
        <div style={{ padding: "20px" }}>
          <Form
            {...formItemLayout}
            className="form-container"
            autoComplete="off"
          >
            <Typography.Title
              level={4}
              className="typography"
              style={{
                fontSize: "13px",
                fontFamily: "sans-serif",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Create user
            </Typography.Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {/* User Id */}
                <Form.Item
                  label="User Id"
                  name="userId"
                  rules={[
                    {
                      required: true,
                      message: "Please input user id!",
                    },
                    {
                      whitespace: true,
                    },
                    {
                      min: 3,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    value={formData.userId}
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, userId: e.target.value })
                    }
                  />
                </Form.Item>

                {/* First Name */}
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input first name!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    value={formData.password}
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, password: e.target.value })
                    }
                    iconRender={(visible) =>
                      visible ? (
                        <EyeOutlined
                          className="eye-icon"
                          onClick={handleTogglePassword}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          className="eye-icon"
                          onClick={handleTogglePassword}
                        />
                      )
                    }
                  />
                </Form.Item>

                {/* Date of Birth */}
                <Form.Item
                  label="Date of Birth"
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: "Please input date of birth!",
                    },
                  ]}
                >
                  <DatePicker
                    onChange={(date, dateString) =>
                      date && setFormData({ ...formData, dob: dateString })
                    }
                    picker="date"
                  />
                </Form.Item>

                {/* Address */}
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input address!",
                    },
                  ]}
                >
                  <Input.TextArea
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Form.Item>

                {/* Gender */}
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select gender!",
                    },
                  ]}
                >
                  <Select
                    onChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* User Name */}
                <Form.Item
                  label="User Name"
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Please input user name!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, userName: e.target.value })
                    }
                  />
                </Form.Item>

                {/* Last Name */}
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input last name!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    onChange={(e) =>
                      e &&
                      e.target &&
                      setFormData({ ...formData, gmail: e.target.value })
                    }
                  />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input phone number!",
                    },
                  ]}
                  hasFeedback
                  validateStatus={phoneError ? "error" : ""}
                  help={phoneError}
                >
                  <Input
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </Form.Item>

                {/* Id Number */}
                <Form.Item
                  label="Id Number"
                  name="idNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input id number!",
                    },
                  ]}
                  hasFeedback
                  validateStatus={idNumberError ? "error" : " "}
                  help={idNumberError}
                >
                  <Input
                    value={formData.idNumber}
                    onChange={handleIdNumberChange}
                  />
                </Form.Item>

                {/* User Role */}
                <Form.Item
                  label="User Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please select user role!",
                    },
                  ]}
                >
                  <Select
                    onChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="inventory manager">Inventory Manager</Option>
                    <Option value="cashier">Cashier</Option>
                    <Option value="sales staff">Sales Staff</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </DefaultHandle>
    </>
  );
};

export default CreateUserForm;
