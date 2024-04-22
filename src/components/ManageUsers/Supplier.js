import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, message, Modal } from "antd";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";

function Supplier() {
  // State to store the list of suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [filterSupplier, setFilterSupplier] = useState([]);

  // Effect hook to fetch suppliers data when the component mounts
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/supplier/get");
        // Update the suppliers state with the fetched data
        setSuppliers(response.data.data);
        setFilterSupplier(response.data.data);
        console.log(response.data); // Add this line to check the fetched data
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    loadSuppliers();
  }, []);
  // Function to handle deleting a supplier

  const handleDelete = async (_id) => {
    try {
      // Send a DELETE request to delete the supplier with the specified ID
      await axios.delete(`http://localhost:8000/supplier/delete/${_id}`);
      // Update the suppliers state by filtering out the deleted supplier
      setSuppliers(suppliers.filter((supplier) => supplier._id !== _id));
      message.success("Supplier deleted successfully!");
    } catch (error) {
      console.error("Error deleting supplier:", error);
      message.error("An error occurred while deleting the supplier.");
    }
  };

  // Function to show delete confirmation modal
  const showDeleteConfirmation = (_id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this supplier?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // Call handleDelete function if user confirms deletion
        handleDelete(_id);
      },
    });
  };

  //Search supplier
  const filterSuppliers = (event) => {
    // Convert search input to lowercase for case-insensitive comparison
    const searchValue = event.target.value.toLowerCase();
    // Filter suppliers based on search value
    const supplierData = suppliers.filter(
      (row) =>
        // Check if supplier's firstName or supplierId includes the search value
        row.firstName.toLowerCase().includes(searchValue) ||
        row.supplierId.toLowerCase().includes(searchValue)
    );

    setFilterSupplier(supplierData); // Update filterSupplier state with filtered data
  };



  // Columns configuration for DataTable
  const columns = [
    {
      name: "Supplier Id",
      selector: (row) => row.supplierId,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/admin/supplier/update/${row._id}`}>Edit</Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}>Delete</Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DefaultHandle>
        <div>
          <input
            type="text end"
            className="input"
            placeholder="Search..."
            onChange={filterSuppliers}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "25px",
          }}
        >
          <Space size={12}>
            <Link
              to={"/admin/supplier/create"}
              style={{ marginTop: "20px", fontSize: "16px" }}
            >
              Add Supplier
            </Link>
          </Space>
        </div>
        <DataTable
          columns={columns}
          data={filterSupplier} 
          selectableRows
          fixedHeader
          pagination
        />
      </DefaultHandle>
    </div>
  );
}

export default Supplier;
