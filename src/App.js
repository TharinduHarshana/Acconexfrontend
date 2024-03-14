import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Dashboard from './components/Dashboard';
import Login from './components/LoginComponents/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/userTable' element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
