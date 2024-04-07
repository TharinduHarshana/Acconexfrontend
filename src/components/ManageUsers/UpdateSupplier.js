import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DefaultHandle from "../DefaultHandle";
import { message } from "antd";

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
      .get(`http://localhost:8000/supplier/${id}`)
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
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if userId remains the same
    if (supplier.supplierId === supplier.supplierId) {
      message.error("Supplier ID cannot be the same. Please modify the Supplier ID.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8000/supplier/update/${id}`,
        supplier
      );
      console.log("Supplier updated successfully:", supplier);
      message.success("Supplier updated successfully!");
      // Assuming a successful update, navigate to a different page
      navigate("/admin/supplier");
    } catch (error) {
      message.error("Error updating supplier");
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

  return (
    <>
      <DefaultHandle>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "400px",
            margin: "auto",
            marginTop: "1px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "16px",
            backgroundColor: "#fff",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              margin: "0 0 20px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Update Supplier
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginBottom: "5px",
                display: "block",
              }}
            >
              Supplier Id:
            </label>
            <input
              type="text"
              className="form-control"
              name="supplierId"
              value={supplier.supplierId}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginBottom: "5px",
                display: "block",
              }}
            >
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={supplier.firstName}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginBottom: "5px",
                display: "block",
              }}
            >
              Company Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={supplier.companyName}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginBottom: "5px",
                display: "block",
              }}
            >
              Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={supplier.phoneNumber}
              onChange={handlePhoneChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {phoneError && (
              <div
                className="text-danger"
                style={{ marginTop: "5px", fontSize: "14px" }}
              >
                {phoneError}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                marginBottom: "5px",
                display: "block",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={supplier.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        </form>
      </DefaultHandle>
    </>
  );
}

export default UpdateSupplier;
