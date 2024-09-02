import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/userprofile.css"
import DefaultHandle from "../DefaultHandle";

function UserProfile() {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    gmail: "",
    dob: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://acconex-backend.vercel.app/user/edit/profile", {
          withCredentials: true,
        });
        const profileData = response.data;
        profileData.dob = profileData.dob.split('T')[0]; 
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 403) {
          message.error("Access denied. Please login to continue.");
          navigate("/login");
        } else {
          message.error("An error occurred while fetching the user profile.");
        }
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("https://acconex-backend.vercel.app/user/profile", userProfile, {
        withCredentials: true,
      });
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("An error occurred while updating the profile.");
    }
  };

  return (
    <DefaultHandle>
    <div className="user-profile-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userProfile.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userProfile.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="gmail"
            value={userProfile.gmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={userProfile.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userProfile.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={userProfile.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
    </DefaultHandle>
  );
}

export default UserProfile;
