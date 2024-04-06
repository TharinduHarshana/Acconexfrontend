
import React from 'react';
import UserForm from './components/UserData/UserForm';
import UserTable from './components/UserData/UserTable';
import Login from './components/LoginComponents/Login';
import Homepage from './pages/Homepage';
import SalesDachboad from './components/SalesComponents/SalesDachboad';
import Bill from './components/SalesComponents/Bill';
import Customer from './components/SalesComponents/Customer';
import SuspendSale from './components/SalesComponents/SuspendSale';
import ViewCutomer from './pages/ViewCutomer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Daily_sales from './components/SalesComponents/Daily_sales';



function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path='/userform' element={<UserForm />} />
        <Route path='/user' element={<UserTable />} />
          <Route path="/" element={<Homepage />} />
          <Route path='/sale' element={<SalesDachboad/>}/>
          <Route path='/bill' element={<Bill/>}/>
          <Route path='/addcus' element={<Customer/>}/>
          <Route path='/holdbill' element={<SuspendSale/>}/>
          <Route path='/log' element={<Login/>}/>
          <Route path='/viewcustomer' element={<ViewCutomer/>}/>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/dailysales' element={<Daily_sales/>}/>


        {/* User Routes */}
{/* 
         <Route path='/' element={<Dashboard/>} /> */}
        

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
