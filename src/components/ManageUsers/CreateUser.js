import React, { useState, useEffect } from "react";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  // Layout settings for the form items
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
  // Ant Design form instance
  const [form] = Form.useForm();

  // State to hold form data
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

  // State for validation errors
  const [phoneError, setPhoneError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/all");
      const lastUserId =
        response.data.data.length > 0
          ? response.data.data[response.data.data.length - 1].userId
          : "use000";
      const nextUserId = generateNextUserId(lastUserId);
      setFormData((prevData) => ({
        ...prevData,
        userId: nextUserId,
      }));
      form.setFieldsValue({ userId: nextUserId });
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch latest user ID.");
    }
  };

  // Function to generate next userId
  const generateNextUserId = (currentUserId) => {
    const prefix = "user";
    const numericPart = currentUserId.substring(prefix.length);
    const nextNumber = parseInt(numericPart, 10) + 1;

    // Ensure the next number is a valid number
    if (isNaN(nextNumber)) {
      console.error("Invalid user ID format:", currentUserId);
      return `${prefix}001`;
    }

    return `${prefix}${nextNumber.toString().padStart(3, "0")}`;
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Check if user ID already exists
  const checkUserIdExists = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/check/${userId}`,
        { withCredentials: true }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking if user ID exists:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      message.error("All fields are required.");
      return;
    }

    try {
      const userIdExists = await checkUserIdExists(formData.userId);
      if (userIdExists) {
        message.error(
          "User with this ID already exists! Try another User Id.."
        );
        return;
      }
      const result = await axios.post(
        "http://localhost:8000/user/add",
        formData
      );
      if (result.data.success) {
        message.success("User created successfully!");
        navigate("/admin/usertable");
      } else {
        message.error(result.data.message);
      }
    } catch (err) {
      console.error("Error adding user:", err);
      message.error("An error occurred while adding user.");
    }
  };

  // Phone number validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if ((containsOnlyDigits && value.length <= 10) || value === "") {
      setFormData({ ...formData, phoneNumber: value });
      setPhoneError("");
    } else {
      setPhoneError("Please enter only numbers and a maximum of 10 digits");
    }
  };

  // Id number validation
  const handleIdNumberChange = (e) => {
    const { value } = e.target;
    const isValid = /^[a-zA-Z0-9]{1,12}$/.test(value);
    if (isValid || value === "") {
      setFormData({ ...formData, idNumber: value });
      setIdNumberError("");
    } else {
      setIdNumberError(
        "Please enter only letters and numbers, and ensure the ID number has a maximum length of 12 characters"
      );
    }
  };

  return (
    <>
      <DefaultHandle>
        <div style={{ padding: "20px" }}>
          <Form
            {...formItemLayout}
            className="form-containeer"
            form={form}
            initialValues={formData}
          >
            <Typography.Text>
              User Information{" "}
              <span style={{ color: "red", fontSize: "12px" }}>
                (Fields in red * are required)
              </span>
            </Typography.Text>

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
            ></Typography.Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {/* User Id */}
                <Form.Item
                  label="User Id"
                  name="userId"
                  className="required-label"
                  rules={[
                    {
                      required: true,
                      message: "Please input user id!",
                    },
                    {
                      whitespace: true,
                    },
                    {
                      min: 8,
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    value={formData.userId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        userId: e.target.value,
                      })
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
                    {
                      pattern: /^[A-Za-z]+$/,
                      message:
                        "First name should contain only alphabetic characters!",
                    },
                  ]}
                >
                  <Input
                    value={formData.firstName}
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
                    value={formData.address}
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
                    value={formData.gender}
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
                    value={formData.userName}
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
                    {
                      pattern: /^[A-Za-z]+$/,
                      message:
                        "Last name should contain only alphabetic characters!",
                    },
                  ]}
                >
                  <Input
                    value={formData.lastName}
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
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    value={formData.gmail}
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
                      message: "Please input ID number!",
                    },
                  ]}
                  validateStatus={idNumberError ? "error" : ""}
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
                    value={formData.role}
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

            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 18, offset: 6 },
              }}
            >
              <div className="form_button">
                <Button
                  htmlType="submit"
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: "rgb(1, 1, 41)",
                    color: "white",
                    fontWeight: "500",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DefaultHandle>
    </>
  );
};

export default CreateUserForm;
