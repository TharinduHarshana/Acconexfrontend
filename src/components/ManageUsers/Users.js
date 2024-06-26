import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, message, Space, Button, Tooltip,Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DefaultHandle from "../DefaultHandle";

function Users() {
  // State to store the list of users
  const [users, setUsers] = useState([]);
 
  //Effect hook to fetch users data when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/all");
        // Set the users state with the data from the response
        setUsers(response.data.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);
  


  // Function to handle user deletion
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${_id}`);
      // Filter out the deleted user from the users state
      setUsers(users.filter((user) => user._id !== _id));
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
      
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: "25px",
          
        }}
      >
        <Space size={12}>
          
        </Space>
        <Link to={"/admin/userform"} style={{ fontSize: "16px" }}>
          Add User
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={users}
        selectableRows
        fixedHeader
        pagination
      />
    </DefaultHandle>
  );
}

export default Users;
