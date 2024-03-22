import React from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd'; // Assuming you are using Ant Design
import DataTable from 'react-data-table-component'; // Assuming you are using react-data-table-component
import DefaultHandle from '../DefaultHandle';

function ManageInventory() {
  // Mock data
  const users = [
    {
     
      itemId: 'I001',
      name: 'HIKVISION WEB CAMERA DS-U02 (6 MONTHS WARRANTY)',
      category: 'DESKTOP ACCESSORIES',
      costprice: "Rs.6200,00",
      sellingprice: "Rs.7900.00",
      quantity: 2
    },
    {
     
      itemId: 'I002',
      name: 'BASEUS GRAIN PRO CAE CHARGER ( 6 MONTHS WARRANTY)',
      category: 'MOBILE ACCESSORIES',
      costprice: "Rs.1200,00",
      sellingprice: "Rs.1500.00",
      quantity: 10
    },
    
  ];

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: '0 8px',
        backgroundColor: '#00416A',
      },
    },
    rows: {
      style: {
        fontSize: '16px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        borderBottom: '1px solid #ddd',
      },
    },
    pagination: {
      style: {
        fontSize: '14px',
        color: 'black',
        backgroundColor: '#76ABDF',
      },
    },
  };

  const columns = [
    {
      name: 'Item Id',
      selector: (row) => row.itemId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
    },
    {
      name: 'Cost Price',
      selector: (row) => row.costprice,
      sortable: true,
    },
    {
      name: 'Selling Price',
      selector: (row) => row.sellingprice,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <Link to={`${row._id}`}>Edit</Link>
          <span style={{ margin: '0 8px' }}>|</span>
          <Link to={``}>Delete</Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DefaultHandle>
        <Space size={12} style={{ marginBottom: '25px', textAlign: 'right' }}>
          <Link to={'/admin/userform'} style={{ marginTop: '20px', fontSize: '16px' }}>
            Add Inventory
          </Link>
        </Space>
        <DataTable
          columns={columns}
          data={users}
          selectableRows
          fixedHeader
          pagination
          customStyles={tableCustomStyles}
        />
      </DefaultHandle>
    </div>
  );
}

export default ManageInventory;
