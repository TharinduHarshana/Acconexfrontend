import React from "react";
// import Dashboard from "./components/Dashboard";
import Login from "./components/LoginComponents/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreateUser from "./components/ManageUsers/CreateUser";
import Users from "./components/ManageUsers/Users";
import AdminDashboard from "./components/AdminDashboard";
import UpdateUser from "./components/ManageUsers/UpdateUser";
import ManageCustomer from "./components/ManageUsers/ManageCustomer";
import CreateSupplierForm from "./components/ManageUsers/CreateSupplier";
import Supplier from "./components/ManageUsers/Supplier";
import UpdateSupplier from "./components/ManageUsers/UpdateSupplier";
import ItemKits from "./components/ManageInventory/ItemKits";
import ItemKitsTable from "./components/ManageInventory/ItemKitsTable";


// import SalesDachboad from './components/SalesComponents/SalesDachboad';

import SalesDachboad from './components/SalesComponents/SalesDachboad';
import Bill from './components/SalesComponents/Bill';
import Customer from './components/SalesComponents/Customer';
import SuspendSale from './components/SalesComponents/SuspendSale';
import ViewCutomer from './pages/ViewCutomer';

// web imports
import WebHomepage from "./pages/WebHomepage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
    {/* user routing path */}
    <Route path="/" element={<WebHomepage />} />
        

       {/* admin routing path */}
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/userform" element={<CreateUser />} />
        <Route path="/admin/userform/update/:id" element={<UpdateUser/>} />
        <Route path="/admin/userTable" element={<Users />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/admin/customer" element={<ManageCustomer/>}/>
        <Route path="/admin/supplier" element={<Supplier/>}/>
        <Route path="/admin/supplier/create" element={<CreateSupplierForm/>}/>
        <Route path="/admin/supplier/update/:id" element={<UpdateSupplier />} />
        <Route path="admin/inventory/item-kits" element={<ItemKits/>}/>
        <Route path="admin/inventory/item-kits/table" element={<ItemKitsTable/>}/>

        <Route path='admin/sale' element={<SalesDachboad/>}/>
        <Route path='admin/bill' element={<Bill/>}/>
        <Route path='admin/addcus' element={<Customer/>}/>
        <Route path='admin/holdbill' element={<SuspendSale/>}/>
        <Route path='admin/viewcustomer' element={<ViewCutomer/>}/>
         


      </Routes>
    </BrowserRouter>
  );
}

export default App;
