import React, { useState } from "react";
import { user } from "../../Utility/api/user.api";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

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

function UserForm() {
  //get the data from form
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
  {
    phoneError && <div className="error">{phoneError}</div>;
  }

  //call the user function
  async function handleSubmit() {
    try {
      const res = await user(
        formData.userId,
        formData.userName,
        formData.firstName,
        formData.lastName,
        formData.password,
        formData.gmail,
        formData.dob,
        formData.phoneNumber,
        formData.address,
        formData.idNumber,
        formData.gender,
        formData.role
      );
      console.log(res);
      alert("User added successfully!");
      setFormData({
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
    } catch (error) {
      console.log(error);
      alert("Error adding user: " + error.message);
    }
  }

  //phone number validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^\d+$/.test(value);
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
      <Form
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="User Id"
          name="userId"
          rules={[
            {
              required: true,
              message: "Please input user id!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              e &&
              e.target &&
              setFormData({ ...formData, userId: e.target.value })
            }
          />
        </Form.Item>

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

        <Form.Item
          label="Password"
          name="Password"
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
                <EyeOutlined onClick={handleTogglePassword} />
              ) : (
                <EyeInvisibleOutlined onClick={handleTogglePassword} />
              )
            }
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              e &&
              e.target &&
              setFormData({ ...formData, gmail: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="DOB"
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
          <Input value={formData.phoneNumber} onChange={handlePhoneChange} />
        </Form.Item>

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
          <Input
            onChange={(e) =>
              e &&
              e.target &&
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </Form.Item>
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
          <Input value={formData.idNumber} onChange={handleIdNumberChange} />
        </Form.Item>

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
            onChange={(value) => setFormData({ ...formData, gender: value })}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

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
            onChange={(value) => setFormData({ ...formData, role: value })}
          >
            <Option value="admin">Admin</Option>
            <Option value="inventory manager">Inventory Manager</Option>
            <Option value="cashier">Cashier</Option>
            <Option value="sales staff">Sales Staff</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UserForm;
