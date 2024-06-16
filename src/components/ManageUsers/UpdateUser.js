import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DefaultHandle from "../DefaultHandle";
import { message,  } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../../styles/update.user.css"


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
    // Fetch user data from the backend API
    axios
      .get(`http://localhost:8000/user/${id}`, { withCredentials: true })
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

  // Function to check if a user ID already exists in the database
  const checkUserIdExists = async (userId) => {
    try {
      // Fetch user data from the backend API
      const response = await axios.get(
        `http://localhost:8000/user/check/${userId}`
      );
      const { exists } = response.data;
      // If the user ID exists in the database
      if (exists) {
        // Fetch the user data by ID
        const userData = await axios.get(`http://localhost:8000/user/${id}`);
        // If the fetched user ID is the same as the current user's ID, return false (no conflict)
        if (userData.data.data.userId === userId) {
          return false;
        } else {
          // If the fetched user ID is different, return true (conflict)
          return true;
        }
      }
      // If the user ID doesn't exist in the database, return false (no conflict)
      return exists;
    } catch (error) {
      console.error("Error checking if user ID exists:", error);
      return false;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the user ID already exists in the database
      const userIdExists = await checkUserIdExists(user.userId);
      // If the user ID already exists, display an error message and return
      if (userIdExists) {
        message.error(
          "User with this ID already exists! Try another User Id.."
        );
        return;
      }

      // Update user data in the backend
      await axios.patch(`http://localhost:8000/user/update/${id}`, user, {
        withCredentials: true,
      });
      console.log("User updated successfully:", user);
      message.success("User Updated successfully!");
      // Navigate back to the user table page
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
// Function to handle close button click
const handleCloseButtonClick = () => {
  // Navigate to the home page
  navigate("/admin/userTable");
};

  return (
    <>
      <DefaultHandle>
        <div className="form_addContainer">
          
          <form onSubmit={handleSubmit}>
            <div className="close-btn"  onClick={handleCloseButtonClick}>
              <CloseOutlined />
            </div>

            <label>User Id:</label>
            <input
              type="text"
              className="form-control"
              name="userId"
              value={user.userId}
              onChange={handleInputChange}
              disabled
            />

            <label>First Name:</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />

            <label>Phone Number:</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={user.phoneNumber}
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

            <label>User Role:</label>
            <select
              className="form-control"
              name="role"
              value={user.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="inventory manager">Inventory Manager</option>
              <option value="cashier">Cashier</option>
              <option value="sales staff">Sales Staff</option>
            </select>
<br/><br/>
            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </div>
      </DefaultHandle>
    </>
  );
}

export default UpdateUser;
