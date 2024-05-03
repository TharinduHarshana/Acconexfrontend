import React from 'react';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Login from './components/LoginComponents/Login';
import { DatePicker } from 'antd';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './styles/sidebar.css';
import WebHomepage from './pages/WebHomepage';
import Category from './pages/WebCategory';
import WebLogin from './pages/Weblogin';
import WebRegister from './pages/WebRegister';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path='/web/home' element={<WebHomepage/>} />
        <Route path='/web/:slug' element={<Category/>} />
        <Route path='/web/login' element={<WebLogin/>} />
        <Route path='/web/register' element={<WebRegister/>} />
         

        {/* admin routes */}
        <Route path='/admin' element={<Login />} />
        <Route path='/admin/userform' element={<UserForm />} />
        <Route path='/admin/userTable' element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
