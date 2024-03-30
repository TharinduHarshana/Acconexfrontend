import React from 'react';
import DefaultHandle from '../DefaultHandle';
import DataTable from 'react-data-table-component';
import { Space } from 'antd';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation

function ItemKitsTable() {
  const columns = [
    {
      name: "Item Kit Id",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/edit/${row.userId}`}>Edit</Link> {/* Assuming you have a route for editing */}
          <span style={{ margin: "0 8px" }}>|</span>
          <Link to={''}>Delete</Link>
        </div>
      ),
    },
  ];

  // Mock data
  const users = [
    { userId: 1, firstName: 'John', phoneNumber: '123-456-7890' },
    { userId: 2, firstName: 'Jane', phoneNumber: '987-654-3210' },
    { userId: 3, firstName: 'Doe', phoneNumber: '555-555-5555' },
  ];

  return (
    <>
      <DefaultHandle>
      <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "25px",
          }}
        >
          <Space size={12}>
            <Link
              to={"/admin/inventory/item-kits"}
              style={{ marginTop: "20px", fontSize: "16px" }}
            >
              Add inventory kit
            </Link>
          </Space>
        </div>
        <DataTable
          columns={columns}
          data={users}
          selectableRows
          fixedHeader
          pagination
        />
      </DefaultHandle>
    </>
  );
}

export default ItemKitsTable;
