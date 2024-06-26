import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DefaultHandle from "../DefaultHandle";
import { message } from "antd";

function UpdateUser() {
  // Get the id parameter from the URL
  const { id } = useParams();
  // State to store user data
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    phoneNumber: "",
    role: "",
  });
  // State to handle phone number input validation
  const [phoneError, setPhoneError] = useState("");
  // Hook to navigate to different pages
  const navigate = useNavigate();
  // Effect hook to fetch user data when the component mounts or id changes
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        const userData = response.data.data;
        // Update the user state with data from the response
        setUser({
          userId: userData.userId,
          firstName: userData.firstName,
          phoneNumber: userData.phoneNumber,
          role: userData.role,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // Dependency array ensures this effect runs when id changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if userId remains the same
    if (user.userId === user.userId) {
      message.error("User ID cannot be the same. Please modify the User ID.");
      return;
    }

    try {
      await axios.patch(`http://localhost:8000/user/update/${id}`, user);
      console.log("User updated successfully:", user);
      message.success("User Updated successfully!");
      // Navigate to a different page after successful update
      navigate("/admin/usertable");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the user state with the new input value
    setUser({ ...user, [name]: value });
  };

  // Phone number validation
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const containsOnlyDigits = /^[0-9]+$/.test(value);
    if ((containsOnlyDigits && value.length <= 10) || value === "") {
      // Update the user state with the new phone number
      setUser({ ...user, phoneNumber: value });
      setPhoneError(""); // Clear any previous error message
    } else {
      // Set error message for invalid phone number input
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
            marginTop: "20px",
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
            Update User
          </h2>

          <div style={{ marginBottom: "20px" }} className="form-group">
            <label style={{ marginBottom: "5px", display: "block" }}>
              User Id:
            </label>
            <input
              type="text"
              className="form-control"
              name="userId"
              value={user.userId}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }} className="form-group">
            <label style={{ marginBottom: "5px", display: "block" }}>
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }} className="form-group">
            <label style={{ marginBottom: "5px", display: "block" }}>
              Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={user.phoneNumber}
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

          <div style={{ marginBottom: "20px" }} className="form-group">
            <label style={{ marginBottom: "5px", display: "block" }}>
              User Role:
            </label>
            <select
              className="form-control"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="admin">Admin</option>
              <option value="inventory manager">Inventory Manager</option>
              <option value="cashier">Cashier</option>
              <option value="sales staff">Sales Staff</option>
            </select>
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

export default UpdateUser;
