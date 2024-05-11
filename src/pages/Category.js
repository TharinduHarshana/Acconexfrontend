import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Categories = () => {
    const navigate = useNavigate();
  
    // Define columns for the data table
    const columns = [
      {
        name: 'Category ID',
        selector: row => row._id,
        sortable: true
      },
      {
        name: 'Category Name',
        selector: row => row.categoryname,
        sortable: true
      },
      {
        name: 'Description',
        selector: row => row.description,
        sortable: true
      },
      {
        name: 'Image URL',
        selector: row => row.imgLink,
        sortable: true
      },
      {
        name: 'Actions',
        cell: (row) => (
          <div>
            <Link to={`/updatecategory/${row._id}`}>Edit</Link>
            <Link onClick={() => handleDelete(row._id)}>Delete</Link>
          </div>
        ),
      },
    ];
  
    // State for storing categories and filtered categories
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
  
    // Fetch categories from the backend
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('http://localhost:8000/category/');
          setCategories(res.data.data);
          setFilteredCategories(res.data.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, []);
  
    // Handle delete action
    const handleDelete = async (_id) => {
      try {
        await axios.delete(`http://localhost:8000/category/delete/${_id}`);
        Swal.fire({
          icon: 'success',
          title: 'Category Deleted Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
        window.location.reload();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Delete Category!',
          showConfirmButton: false,
          timer: 500,
        });
      }
    };
  
    // Search function
    const filterCategories = (event) => {
      const searchValue = event.target.value.toLowerCase();
      const filteredData = filteredCategories.filter((row) =>
        row.name.toLowerCase().includes(searchValue)
      );
      setCategories(filteredData);
    };
  
    // Render the component
    return (
      <div>
        <input type="text" className="input" placeholder="Search..." onChange={filterCategories} />
        <Link to="/admin/addnewcategory">
        <button style={newCategoryBtnStyle}>Add New Category</button>
        </Link>
        <DataTable
          columns={columns}
          data={categories}
          pagination
          selectableRows
        />
      </div>
    );
  };
  const newCategoryBtnStyle = {
    theme: 'dark',
    borderRadius: '12px',
    height: '40px',
    fontWeight: 'bold',
    marginBottom: '20px'
  };
  
  
  export default Categories;
  