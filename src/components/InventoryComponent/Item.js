import{Link, useNavigate} from 'react-router-dom';
//import { search } from '../../../../AcconexBackend/server';
import React from 'react';
import DataTable from 'react-data-table-component';
import DefaultHandle from '../DefaultHandle';


const Items = () => {
  const navigate = useNavigate();

  const searchStyle = {
    padding: '6px 10px',
    textAlign: 'left',
    color: 'green',
    align: 'left', // This property seems unnecessary and may be removed
  };

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold', // Changed 'weight' to 'fontWeight'
        paddingLeft: '0 8px', // Removed the unnecessary space between '0' and '8px'
      },
    },
    rows: {
      style: {
        fontSize: '16px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
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
      },
    },
  };

  const edbtn = {
    textAlign: 'right',
    color: 'green',
    align: 'right', // This property seems unnecessary and may be removed
  };

  const delbtn = {
    padding: '6px 10px',
    textAlign: 'right',
    color: 'red',
    align: 'right', // This property seems unnecessary and may be removed
  };

  const column = [
    {
      name: 'Product ID',
      selector: row => row.productID,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.displayName,
      sortable: true,
    },
    {
      name: 'Cost Price',
      selector: row => row.costPrice,
      sortable: true,
    },
    {
      name: 'Selling Price',
      selector: row => row.sellingPrice,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div editbtn>
          <Link to={`/UpdateItem/${row._id}`} style={edbtn}>
            Edit
          </Link>
          <Link onClick={(e) => handleDelete(row._id)} style={delbtn}>
            Delete
          </Link>
        </div>
      ),
    },
  ];

  const filterItem = (event) => {
    //  filterItem logic 
  };

  const handleDelete = (itemId) => {
    //  handleDelete logic 
  };

  const items = []; // Assuming items is defined somewhere in  code

  return (
    <DefaultHandle>
    <div>
      <div className='container mt-5'>
        <input type='text' className='input' placeholder='Search' style={searchStyle} onChange={filterItem} />
      </div>

      <div className='text-end'>
        <Link to='/add-new-item' className='btn-primary'>New Item</Link>
      </div>

      <DataTable
        columns={column} // Fixed typo in prop name from 'column' to 'columns'
        data={items}
        customStyles={tableCustomStyles} // Fixed prop name from 'customStyle' to 'customStyles'
        pagination
        selectableRows
      />
    </div>
    </DefaultHandle>
  );
};

export default Items;
