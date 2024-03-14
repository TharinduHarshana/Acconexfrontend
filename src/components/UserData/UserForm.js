import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { InputLabel, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { user } from "../../Utility/api/user.api";

// import DatePicker from "@mui/lab/DatePicker";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function UserForm() {
//get the data from form
const [formData,setFormData]=useState({userId:"",userName:"",firstName:"",lastName:"",password:"",gmail:"",dob:"",phoneNumber:"",address:"",idNumber:"",gender:"",role:""});

  //call the user function
  async function handleSubmit()
   {
    
     try {
        const res=await user(formData.userId,
          formData.userName,
          formData.firstName,
          formData.lastName,
          formData.password,
          formData.gmail,
          formData.dob,
          formData.phoneNumber,
          formData.address,
          formData.idNumber,
          formData.gender,
          formData.role);
        console.log(res);
      } catch (error) {
        console.log(error)
    }
  
   }
  
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3">User Form</Typography>
      <TextField id="outlined-basic" label="User Id" onChange={e=>e && e.target && setFormData({...formData,userId:e.target.value})} variant="outlined" />
      <TextField id="outlined-basic" label="User Name" onChange={e=>e && e.target && setFormData({...formData,userName:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="First Name" onChange={e=>e && e.target && setFormData({...formData,firstName:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="Last Name" onChange={e=>e && e.target && setFormData({...formData,lastName:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="Password" onChange={e=>e && e.target && setFormData({...formData,password:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="G mail" onChange={e=>e && e.target && setFormData({...formData,gmail:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="DOB" onChange={e=>e && e.target && setFormData({...formData,dob:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="Phone Number" onChange={e=>e && e.target && setFormData({...formData,phoneNumber:e.target.value})}variant="outlined" />
      <TextField id="outlined-basic" label="Address" onChange={e=>e && e.target && setFormData({...formData,address:e.target.value})} variant="outlined" />
      <TextField id="outlined-basic" label="Id Number" onChange={e=>e && e.target && setFormData({...formData,idNumber:e.target.value})}variant="outlined" />
      <InputLabel id="gender-select-label">Gender</InputLabel>
      <Select
        labelId="gender-select-label"
        id="gender-select"
        value={formData.gender}
        label="Gender"
        onChange={(e)=>setFormData({...formData,gender:e.target.value})}
      >
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem> 
      </Select>
      <InputLabel id="role-select-label">Role</InputLabel>
      <Select
        labelId="role-select-label"
        id="role-select"
        value={formData.role}
        label="Role"
        onChange={(e)=>setFormData({...formData,role:e.target.value})}
      >
        <MenuItem value={"inventory"}>Inventory manager</MenuItem>
        <MenuItem value={"cashier"}>Cashier</MenuItem>
        <MenuItem value={"staff"}>Staff member</MenuItem>
      </Select>
      {/* <Button variant="text" onClick={()=>handleSubmit()}>Add</Button> */}
      <Button variant="text" onClick={handleSubmit}>Add</Button>
      
    </Box>
  );
}

export default UserForm;
