
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Login from './components/LoginComponents/Login';
import Homepage from './pages/Homepage';
import SalesDachboad from './components/SalesComponents/SalesDachboad';
import Bill from './components/SalesComponents/Bill';
import AddCustomer from './components/SalesComponents/AddCustomer';
import SuspendSale from './components/SalesComponents/SuspendSale';
import ViewCutomer from './pages/ViewCutomer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/user' element={<UserTable />} />
          <Route path="/home" element={<Homepage />} />
          <Route path='/sale' element={<SalesDachboad/>}/>
          <Route path='/bill' element={<Bill/>}/>
          <Route path='/addcus' element={<AddCustomer/>}/>
          <Route path='/holdbill' element={<SuspendSale/>}/>
          <Route path='/log' element={<Login/>}/>
          <Route path='/viewcustomer' element={<ViewCutomer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
