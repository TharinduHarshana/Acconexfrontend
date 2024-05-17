import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import '../../styles/customer.css';
import DefaultHandleSales from './DefaultHandleSales';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { Input, Modal, Button } from "antd";


function SuspendSale() {
  const [suspendsale, setSuspendsale] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [restoredItems, setRestoredItems] = useState([]);
  const navigate  = useNavigate();


  const fetchSuspendSale = async () => {
    try {
      const response = await axios.get('http://localhost:8000/suspendsale/');
      setSuspendsale(response.data.data); // Adjust this line based on actual response structure
    } catch (error) {
      console.log('Error Fetching Data', error);
    }
  };
 

  useEffect(() => {
    fetchSuspendSale();
  }, []);

  const handleRowClick = (row) => {
    setSelectedSale(row);
    setModalVisible(true);
   
  };

  const handleRestore = () => {
    if (selectedSale) {
      const itemIds = selectedSale.Item_IDs.split(',');
      const itemNames = selectedSale.Item_Names.split(',');
      const quantities = selectedSale.Qnt.split(',');
  
      const items = itemIds.map((itemId, index) => ({
        itemId: itemId,
        productName: itemNames[index],
        quantity: quantities[index]
      }));
  
      setRestoredItems(items);
      setModalVisible(false);
  
      navigate('/admin/bill', { 
        state: { 
          selectedSale, 
          restoredItems: items 
        } 
      });
    }
  };
  


  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className='suspendsale_table'>
      <DefaultHandleSales>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Input
              placeholder="Search sales by customer name or date"
              style={{ marginBottom: "12px", width: "300px" }}
            />
          </div>
        </div>

        <DataTable
          columns={[
            { name: 'Suspend_Id', selector: (row) => row.suspend_id, sortable: true },
            { name: 'Cashier Name', selector: (row) => row.Cashire_Name, sortable: true },
            { name: 'Date', selector: (row) => row.Date, sortable: true },
            { name: 'Customer ID', selector: (row) => row.customer_id, sortable: true },
            { name: 'Customer Name', selector: (row) => row.customer_name, sortable: true },
            { name: 'Item ID', selector: (row) => row.Item_IDs, sortable: true },
            { name: 'Item Name', selector: (row) => row.Item_Names, sortable: true },
            { name: 'Quantity', selector: (row) => row.Qnt, sortable: true },
            { name: 'Total Amount', selector: (row) => row.total, sortable: true },
          ]}
          data={suspendsale}
          selectableRows
          fixedHeader
          pagination
          onRowClicked={handleRowClick}
        />
      </DefaultHandleSales>

      <Modal
        title="Suspend Sale Details"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="restore" type='primary' onClick={handleRestore}>
            Restore
          </Button>
        ]}
      >
        {selectedSale && (
          <div>
            <p><strong>Suspend ID:</strong> {selectedSale.suspend_id}</p>
            <p><strong>Cashier Name:</strong> {selectedSale.Cashire_Name}</p>
            <p><strong>Date:</strong> {selectedSale.Date}</p>
            <p><strong>Customer ID:</strong> {selectedSale.customer_id}</p>
            <p><strong>Customer Name:</strong> {selectedSale.customer_name}</p>
            <p><strong>Item ID:</strong> {selectedSale.Item_IDs}</p>
            <p><strong>Item Name:</strong> {selectedSale.Item_Names}</p>
            <p><strong>Quantity:</strong> {selectedSale.Qnt}</p>
            <p><strong>Total Amount:</strong> {selectedSale.total}</p>
          </div>
        )}
       
      </Modal>

    </div>
  );
}

export default SuspendSale;
