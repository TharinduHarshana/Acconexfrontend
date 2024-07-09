import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import { Modal, message, Space } from "antd";
import swal from 'sweetalert'; 
import "../../styles/accessmodal.css";
import {EditFilled ,DeleteFilled } from '@ant-design/icons';

function Supplier() {
  // State to store the list of suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [filterSupplier, setFilterSupplier] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);

  // Effect hook to fetch suppliers data when the component mounts
  useEffect(() => {
    const loadSuppliers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/supplier/get", {
          withCredentials: true,
        });
        // Update the suppliers state with the fetched data
        setSuppliers(response.data.data);
        setFilterSupplier(response.data.data);
        console.log(response.data); // Add this line to check the fetched data
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setIsAccessDeniedVisible(true);
        } else {
          console.error("Error fetching suppliers:", error);
          swal({
            title: "Error",
            text: "An error occurred while fetching suppliers.",
            icon: "error",
            button: "OK",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle deleting a supplier
  const handleDelete = async (_id) => {
    try {
      // Send a DELETE request to delete the supplier with the specified ID
      await axios.delete(`http://localhost:8000/supplier/delete/${_id}`,{
        withCredentials:true,
      });
      // Update the suppliers state by filtering out the deleted supplier
      setSuppliers(suppliers.filter((supplier) => supplier._id !== _id));
      setFilterSupplier(
        filterSupplier.filter((supplier) => supplier._id !== _id)
      );

      message.success("Supplier deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setIsAccessDeniedVisible(true);
      } else {
        console.error("Error deleting suppliers:", error);
        swal({
          title: "Error",
          text: "An error occurred while can't permission to delete suppliers.",
          icon: "error",
          button: "OK",
        });
      }
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

  // Function to close the access denied modal
  const closeModal = () => {
    setIsAccessDeniedVisible(false);
  };

  // Search supplier
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
          <Link to={`/admin/supplier/update/${row._id}`}><EditFilled/></Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}><DeleteFilled/></Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DefaultHandle>
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              className="input"
              placeholder="Search Supplier..."
              onChange={filterSuppliers}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                marginBottom: "12px",
                width: "300px",
                padding: "5px",
                border: isHovered ? "1px solid black" : "1px solid #ccc",
                borderRadius: "5px",
                transition: "border-color 0.3s",
              }}
            />
          </div>
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
              style={{ marginTop: "20px", fontSize: "14px" }}
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
          <p>You do not have permission to view this page.</p>
        </Modal>
      </DefaultHandle>
    </div>
  );
}

export default Supplier;
