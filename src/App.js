import { DatePicker } from 'antd';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import InventoryDashboard from './components/InventoryComponent/InventoryDashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Inventory" element={<InventoryDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
