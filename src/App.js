
import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Dashboard from './components/Dashboard';
import Login from './components/LoginComponents/Login';




function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Login></Login>
    },{
      path:"/userform",
      element:<UserForm></UserForm>
    },
    {
      path:"userTable",
      element:<UserTable></UserTable>
    },
    {
      path:"/dashboard",
      element:<Dashboard></Dashboard>
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
