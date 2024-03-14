import React, { useState } from "react";
import { user } from "../../Utility/api/user.api";
import { Button, DatePicker, Form, Input, Select } from "antd";
const { RangePicker } = DatePicker;
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
    } catch (error) {
      console.log(error);
      alert("Error adding user: " + error.message);
    }
  }

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
              message: "Please input!",
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
              message: "Please input!",
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
              message: "Please input!",
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
              message: "Please input!",
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
              message: "Please input!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              e &&
              e.target &&
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input!",
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
          label="DOB"
          name="DOB"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <DatePicker
            onChange={(e) =>
              e && e.target && setFormData({ ...formData, dob: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              e &&
              e.target &&
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input!",
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
              message: "Please input!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              e &&
              e.target &&
              setFormData({ ...formData, idNumber: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please input!",
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
              message: "Please input!",
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UserForm;
