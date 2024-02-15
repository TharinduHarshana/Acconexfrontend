import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";



function SignIn() {
  const navigate=useNavigate();
    
  return (
    <>
    <form className="sign-in-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <a href="#" onClick={()=>{navigate('/forgetpwd')}}>Forget password</a>
      </form>
    </>
  )
}

export default SignIn