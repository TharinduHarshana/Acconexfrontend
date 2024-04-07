import React from 'react';

import { DatePicker } from 'antd';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AddNewItem from './components/InventoryComponent/Inventory.AddnewItem';
import Inventory from './pages/Inventory'
import UpdateItem from './components/InventoryComponent/inventory.UpdateItem';
import './styles/sidebar.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        
         

        {/* admin routes */}
        <Route path="/admin/home" element={<Homepage />} />
        <Route path="/admin/addnewitem" element={<AddNewItem/>}/>
        <Route path="/admin/Inventory" element={<Inventory/>}/>
        <Route path="/admin/updateitem" element={<UpdateItem/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;