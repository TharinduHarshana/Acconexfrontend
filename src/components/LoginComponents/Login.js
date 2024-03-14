
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { login } from '../../Utility/api/user.api';
import { useNavigate } from 'react-router-dom';




function Login() {
    const [loginData,setLoginData]=useState({userName:"",password:""})
    // Initialize useNavigate hook
    const navigate = useNavigate(); 

    async function handleSubmit(){
        try {
          const res= await login(loginData);
          console.log(res);
          if (res && res.data) {
            // Navigate to dashboard route upon successful login
            navigate('/dashboard');
        }
        } catch (error) {
          alert("Error Occured");
        }
      }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography>Login</Typography>
      <TextField id="filled-basic" label="User Name" variant="filled" onChange={e=>e && e.target && setLoginData({...loginData,userName:e.target.value})}/>
      <TextField id="filled-basic" label="Password" variant="filled" onChange={e=>e && e.target && setLoginData({...loginData,password:e.target.value})}/>
      <Button variant="text" onClick={handleSubmit}>Sign In</Button>
      

      
    </Box>
  )
}

export default Login
