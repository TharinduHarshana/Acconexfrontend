import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//login and dashboard import
import Login from "./components/LoginComponents/Login";
import Dashboard from "./components/SideBarComponent/DefaultHandle";
import Homepage from "./pages/Homepage";
import AdminDashboard from "./components/AdminDashboard";

//import user components
import CreateUser from "./components/ManageUsers/CreateUser";
import Users from "./components/ManageUsers/Users";
import UpdateUser from "./components/ManageUsers/UpdateUser";

//import customer and supplier components

import CreateSupplierForm from "./components/ManageUsers/CreateSupplier";
import Supplier from "./components/ManageUsers/Supplier";
import UpdateSupplier from "./components/ManageUsers/UpdateSupplier";

//import item kits
import ItemKits from "./components/ManageInventory/ItemKits";
import ItemKitsTable from "./components/ManageInventory/ItemKitsTable";

//import sales components
import SalesDachboad from './components/SalesComponents/SalesDachboad';
import Bill from './components/SalesComponents/Bill';
import Customer from './components/CustomerComponents/Customer';
import SuspendSale from './components/SalesComponents/SuspendSale';

import Daily_sales from './components/SalesComponents/Daily_sales';



// web imports



// import web components

import WebHomepage from "./pages/WebHomepage";
import CustomerForm from "./components/CustomerComponents/customerForm";
import Category from './pages/WebCategory';
import WebLogin from './pages/Weblogin';
import WebRegister from './pages/WebRegister';

//import inventory 
import InventoryAdd from './components/InventoryComponent/Inventory.AddnewItem';
import InventoryUpdate from './components/InventoryComponent/inventory.UpdateItem';
import InventoryHome from './pages/Inventory';




function App() {
  return (
    <BrowserRouter>
      <Routes>
    {/* user routing path */}
    <Route path='/web/home' element={<WebHomepage/>} />
    <Route path='/web/:slug' element={<Category/>} />
    <Route path='/web/login' element={<WebLogin/>} />
    <Route path='/web/register' element={<WebRegister/>} />
        

       {/* admin routing path */}
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/dashbord" element={< Dashboard/>} />
        <Route path="/admin/userform" element={<CreateUser />} />
        <Route path="/admin/userform/update/:id" element={<UpdateUser/>} />
        <Route path="/admin/userTable" element={<Users />} />
        <Route path="/admin/customer" element={<Customer/>}/>
       <Route path="/admin/customerform" element={<CustomerForm/>}/>



        

        <Route path="/admin/supplier" element={<Supplier/>}/>
        <Route path="/admin/supplier/create" element={<CreateSupplierForm/>}/>
        <Route path="/admin/supplier/update/:id" element={<UpdateSupplier />} />
        <Route path="admin/inventory/item-kits" element={<ItemKits/>}/>
        <Route path="admin/inventory/item-kits/table" element={<ItemKitsTable/>}/>

       
        
         

        <Route path='admin/sale' element={<SalesDachboad/>}/>
        <Route path='admin/bill' element={<Bill/>}/>
        <Route path='/admin/customer' element={<Customer/>}/>
        <Route path='admin/holdbill' element={<SuspendSale/>}/>




        {/* <Route path='admin/viewcustomer' element={<ViewCutomer/>}/> */}

        <Route path='admin/inventory' element={<InventoryHome/>}/>
        <Route path="admin/addnewitem" element={<InventoryAdd/>}/> 

        
        <Route path='/admin/sale' element={<SalesDachboad/>}/>
        <Route path='/admin/bill' element={<Bill/>}/>
        <Route path='/admin/addcus' element={<Customer/>}/>
        <Route path='/admin/holdbill' element={<SuspendSale/>}/>
        {/* <Route path='/admin/viewcustomer' element={<ViewCutomer/>}/> */}

        <Route path='/admin/inventory' element={<InventoryHome/>}/>
        <Route path="/admin/addnewitem" element={<InventoryAdd/>}/> 


        <Route path="/admin/inventory/updateitem/:id" element={<InventoryUpdate/>}/>
        
        


      </Routes>
    </BrowserRouter>
  );
}

export default App;