import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, message, Space } from "antd";
import DefaultHandle from "../DefaultHandle";
import swal from 'sweetalert';

function Users() {
  // State to store the list of users
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  //Effect hook to fetch users data when the component mounts
  // useEffect(() => {
  //   const loadUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get("http://localhost:8000/user/all", {
  //         withCredentials: true,
  //       });
  //        // Check if the response indicates an unauthorized access
  //     if (response.status === 403) {
  //       message.error("Access Denied: You do not have permission to view this page.");
  //       return; // Exit the function early
  //     }
  //       console.log(response.data);

  //       // Set the users state with the data from the response
  //       setUsers(response.data.data);
  //       //console.log(response.data);
  //       setFilterUser(response.data.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUsers();
  // }, []);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get("http://localhost:8000/user/all", {
  //         withCredentials: true,
  //       });
  //       console.log(response.data);
  //       setUsers(response.data.data);
  //       setFilterUser(response.data.data);
  //     } catch (error) {
  //       if (error.response && error.response.status === 403) {
  //         message.error("Access Denied: You do not have permission to view this page.");
  //       } else {
  //         console.error("Error fetching users:", error);
  //         message.error("An error occurred while fetching users.");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUsers();
  // }, []);
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/user/all", {
          withCredentials: true,
        });
        console.log(response.data);
        setUsers(response.data.data);
        setFilterUser(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          swal({
            title: "Access Denied",
            text: "You do not have permission to view this page.",
            icon: "error",
            button: "OK",
          }).then(() => {
            navigate("/admin/dashboard"); // Redirect to the home page after closing the alert
          });
        } else {
          console.error("Error fetching users:", error);
          swal({
            title: "Error",
            text: "An error occurred while fetching users.",
            icon: "error",
            button: "OK",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  // Function to handle user deletion

  const handleDelete = async (_id) => {
    try {
      // Find the user by id to check the role
      const userToDelete = users.find((user) => user._id === _id);

      if (userToDelete.role === "admin") {
        message.error("Cannot delete admin user!");
        return;
      }
      await axios.delete(`http://localhost:8000/user/delete/${_id}`, {
        withCredentials: true,
      });
      // Filter out the deleted user from the users state
      const updatedUsers = users.filter((user) => user._id !== _id);
      setUsers(updatedUsers);
      setFilterUser(updatedUsers); // Update filterUser state as well
      message.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("An error occurred while deleting the user.");
    }
  };

  // Function to display a confirmation modal before deleting a user
  const showDeleteConfirmation = (_id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // Call handleDelete function if user confirms deletion
        handleDelete(_id);
      },
    });
  };

  // Search users
  const filterUsers = (event) => {
    const searchValue = event.target.value.toLowerCase();

    const userData = users.filter(
      (row) =>
        row.firstName.toLowerCase().includes(searchValue) ||
        row.userId.toLowerCase().includes(searchValue)
    );

    setFilterUser(userData); // Update filterUser state with filtered data
  };

  const columns = [
    {
      name: "User Id",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "User Role",
      selector: (row) => row.role,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/admin/userform/update/${row._id}`}>Edit</Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}>Delete</Link>
        </div>
      ),
    },
  ];

  return (
    <DefaultHandle>
      <div style={{ marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            type="text end"
            placeholder="Search User ..."
            onChange={filterUsers}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              marginBottom: "12px",
              width: "300px",
              padding: "5px",
              border: isHovered ? "1px solid black" : "1px solid #ccc",
              borderRadius: "5px",
              transition: "border-color 0.3s"
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Space size={12}></Space>
          <Link to={"/admin/userform"} style={{ fontSize: "14px" }}>
            Add User
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={filterUser}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </DefaultHandle>
  );
}

export default Users;
