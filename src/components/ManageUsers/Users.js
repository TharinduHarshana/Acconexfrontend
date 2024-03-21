import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DefaultHandle from "../DefaultHandle";
import { Space } from "antd";

const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      paddingLeft: '0 8px',
    },
  },
  rows: {
    style: {
      fontSize: '16px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      borderBottom: '1px solid #ddd',
    },
  },
  pagination: {
    style: {
      fontSize: '14px',
    },
  },
};


function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/all/");
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Call the loadUsers
  useEffect(() => {
    loadUsers();
  }, []);

  
  const handleDelete = async (_id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/user/delete/${_id}`);
      // Update users state after deletion
      setUsers(users.filter((user) => user._id !== _id));

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);

      alert("An error occurred while deleting the user.");
    }
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
        name:"Phone Number",
        selector:(row)=>row.phoneNumber,

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
          <Link to={`/admin/userform/update/` + row._id}>Edit</Link>
          {"  "}
          <Link onClick={() => handleDelete(row._id)}>Delete</Link>
        </div>
      ),
    },
  ];

  return (
    <>
    <DefaultHandle>
  <Space size={12} style={{ marginBottom: '25px', textAlign: 'right' }}>
    <Link to={"/admin/userform"} style={{ marginTop: "20px" }}>Add User</Link>
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


      

      

      {/* <table>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.userId}</td>
                                <td>{user.firstName}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link to={`/admin/userform/update/`+user._id}>Update</Link>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table> */}
    </>
  );
}

export default Users;
