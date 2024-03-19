
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {  getUsers,deleteUser,getUserById} from "../../Utility/api/user.api";


function UserTable() {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  //load the users
  useEffect(() => {
    fetchUsers();
  }, []);
 
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log("Response data:", response.data);
      setUsers(response.data.data); // Set the users state with the response data
     // console.log(response.data.data); // Log the fetched users data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //delete user
  const handleDelete = async (_id) => {
    try {
      await deleteUser(_id);
      // Update users state after deletion
      setUsers(users.filter((user) => user._id !== _id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
//
  const handleEdit = async (_id) => {
    try {
      const response = await getUserById(_id);
      const userData = response.data;
      navigate("/admin/userform", { state: { userData } });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
 


  //navigate to add user 
  const addUser = () => {
    navigate("/admin/userform");
  };

  const columns = [
    {
      name: "User Id",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
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
          <button onClick={() => handleEdit(row._id)}>Edit</button>
          <button onClick={() => handleDelete(row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <button onClick={addUser}>Add User</button>

      <DataTable
        columns={columns}
        data={users}
        selectableRows
        fixedHeader
        pagination
        className="custom-table"
      />
    </>
  );
}

export default UserTable;



