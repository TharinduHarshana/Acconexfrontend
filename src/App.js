import React from 'react';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Login from './components/LoginComponents/Login';
import { DatePicker } from 'antd';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import './styles/sidebar.css';
import WebHomepage from './pages/WebHomepage';
import Category from './pages/WebCategory';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<WebHomepage/>} />
        <Route path='/category/:slug' element={<Category/>} />
         

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
