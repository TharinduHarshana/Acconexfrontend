import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DefaultHandle from "../DefaultHandle";
import { message, } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../../styles/update.user.css";

function UpdateSupplier() {
  // Extracting ID parameter from URL
  const { id } = useParams();
  // State to hold supplier data
  const [supplier, setSupplier] = useState({
    supplierId: "",
    firstName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();
  // Effect hook to fetch supplier data when component mounts
  useEffect(() => {
    axios
      .get(`https://acconex-backend.vercel.app/supplier/${id}`)
      .then((response) => {
        const supplierData = response.data.data;
        // Update supplier state with fetched data
        setSupplier({
          supplierId: supplierData.supplierId,
          firstName: supplierData.firstName,
          companyName: supplierData.companyName,
          phoneNumber: supplierData.phoneNumber,
          email: supplierData.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const checkSupplierIdExists = async (supplierId) => {
    try {
      // Fetch supplier data from the backend API
      const response = await axios.get(
        `https://acconex-backend.vercel.app/supplier/check/${supplierId}`
      );
      const { exists } = response.data;
      // If the supplier ID exists in the database
      if (exists) {
        // Fetch the supplier data by ID
        const supplierData = await axios.get(
          `https://acconex-backend.vercel.app/supplier/${id}`
        );
        // If the fetched supplier ID is the same as the current supplier's ID, return false (no conflict)
        if (supplierData.data.data.supplierId === supplierId) {
          return false;
        } else {
          // If the fetched supplier ID is different, return true (conflict)
          return true;
        }
      }
      // If the supplier ID doesn't exist in the database, return false (no conflict)
      return exists;
    } catch (error) {
      console.error("Error checking if supplier ID exists:", error);
      return false;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supplierIdExists = await checkSupplierIdExists(supplier.supplierId);
      if (supplierIdExists) {
        message.error(
          "Supplier with this ID already exists! Try another Supplier Id.."
        );
        return;
      }

      await axios.patch(
        `https://acconex-backend.vercel.app/supplier/update/${id}`,
        supplier
      );
      console.log("Supplier updated successfully:", supplier);
      message.success("Supplier Updated successfully!");
      navigate("/admin/supplier");
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };
  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update supplier state with new input value
    setSupplier({ ...supplier, [name]: value });
  };
  // Function to handle phone number input change and validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if ((containsOnlyDigits && value.length <= 10) || value === "") {
      setSupplier({ ...supplier, phoneNumber: value });
      setPhoneError(""); // Clear any previous error message
    } else {
      setPhoneError("Please enter only numbers and a maximum of 10 digits");
    }
  };
  // Function to handle close button click
  const handleCloseButtonClick = () => {
    // Navigate to the home page
    navigate("/admin/supplier");
  };
  return (
    <>
      <DefaultHandle>
        <div className="form_addContainer form">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleCloseButtonClick}>
              <CloseOutlined />
            </div>
            <label>Supplier Id:</label>
            <input
              type="text"
              className="form-control"
              name="supplierId"
              value={supplier.supplierId}
              onChange={handleInputChange}
              disabled
            />

            <label>First Name:</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={supplier.firstName}
              onChange={handleInputChange}
            />

            <label>Company Name:</label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={supplier.companyName}
              onChange={handleInputChange}
            />

            <label>Phone Number:</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={supplier.phoneNumber}
              onChange={handlePhoneChange}
            />
            {phoneError && (
              <div
                className="text-danger"
                style={{ marginTop: "5px", fontSize: "14px" }}
              >
                {phoneError}
              </div>
            )}

            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={supplier.email}
              onChange={handleInputChange}
            />

            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </div>
      </DefaultHandle>
    </>
  );
}

export default UpdateSupplier;
