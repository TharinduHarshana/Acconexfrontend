import { Form, Input, message, Button, Row, Col } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
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

  // Function to handle phone number input change and validation
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
  const checkSupplierIdExists = async (supplierId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/supplier/check/${supplierId}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking if supplier ID exists:", error);
      return false; // Or handle the error appropriately
    }
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    const allFieldsFilled = Object.values(supplierData).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      message.error("All fields are required.");
      return;
    }
    const supplierIdExists = await checkSupplierIdExists(
      supplierData.supplierId
    );
    if (supplierIdExists) {
      message.error(
        "Supplier with this ID already exists!, Try another Supplier Id"
      );
      return;
    }
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
  // Function to handle close button click
  const handleCloseButtonClick = () => {
    // Navigate to the home page
    navigate("/admin/supplier");
  };
  return (
    <>
      <DefaultHandle>
        <div className="form_addContainer">
          <Form>
            <div className="close-btn" onClick={handleCloseButtonClick}>
              <CloseOutlined />
            </div>
            <span style={{ color: "red", fontSize: "12px" }}>
              (All fields are required )
            </span>
            <label htmlFor="supplierId">Supplier Id</label>
            <Input
              type="text"
              id="supplierId"
              name="supplierId"
              value={supplierData.supplierId}
              onChange={(e) =>
                setSupplierData({ ...supplierData, supplierId: e.target.value })
              }
              required
            />
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={supplierData.firstName}
              onChange={(e) =>
                setSupplierData({ ...supplierData, firstName: e.target.value })
              }
              required
            />
            <label htmlFor="companyName">Company Name</label>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              value={supplierData.companyName}
              onChange={(e) =>
                setSupplierData({
                  ...supplierData,
                  companyName: e.target.value,
                })
              }
              required
            />
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={supplierData.phoneNumber}
              onChange={handlePhoneChange}
              required
            />
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={supplierData.email}
              onChange={(e) =>
                setSupplierData({ ...supplierData, email: e.target.value })
              }
              required
            />
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </Form>
        </div>
      </DefaultHandle>
    </>
  );
};

export default CreateSupplierForm;
