
import React from 'react';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Dashboard from './components/Dashboard';
import Login from './components/LoginComponents/Login';
import { DatePicker } from 'antd';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}

        <Route path='/' element={<Dashboard />} />
        

        {/* admin routes */}
        <Route path='/admin' element={<Login />} />
        <Route path='/admin/userform' element={<UserForm />} />
        <Route path='/admin/userTable' element={<UserTable />} />
        <Route path="/admin/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
