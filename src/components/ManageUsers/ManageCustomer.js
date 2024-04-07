import React from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd'; // Assuming you are using Ant Design
import DataTable from 'react-data-table-component'; // Assuming you are using react-data-table-component
import DefaultHandle from '../DefaultHandle';

function ManageCustomer() {
  // Mock data
  const users = [
    {
      
      customerId: 'C001',
      name: 'Saman silva',
      address: 'Galle',
      phoneNumber: '0753216541',
    },
    {
      
      customerId: 'C002',
      name: 'Tharuka perera',
      address: 'Colombo',
      phoneNumber: '0765413215',
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
      name: 'Customer Id',
      selector: (row) => row.customerId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
   
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <Link to={`${row._id}`}>Create</Link>
          <span style={{ margin: '0 8px' }}>|</span>
          <Link to={``}>Edit</Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DefaultHandle>
        <Space size={12} style={{ marginBottom: '25px', textAlign: 'right' }}>
          
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

export default ManageCustomer;
