import { Form, Input, Typography, message, Button, Row, Col } from "antd";
import React, { useState,useEffect } from "react";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import "../../styles/supplierform.css";

const UpdateSupplier = () => {
    const navigate = useNavigate();

    const suppliers = {
        supplierId:"",
        firstName:"",
        companyName:"",
        phoneNumber:"",
        email:""

      };
    
      const { id } = useParams();
      const [supplier, setSupplier] = useState(suppliers);
      const [phoneError, setPhoneError] = useState();
     
    
      useEffect(() => {
        axios
          .get(`http://localhost:8000/supplier/${id}`)
          .then((response) => {
            console.log(response.data.data)
            setSupplier(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id]);
  
  
  

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if ((containsOnlyDigits && value.length <= 10) || value === "") {
      setSupplier({ ...supplier, phoneNumber: value });
      setPhoneError("");
    } else {
      setPhoneError("Please enter only numbers and a maximum of 10 digits");
    }
  };

  const handleSubmit = async (e) => {
    

    try {

      const response = axios.patch(
        `http://localhost:8000/supplier/update/${id}`,
        supplier
      );
      console.log("User updated successfully:", response.data);
      message.success("User update successfully!");

      // Navigate to a different page after successful update
      navigate("/admin/supplier/create");
    } catch (error) {
      message.error("Error updating user:", error);
    }
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
            Update Supplier
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
                  value={supplier.supplierId}
                  className="form-input"
                  onChange={(e) =>
                    setSupplier({
                      ...supplier,
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
                  value={supplier.firstName}
                  onChange={(e) =>
                    setSupplier({
                      ...supplier,
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
                  value={supplier.companyName}
                  onChange={(e) =>
                    setSupplier({
                      ...supplier,
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
                  value={supplier.phoneNumber}
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
                  value={supplier.email}
                  onChange={(e) =>
                    setSupplier({ ...supplier, email: e.target.value })
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
              Update
            </Button>
          </div>
        </Form>
      </DefaultHandle>
    </>
  );
};

export default UpdateSupplier;
