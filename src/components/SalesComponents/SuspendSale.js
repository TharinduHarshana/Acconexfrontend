
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/customer.css';
import DefaultHandleSales from './DefaultHandleSales';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { Input, Modal, Button ,message} from "antd";
import '../../styles/suspendsale.css';
import { Link } from "react-router-dom";
import {DeleteFilled } from '@ant-design/icons';

function SuspendSale() {
  const [suspendSale, setSuspendSale] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const navigate = useNavigate();

  const fetchSuspendSale = async () => {
    try {
      const response = await axios.get('http://localhost:8000/suspendsale/');
      const sortedData = response.data.data.sort((a,b) =>new Date(b.Date) - new Date(a.Date));
      setSuspendSale(sortedData); // Adjust this line based on actual response structure
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

  const handleRestore = async  () => {
    if (selectedSale) {
      const itemIds = selectedSale.Item_IDs.split(',');
      const itemNames = selectedSale.Item_Names.split(',');
      const quantities = selectedSale.Qnt.split(',');
      const prices = selectedSale.Prices.split(',');
      const discounts = selectedSale.Discounts.split(',');

      const items = itemIds.map((itemId, index) => ({
        productID: itemId,
        product: itemNames[index],
        quantity: quantities[index],
        price: prices[index],
        discount: discounts[index],
      }));

      sessionStorage.setItem('restoredSale', JSON.stringify({
        selectedSale,
        items
      }));

      try {
        await axios.delete(`http://localhost:8000/suspendsale/delete/${selectedSale.suspend_id}`);
        message.success('Suspended sale restored and deleted successfully');
        fetchSuspendSale(); // Refresh the suspended sale list
      } catch (error) {
        message.error('Error deleting suspended sale');
        console.log('Error Deleting Data', error);
      }

      setModalVisible(false);
      navigate('/admin/sale');
    }
  };

  const handleDelete = async (suspend_id) => {
    try {
      await axios.delete(`http://localhost:8000/suspendsale/delete/${suspend_id}`);
      message.success('Suspended sale deleted successfully');
      fetchSuspendSale(); // Refresh the suspended sale list
    } catch (error) {
      message.error('Error deleting suspended sale');
      console.error('Error Deleting Data', error);
    }
  };

  
  //delete confirmation masg
  const showDeleteConfirmation = (suspend_id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this suspend sale?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(suspend_id);
      },
    });
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const filteredDataList = suspendSale.filter(
    (row) =>
      (row.customer_name && row.customer_name.toLowerCase().includes(searchValue.toLowerCase())) ||
      (row.datetime && row.datetime.toLowerCase().includes(searchValue.toLowerCase()))
  );
  

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className='suspendSale_content'>
      <DefaultHandleSales>
        <div className='suspend_search'>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Input
              placeholder="Search sales by customer name or date"value={searchValue} onChange={handleSearch}
              style={{ marginBottom: "12px", width: "300px" }}
            />
          </div>
        </div>
        <div className='suspendSale_table'>
        <DataTable 
          columns={[
            { name: 'Suspend_Id', selector: (row) => row.suspend_id, sortable: true ,width: '110px'},
            { name: 'Cashier Name', selector: (row) => row.Cashire_Name, sortable: true,width: '110px'},
            { name: 'Date', selector: (row) => row.Date, sortable: true,width: '135px' },
            { name: 'Customer ID', selector: (row) => row.customer_id, sortable: true,width:'110px' },
            { name: 'Customer Name', selector: (row) => row.customer_name, sortable: true,width:'125px' },
            { name: 'Item ID', selector: (row) => row.Item_IDs, sortable: true,width:'90px' },
            { name: 'Item Name', selector: (row) => row.Item_Names, sortable: true,width: '220px' },
            { name: 'Qnt', selector: (row) => row.Qnt, sortable: true,width: '80px' },
            // { name: 'Price', selector: (row) => row.Prices, sortable: true,width: '90px' },
            // { name: 'Discount', selector: (row) => row.Discounts, sortable: true ,width: '68px'},
            { name: 'Amount', selector: (row) => row.total, sortable: true ,width: '90px'},
            {
              name: 'Actions',
              cell: (row) => (
                <Link 
                  onClick={() => showDeleteConfirmation(row.suspend_id)}
                >
                  <DeleteFilled/>
                </Link>
              )
            }
          ]}
          data={filteredDataList}
          selectableRows
          fixedHeader
          pagination
          onRowClicked={handleRowClick}
        />
        </div>
        
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
            <p><strong>Price:</strong> {selectedSale.Prices}</p>
            <p><strong>Discount:</strong> {selectedSale.Discounts}</p>
            <p><strong>Total Amount:</strong> {selectedSale.total}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SuspendSale;
