import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, message, Space } from "antd";
import DefaultHandle from "../DefaultHandle";

const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "bold",
      color:"white",
      paddingLeft: "0 8px",
      backgroundColor: "#00416A",
      
    }
  },
  rows: {
    style: {
      fontSize: "16px"
    }
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      borderBottom: "1px solid #ddd"
    }
  },
  pagination: {
    style: {
      fontSize: "14px",
      color:"black",
      backgroundColor:"#76ABDF"
    }
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/all/");
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${_id}`);
      setUsers(users.filter((user) => user._id !== _id));
      message.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("An error occurred while deleting the user.");
    }
  };

  const showDeleteConfirmation = (_id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(_id);
      }
    });
  };

  const columns = [
    {
      name: "User Id",
      selector: (row) => row.userId,
      sortable: true
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber
    },
    {
      name: "User Role",
      selector: (row) => row.role,
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/admin/userform/update/${row._id}`}>Edit</Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}>Delete</Link>
        </div>
      )
    }
  ];

  return (
    <DefaultHandle>
      <Space size={12} style={{ marginBottom: "25px", textAlign: "right" }}>
        <Link to={"/admin/userform"} style={{ marginTop: "20px",fontSize:"16px"}}>
          Add User
        </Link>
      </Space>
      <DataTable
        columns={columns}
        data={users}
        selectableRows
        fixedHeader
        pagination
        customStyles={tableCustomStyles}
      />
    </DefaultHandle>
  );
};

export default Users;
