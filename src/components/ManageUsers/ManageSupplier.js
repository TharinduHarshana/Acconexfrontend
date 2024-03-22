import React from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd'; // Assuming you are using Ant Design
import DataTable from 'react-data-table-component'; // Assuming you are using react-data-table-component
import DefaultHandle from '../DefaultHandle';

function ManageSupplier() {
  // Mock data
  const users = [
    {
      
      supplierId: 'S001',
      firstName: 'Saman ',
      lastName:"Silva",
      companyName: 'DIGITAL PHONE MARKET',
      phoneNumber: '0753216541',
      email:'saman@gmail.com'
    },
    {
        supplierId: 'S002',
        firstName: 'Thushara ',
        lastName:"perera",
        companyName: 'DIALOG',
        phoneNumber: '0753216542',
        email:'thushara@gmail.com'
     
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
      name: 'Supplier Id',
      selector: (row) => row.supplierId,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
    },
    {
      name: 'Company Name',
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
        name: 'Phone Number',
        selector: (row) => row.phoneNumber,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row.email,
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
            Add supplier
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

export default ManageSupplier;
