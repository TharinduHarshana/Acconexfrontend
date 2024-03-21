import { DatePicker } from 'antd';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
//import InventoryDashboard from './components/InventoryComponent/InventoryDashboard';
import AddNewItem from './components/InventoryComponent/AddNewItem';
import Items from './components/InventoryComponent/Item';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Inventory" element={<Items/>}/>
          <Route path="/add-new-item" element={<AddNewItem />}/>
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
