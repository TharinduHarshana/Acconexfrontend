
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
        <Route path='/' element={<Login />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/userTable' element={<UserTable />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
