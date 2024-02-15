import logo from './logo.svg';
import React from 'react';
import SignIn from './components/LoginComponents/SignIn';

import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ForgetPassword from './components/LoginComponents/ForgetPassword';


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<SignIn></SignIn>
    },{
      path:"/forgetpwd",
      element:<ForgetPassword></ForgetPassword>
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
