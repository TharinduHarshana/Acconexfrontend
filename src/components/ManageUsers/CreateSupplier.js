import { Form, Input, Typography, message, Button, Row, Col } from "antd";
import React, { useState } from "react";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/supplierform.css";

const CreateSupplierForm = () => {
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState({
    supplierId: "",
    firstName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if ((containsOnlyDigits && value.length <= 10) || value === "") {
      setSupplierData({ ...supplierData, phoneNumber: value });
      setPhoneError("");
    } else {
      setPhoneError("Please enter only numbers and a maximum of 10 digits");
    }
  };

  const handleSubmit = (e) => {
    axios
      .post("http://localhost:8000/supplier/add", supplierData)
      .then((result) => {
        console.log(result);
        message.success("Supplier add successful!");
        navigate("/admin/supplier");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          message.error("Supplier with this supplierID already exists!");
        } else {
          console.error("Error adding supplier:", err);
          message.error("An error occurred while adding supplier.");
        }
      });
  };

  return (
    <>
      <DefaultHandle>
        <Form className="form-container" autoComplete="off">
          <Typography.Title
            level={4}
            className="typography"
            style={{
              fontSize: "15px",
              fontFamily: "sans-serif",
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            Create Supplier
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                label="Supplier Id"
                className="form-item"
                name="supplierId"
                rules={[
                  {
                    required: true,
                    message: "Please input supplier id!",
                  },
                  {
                    min: 3,
                    message: "Supplier id must be at least 3 characters long",
                  },
                ]}
                hasFeedback
                style={{ marginBottom: "8px" }} // Added style to adjust margin bottom
              >
                <Input
                  value={supplierData.supplierId}
                  className="form-input"
                  onChange={(e) =>
                    setSupplierData({
                      ...supplierData,
                      supplierId: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                className="form-item"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input supplier name!",
                  },
                ]}
                style={{ marginBottom: "8px" }} // Added style to adjust margin bottom
              >
                <Input
                  className="form-input"
                  value={supplierData.firstName}
                  onChange={(e) =>
                    setSupplierData({
                      ...supplierData,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                className="form-item"
                label="Company Name"
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: "Please input company name!",
                  },
                ]}
                style={{ marginBottom: "8px" }} // Added style to adjust margin bottom
              >
                <Input
                  className="form-input"
                  value={supplierData.companyName}
                  onChange={(e) =>
                    setSupplierData({
                      ...supplierData,
                      companyName: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                className="form-item"
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
                style={{ marginBottom: "8px" }} // Added style to adjust margin bottom
              >
                <Input
                  className="form-input"
                  value={supplierData.phoneNumber}
                  onChange={handlePhoneChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                className="form-item"
                label="Email"
                name="email"
                style={{ marginBottom: "8px" }} // Added style to adjust margin bottom
              >
                <Input
                  className="form-input"
                  value={supplierData.email}
                  onChange={(e) =>
                    setSupplierData({ ...supplierData, email: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
              style={{
                marginTop: "25px",
                marginBottom: "25px",
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </DefaultHandle>
    </>
  );
};

export default CreateSupplierForm;


