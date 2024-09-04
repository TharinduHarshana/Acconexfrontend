import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, message, Space } from "antd";
import DefaultHandle from "../DefaultHandle";
import "../../styles/accessmodal.css";
import swal from 'sweetalert'; 
import {EditFilled ,DeleteFilled } from '@ant-design/icons';

function Users() {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://acconex-backend.vercel.app/user/all", {
          withCredentials: true,
        });
        setUsers(response.data.data);
        setFilterUser(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setIsAccessDeniedVisible(true);
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

  const handleDelete = async (_id) => {
    try {
      const userToDelete = users.find(user => user._id === _id);
      if (userToDelete.role === "admin") {
        message.error("Cannot delete admin user!");
        return;
      }
      await axios.delete(`https://acconex-backend.vercel.app/user/delete/${_id}`, {
        withCredentials: true,
      });
      const updatedUsers = users.filter(user => user._id !== _id);
      setUsers(updatedUsers);
      setFilterUser(updatedUsers);
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
      },
    });
  };

  const filterUsers = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const userData = users.filter(row =>
      row.firstName.toLowerCase().includes(searchValue) ||
      row.userId.toLowerCase().includes(searchValue)
    );
    setFilterUser(userData);
  };

  const columns = [
    {
      name: "User Id",
      selector: row => row.userId,
      sortable: true,
    },
    {
      name: "First Name",
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: row => row.phoneNumber,
    },
    {
      name: "User Role",
      selector: row => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: row => (
        <div>
          <Link to={`/admin/userform/update/${row._id}`}><EditFilled/></Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}><DeleteFilled/></Link>
        </div>
      ),
    },
  ];

  const closeModal = () => {
    setIsAccessDeniedVisible(false);
    navigate("/admin/dashboard");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            type="text"
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
              transition: "border-color 0.3s",
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
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <DataTable
          columns={columns}
          data={filterUser}
          selectableRows
          fixedHeader
          pagination
        />
        </div>
      </div>
      <Modal
        title="Access Denied!"
        visible={isAccessDeniedVisible}
        onCancel={closeModal}
        footer={[
          <button onClick={closeModal} key="back">
            OK
          </button>,
        ]}
      >
        <p>You do not have permission to view this page.</p>
      </Modal>
    </DefaultHandle>
  );
}

export default Users;


