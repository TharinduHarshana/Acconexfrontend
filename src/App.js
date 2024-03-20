
import React from 'react';

import Dashboard from './components/Dashboard';
import Login from './components/LoginComponents/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreateUser from './components/ManageUsers/CreateUser';
import Users from './components/ManageUsers/Users';
import UpdateUser from './components/ManageUsers/UpdateUser';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}

        <Route path='/' element={<Dashboard />} />
        

        {/* admin routes */}
        <Route path='/admin' element={<Login />} />
        <Route path='/admin/userform' element={<CreateUser/>} />
        <Route path="/admin/userform/update/:id" element={<UpdateUser/>} />
        <Route path='/admin/userTable' element={<Users/>} />
        <Route path="/admin/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
