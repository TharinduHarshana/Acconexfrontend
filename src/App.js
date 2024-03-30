import React from "react";
import Dashboard from "./components/Dashboard";
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}

        <Route path="/" element={<Dashboard />} />

        {/* admin routes */}
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/userform" element={<CreateUser />} />
        <Route path="/admin/userform/update/:id" element={<UpdateUser />} />
        <Route path="/admin/userTable" element={<Users />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/admin/customer" element={<ManageCustomer/>}/>
        <Route path="/admin/supplier" element={<Supplier/>}/>
        <Route path="/admin/supplier/create" element={<CreateSupplierForm/>}/>
        <Route path="/admin/supplier/update/:id" element={<UpdateSupplier />} />
        <Route path="admin/inventory/itemkits" element={<ItemKits/>}/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
