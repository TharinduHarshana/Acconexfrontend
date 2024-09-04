import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultHandle from '../components/DefaultHandle';
import { Modal,Space } from 'antd';
import swal from 'sweetalert';
import {EditFilled ,DeleteFilled } from '@ant-design/icons';

const Items = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);
  // Assign Items
  const column = [
    {
      name: 'Display Name',
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: 'Cost Price (LKR)',
      selector: (row) => row.costPrice,
      sortable: true,
    },
    {
      name: 'Selling Price (LKR)',
      selector: (row) => row.sellingPrice,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Image',
      cell: (row) => <img src={row.imageLink} alt="Item Image" style={{ width: '50px' }} />,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <Link
            to={`update/${row._id}`}
          >
            <EditFilled/>
          </Link>
          <span style={{ margin: "0 8px" }}></span>
          <Link
            onClick={(e) => handleDelete(row._id)}
          >
            <DeleteFilled/>
          </Link>
        </div>
      ),
    },
  ];

  // Get All Items from DB
  const [items, setItems] = useState([]);
  const [FilterItems, setFilterItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://acconex-backend.vercel.app/item/');
        setItems(res.data.data);
        setFilterItems(res.data.data);
      } catch (err) {
        console.error('Error fetching items:', err);
        swal({
          title: 'Error',
          text: 'An error occurred while fetching items.',
          icon: 'error',
          button: 'OK',
        });
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Delete Function
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://acconex-backend.vercel.app/item/delete/${_id}`, {
        withCredentials: true,
      });
      Swal.fire({
        icon: 'success',
        title: 'Item Deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setIsAccessDeniedVisible(true);
      } else {
        console.error('Error deleting inventory:', error);
        swal({
          title: 'Error',
          text: 'An error occurred while deleting inventory.',
          icon: 'error',
          button: 'OK',
        });
      }
    }
  };

  // Search Function
  const filterItem = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const itemData = FilterItems.filter(
      (row) =>
        row.displayName.toLowerCase().includes(searchValue) ||
        row.productID.toLowerCase().includes(searchValue)
    );
    setItems(itemData);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }


  // Modal Close Function
  const closeModal = () => {
    setIsAccessDeniedVisible(false);
  };

  // Data table and Display Items
  return (
    <DefaultHandle>
      <div style={{ display: '', height: '500px', overflow: 'auto' }}>
        <div>
          <input type="text" className="input" placeholder="Search item ..." onChange={filterItem} style={{
              marginBottom: "12px",
              width: "300px",
              padding: "5px",
              borderRadius: "5px",
              transition: "border-color 0.3s",
            }}  />
        </div>

        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "25px",
          }}>
          <Space size={12}></Space> 
          <Link to="/admin/addnewitem" style={{ fontSize: "14px" }}>
           Add  Item
          </Link>
       </div>

        <DataTable columns={column} data={items} pagination selectableRows></DataTable>

        <Modal
          title="Access Denied!"
          visible={isAccessDeniedVisible}
          onCancel={closeModal}
          footer={[
            <button onClick={closeModal} key="back">
              OK
            </button>,
          ]}
        >
          <p>You do not have permission to delete the inventory.</p>
        </Modal>
      </div>
    </DefaultHandle>
  );
};

const newItemBtnStyle = {
  //width: '100%', // Adjusted button width to fit the form container
  theme: 'dark',
  borderRadius: '12px',
  height: '40px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

export default Items;
