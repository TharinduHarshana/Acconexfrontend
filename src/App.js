import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//login and dashboard import
import Login from "./components/LoginComponents/Login";
import Dashboard from "./pages/adminDashbord";
import Logout from "./components/LoginComponents/Logout";

//import user components
import CreateUser from "./components/ManageUsers/CreateUser";
import Users from "./components/ManageUsers/Users";
import UpdateUser from "./components/ManageUsers/UpdateUser";


//import customer and supplier components

import CreateSupplierForm from "./components/ManageUsers/CreateSupplier";
import Supplier from "./components/ManageUsers/Supplier";
import UpdateSupplier from "./components/ManageUsers/UpdateSupplier";
import CustomerForm from "./components/CustomerComponents/customerForm";

//import item kits
import ItemKit from "./pages/ItemKitPage";
import ItemKitsForm from "./components/ManageInventory/ItemKits";
import ItemKitsUpdate from "./components/ManageInventory/UpdateKits";


//import sales components
import Bill from './components/SalesComponents/Bill_components/Bill';
import Customer from './components/CustomerComponents/Customer';
import SuspendSale from './components/SalesComponents/SuspendSale';
import Dailysales from './components/SalesComponents/Daily_sales';
import SalesDachboad from './components/SalesComponents/DefaultHandleSales';


// import web components
import Category from './pages/WebCategory';
import WebRegister from './components/WebComponent/WebRegister';
import WebLogin from "./components/WebComponent/WebLogin";
import FrogotPassword from './components/WebComponent/WebFrogotPassword';
import ResetPassword from "./components/WebComponent/WebResetPassword";
import WebHomepage from "./pages/WebHomepage";
import SearchResults from "./components/WebComponent/web.SearchResult";
import Checkout from "./pages/WebCkeckout";
import AboutUs from "./pages/WebAboutUs";
import Services from './pages/WebServicesPage';
import PaymentMethods from './pages/WebPaymentMethodPage'
import ContactUs from './pages/WebContactUs';
import ConfirmCODOrders from './pages/WebCODorders';



//import inventory 
import InventoryAdd from './components/InventoryComponent/Inventory.AddnewItem';
import InventoryUpdate from './components/InventoryComponent/inventory.UpdateItem';
import InventoryHome from './pages/Inventory';
import CategoryHome from "./pages/Category";
import AddNewCategory from "./components/CategoryComponents/Category.AddNewCategory";
import CreateUserForm from "./components/ManageUsers/CreateUser";
import UserProfile from "./components/ManageUsers/UserProfile";





function App() {



  return (
   

    <BrowserRouter>
      <Routes>
    {/* user routing path */}
    <Route path='/web/home' element={<WebHomepage/>} />
    <Route path='/web/:slug' element={<Category/>} />
    <Route path='/web/register' element={<WebRegister/>} />
    <Route path='/web/login' element={<WebLogin/>} />
    <Route path ="/web/forgotpassword" element={<FrogotPassword/>} />
    <Route path ="/web/resetPassword/:token" element={<ResetPassword/>} />
    <Route path ="/web/search/:value" element={<SearchResults/>} />
    <Route path ="/web/checkout" element={<Checkout/>} />
    <Route path ="/web/about" element={<AboutUs/>} />
    <Route path ="/web/services" element={<Services/>} />
    <Route path ="/web/payment" element={<PaymentMethods/>} />
    <Route path ="/web/contact" element={<ContactUs/>} />
    <Route path ="admin/cashondelevery" element={<ConfirmCODOrders/>} />


        

       {/* admin routing path */}
        <Route path="/admin" element={<Login/>} />
        <Route path="admin/logout" element={<Logout/>}/>
        <Route path="/admin/dashboard" element={< Dashboard/>} />
        <Route path="/admin/userform" element={<CreateUserForm/>} />
        <Route path="/admin/userform/update/:id" element={<UpdateUser />} />
        <Route path="/admin/userTable" element={<Users />} />
        <Route path="/admin/customer" element={<Customer/>}/>
        <Route path="admin/editprofile" element={<UserProfile />} /> 
       



        

        <Route path="/admin/supplier" element={<Supplier/>}/>
      
         <Route path="/admin/supplier/create" element={<CreateSupplierForm/>}/> 
        <Route path="/admin/supplier/update/:id" element={<UpdateSupplier />} />
        <Route path="/admin/inventory/item-kits" element={<ItemKit/>}/>
        <Route path="/admin/inventory/kits/add" element={<ItemKitsForm/>}/>
        {/* <Route path="/admin/inventory" element={<Inventory/>}/> */}
        <Route path="/admin/inventory/kits/update/:id" element={<ItemKitsUpdate/>} />
        

        <Route path='admin/inventory' element={<InventoryHome/>}/>
        <Route path="admin/addnewitem" element={<InventoryAdd/>}/>
        <Route path='admin/category' element={<CategoryHome/>}/>
        <Route path='admin/addnewcategory' element={<AddNewCategory/>}/>


        {/* sales routes */}
        <Route path='/admin/sale' element={<Bill/>}/>
        <Route path='/admin/holdbill' element={<SuspendSale/>}/>
        <Route path='/admin/dailysales' element={<Dailysales/>}/>


        <Route path='/admin/inventory' element={<InventoryHome/>}/>
        <Route path='/admin/inventory/addnewitem' element={<InventoryAdd/>}/>
        <Route path='/admin/inventory/update/:id' element={<InventoryUpdate/>}/>
        


        
        
      </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;