// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import cookie from "cookie";

// const UpdateProfileForm = () => {
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     gmail: "",
//     address: "",
//     dob: "",
//     idNumber: "",
//     //password:'',
//     profilePicture: null,
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/user/edit/profile",
//           {
//             withCredentials: true,
//           }
//         );
//         // Check if dob is a valid date string or a Date object
//         let formattedDob = "";
//         if (response.data.dob instanceof Date) {
//           // If dob is already a Date object, format it
//           formattedDob = response.data.dob.toISOString().split("T")[0];
//         } else if (typeof response.data.dob === "string") {
//           // If dob is a string, try to create a Date object from it
//           const date = new Date(response.data.dob);
//           if (!isNaN(date.getTime())) {
//             // If the date is valid, format it
//             formattedDob = date.toISOString().split("T")[0];
//           }
//         }
//         // If dob is not a valid date, you might want to set it to a default value or handle it differently
//         setUser({
//           ...response.data,
//           dob: formattedDob,
//         });
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("firstName", user.firstName);
//   //     formData.append("lastName", user.lastName);
//   //     formData.append("phoneNumber", user.phoneNumber);
//   //     formData.append("gmail", user.gmail);
//   //     formData.append("address", user.address);
//   //     formData.append("birthday", user.dob);
//   //     formData.append("idNumber", user.idNumber);

//   //     if (user.profilePicture) {
//   //       formData.append("profilePicture", user.profilePicture);
//   //     }

//   //     // Debugging: Log all cookies
//   //     console.log("All cookies:", document.cookie);

//   //     // Read the token from a cookie

//   //     const cookies = cookie.parse(document.cookie, { name: "token" });

//   //     //const cookies = cookie.parse(document.cookie);
//   //     console.log("cookies", cookies);

//   //     const authToken = cookies.token;
//   //     console.log("authToken", authToken);

//   //     const response = await axios.put("http://localhost:8000/user/profile", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //         Authorization: `Bearer ${authToken}`,
//   //       },
//   //     });

//   //     if (response.status === 200) {
//   //       console.log("Profile updated successfully");
//   //       // Optionally, clear the form or show a success message
//   //     } else {
//   //       console.error("Failed to update profile");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating profile:", error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("firstName", user.firstName);
//       formData.append("lastName", user.lastName);
//       formData.append("phoneNumber", user.phoneNumber);
//       formData.append("gmail", user.gmail);
//       formData.append("address", user.address);
//       formData.append("birthday", user.dob);
//       formData.append("idNumber", user.idNumber);

//       if (user.profilePicture) {
//         formData.append("profilePicture", user.profilePicture);
//       }

//       // Debugging: Log all cookies
//       console.log("All cookies:", document.cookie);

//       // Read the token from a cookie
//       const cookies = cookie.parse(document.cookie);
//       console.log("cookies", cookies);

//       const authToken = cookies.token;
//       console.log("authToken", authToken);

//       // Check if authToken exists
//       if (!authToken) {
//         console.error("Auth token not found");
//         return; // Exit function if authToken is not found
//       }

//       // Log formData for debugging
//       for (let pair of formData.entries()) {
//         console.log(pair[0] + ', ' + pair[1]);
//       }

//       const response = await axios.patch("http://localhost:8000/user/profile", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       if (response.status === 200) {
//         console.log("Profile updated successfully");
//         // Optionally, clear the form or show a success message
//       } else {
//         console.error("Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={user.firstName}
//         onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//         placeholder="First Name"
//       />
//       <input
//         type="text"
//         value={user.lastName}
//         onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//         placeholder="Last Name"
//       />
//       <input
//         type="text"
//         value={user.phoneNumber}
//         onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
//         placeholder="Phone Number"
//       />
//       <input
//         type="email"
//         value={user.gmail}
//         onChange={(e) => setUser({ ...user, gmail: e.target.value })}
//         placeholder="Email"
//       />
//       <input
//         type="text"
//         value={user.address}
//         onChange={(e) => setUser({ ...user, address: e.target.value })}
//         placeholder="Address"
//       />
//       {/* <input type="text" value={user.password} onChange={(e) => setUser({...user, password: e.target.value })} placeholder="password" /> */}

//       <input
//         type="date"
//         value={user.dob}
//         onChange={(e) => setUser({ ...user, dob: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         value={user.idNumber}
//         onChange={(e) => setUser({ ...user, idNumber: e.target.value })}
//         placeholder="ID Number"
//       />
//       <div>
//         <img
//           src={user.profilePicture ? user.profilePicture : "default-image-url"}
//           alt="Profile"
//         />
//         <input
//           type="file"
//           onChange={(e) =>
//             setUser({ ...user, profilePicture: e.target.files[0] })
//           }
//         />
//       </div>
//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default UpdateProfileForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/updateprofile.css";
import DefaultHandle from "../components/DefaultHandle";
import { CloseOutlined } from "@ant-design/icons";
import { message } from "antd";

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gmail: "", 
    address: "",
    dob: "", 
    idNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/user/edit/profile",
          {
            withCredentials: true,
          }
        );
        let formattedDob = "";
        if (response.data.dob instanceof Date) {
          formattedDob = response.data.dob.toISOString().split("T")[0];
        } else if (typeof response.data.dob === "string") {
          const date = new Date(response.data.dob);
          if (!isNaN(date.getTime())) {
            formattedDob = date.toISOString().split("T")[0];
          }
        } else {
          console.error(
            "dob is not a valid date or string:",
            response.data.dob
          );
          formattedDob = ""; 
        }
        setUser({
        ...response.data,
          dob: formattedDob,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("phoneNumber", user.phoneNumber);
      formData.append("gmail", user.gmail);
      formData.append("address", user.address);
      formData.append("dob", user.dob);
      formData.append("idNumber", user.idNumber);

      const response = await axios.patch(
        "http://localhost:8000/user/profile",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
        message.success("Profile update successfully..");
        console.log("Updated User Data:", response.data);
        
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCloseButtonClick = () => {
    navigate("/admin/userTable");
  };

  return (
    <>
      <DefaultHandle>
        <div className="form_addContainer_profile">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleCloseButtonClick}>
              <CloseOutlined />
            </div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={user.firstName}
              onChange={(e) => setUser({...user, firstName: e.target.value })}
              required
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={user.lastName}
              onChange={(e) => setUser({...user, lastName: e.target.value })}
              required
            />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-control"
              value={user.phoneNumber}
              onChange={(e) => setUser({...user, phoneNumber: e.target.value })}
              required
            />

            <label htmlFor="gmail">Email</label>
            <input
              type="email"
              id="gmail"
              className="form-control"
              value={user.gmail}
              onChange={(e) => setUser({...user, gmail: e.target.value })}
              required
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={user.address}
              onChange={(e) => setUser({...user, address: e.target.value })}
              required
            />

            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="form-control"
              value={user.dob}
              onChange={(e) => setUser({...user, dob: e.target.value })}
              required
            />

            <label htmlFor="idNumber">ID Number</label>
            <input
              type="text"
              id="idNumber"
              className="form-control"
              value={user.idNumber}
              onChange={(e) => setUser({...user, idNumber: e.target.value })}
              required
            />
            <button type="submit" className="btn">
              Update Profile
            </button>
          </form>
        </div>
      </DefaultHandle>
    </>
  );
};

export default UpdateProfileForm;


