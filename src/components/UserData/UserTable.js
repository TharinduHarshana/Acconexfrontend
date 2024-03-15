import { Paper, Table,TableRow,TableBody, TableCell, TableContainer, TableHead,Button } from '@mui/material'
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { getUsers } from '../../Utility/api/user.api';


function UserTable() {

  const [data,setData]=useState([]);
  useEffect(()=>{getUsers()},[]);
  
  function getUsers() {
    // Call API to fetch users
    // Update state with fetched data
    getUsersFromAPI().then(res => setData(res.data)).catch(error => console.error(error));
  }

  async function getUsersFromAPI() {
    try {
      const response = await axios.get("http://localhost:8000/user/");
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>User Role</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {data.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button >Edit</Button>
                <Button >Delete</Button>
              </TableCell>
            </TableRow>
          ))} 
            </TableBody>
        </Table>

    </TableContainer>
  )
}

export default UserTable