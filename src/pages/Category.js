import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DefaultHandle from "../components/DefaultHandle";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

const Categories = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
  };

  const columns = [
    {
      name: "Category ID",
      selector: (row) => generateRandomNumber(), // Generates a different number for each row
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.categoryname,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img src={row.imageLink} alt="Item Image" style={{ width: "50px" }} />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/updatecategory/${row._id}`}>
            <EditFilled />
          </Link>
          <span style={{ margin: "0 8px" }}></span>
          <Link onClick={() => handleDelete(row._id)}>
            <DeleteFilled />
          </Link>
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
      setLoading(true);
      try {
        const res = await axios.get(
          "https://acconex-backend.vercel.app/category/"
        );
        setCategories(res.data.data);
        setFilteredCategories(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle delete action
  const handleDelete = async (_id) => {
    try {
      await axios.delete(
        `https://acconex-backend.vercel.app/category/delete/${_id}`
      );
      Swal.fire({
        icon: "success",
        title: "Category Deleted Successfully!",
        showConfirmButton: false,
        timer: 500,
      });
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete Category!",
        showConfirmButton: false,
        timer: 500,
      });
    }
  };

  // Search function
  const filterCategories = (event) => {
    const searchValue = event.target.value.toLowerCase();

    const categories = filteredCategories.filter((row) =>
      row.name.toLowerCase().includes(searchValue)
    );
    setCategories(categories);
  };

  // Render the component
  return (
    <DefaultHandle>
      <div style={{ display: "", height: "500px", overflow: "auto" }}>
        <input
          type="text"
          placeholder="Search item category..."
          onChange={filterCategories}
          style={{
            marginBottom: "12px",
            width: "300px",
            padding: "5px",
            borderRadius: "5px",
            transition: "border-color 0.3s",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Space size={12}></Space>
          <Link to="/admin/addnewcategory" style={{ fontSize: "14px" }}>
            Add New Category
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={categories}
          pagination
          selectableRows
        />
      </div>
    </DefaultHandle>
  );
};
const newCategoryBtnStyle = {
  theme: "dark",
  borderRadius: "12px",
  height: "40px",
  fontWeight: "bold",
  marginBottom: "20px",
};

export default Categories;
