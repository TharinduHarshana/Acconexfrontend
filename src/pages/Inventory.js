import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultHandle from '../components/DefaultHandle';
import { Modal } from 'antd';
import swal from 'sweetalert';

const Items = () => {
  const navigate = useNavigate();
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);
  // Assign Items
  const column = [
    {
      name: 'Product ID',
      selector: (row) => row.productID,
      sortable: true,
    },
    {
      name: 'Display Name',
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: 'Cost Price',
      selector: (row) => row.costPrice,
      sortable: true,
    },
    {
      name: 'Selling Price',
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
            Edit
          </Link>
          <Link
            onClick={(e) => handleDelete(row._id)}
          >
            Delete
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
      try {
        const res = await axios.get('http://localhost:8000/item/');
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
      }
    };
    fetchData();
  }, []);

  // Handle Delete Function
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/item/delete/${_id}`, {
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

  // Modal Close Function
  const closeModal = () => {
    setIsAccessDeniedVisible(false);
  };

  // Data table and Display Items
  return (
    <DefaultHandle>
      <div>
        <div>
          <input type="text" className="input" placeholder="Search..." onChange={filterItem} />
        </div>

        <div className="text-end">
          <Link to="/admin/addnewitem">
            <button style={newItemBtnStyle}>New Item</button>
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
