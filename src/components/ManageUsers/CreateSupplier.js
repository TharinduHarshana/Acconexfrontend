import React, { useState, useEffect } from "react";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/supplierform.css";

const CreateSupplierForm = () => {
  const navigate = useNavigate();

  // State for supplier data and form validation
  const [supplierData, setSupplierData] = useState({
    supplierId: "",
    firstName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });

  // State for phone number validation error
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

  // Function to fetch the latest Supplier ID and generate the next one
  useEffect(() => {
    fetchLatestSupplierId();
  }, []);

  const fetchLatestSupplierId = async () => {
    try {
      const response = await axios.get("http://localhost:8000/supplier/get",{
        withCredentials:true,
      });
      const lastSupplierId =
        response.data.data.length > 0
          ? response.data.data[response.data.data.length - 1].supplierId
          : "sup000";
      const nextSupplierId = generateNextSupplierId(lastSupplierId);
      setSupplierData((prevData) => ({
        ...prevData,
        supplierId: nextSupplierId,
      }));
    } catch (error) {
      console.error("Error fetching latest supplier ID:", error);
      message.error("Failed to fetch latest supplier ID.");
    }
  };

  const generateNextSupplierId = (currentSupplierId) => {
    const prefix = "sup";
    const numericPart = currentSupplierId.substring(prefix.length);
    const nextNumber = parseInt(numericPart, 10) + 1;

    // Ensure the next number is a valid number
    if (isNaN(nextNumber)) {
      console.error("Invalid supplier ID format:", currentSupplierId);
      return `${prefix}001`;
    }

    return `${prefix}${nextNumber.toString().padStart(3, "0")}`;
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

    try {
      const result = await axios.post(
        "http://localhost:8000/supplier/add",
        supplierData,{
          withCredentials:true,
        }
      );
      if (result.data.success) {
        message.success("Supplier added successfully!");
        navigate("/admin/supplier");
      } else {
        message.error(result.data.message || "Failed to add supplier.");
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
      message.error("An error occurred while adding supplier.");
    }
  };

  // Function to handle close button click
  const handleCloseButtonClick = () => {
    navigate("/admin/supplier");
  };

  return (
    <DefaultHandle>
      <div className="form_addContainer">
        <form onSubmit={handleSubmit}>
          <div className="close-btn" onClick={handleCloseButtonClick}>
            <CloseOutlined />
          </div>
          <span style={{ color: "red", fontSize: "12px" }}>
            (All fields are required )
          </span>
          <div>
            <label htmlFor="supplierId">Supplier Id</label><br></br>
            <input
              type="text"
              id="supplierId"
              name="supplierId"
              value={supplierData.supplierId}
              onChange={(e) =>
                setSupplierData({
                  ...supplierData,
                  supplierId: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label><br></br>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={supplierData.firstName}
              onChange={(e) =>
                setSupplierData({ ...supplierData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="companyName">Company Name</label><br/>
            <input
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
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label><br/>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={supplierData.phoneNumber}
              onChange={handlePhoneChange}
              required
            />
            {phoneError && <span style={{ color: "red" }}>{phoneError}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label><br/>
            <input
              type="email"
              id="email"
              name="email"
              value={supplierData.email}
              onChange={(e) =>
                setSupplierData({ ...supplierData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </DefaultHandle>
  );
};

export default CreateSupplierForm;
