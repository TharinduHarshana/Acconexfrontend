
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Login from './components/LoginComponents/Login';
import Homepage from './pages/Homepage';
import SalesDachboad from './components/SalesComponents/SalesDachboad';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/user' element={<UserTable />} />
          <Route path="/home" element={<Homepage />} />
          <Route path='/sale' element={<SalesDachboad/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
