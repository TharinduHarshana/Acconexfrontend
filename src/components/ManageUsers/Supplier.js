import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Modal, message, Space } from "antd";
import swal from "sweetalert";
import "../../styles/accessmodal.css";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import DefaultHandle from "../DefaultHandle";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [filterSupplier, setFilterSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);

  // Fetch suppliers with their items when the component mounts
  useEffect(() => {
    const loadSuppliers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://acconex-backend.vercel.app/supplier/get", {
          withCredentials: true,
        });
        setSuppliers(response.data.data);
        setFilterSupplier(response.data.data);
        console.log(response.data); // Debugging fetched data
      } catch (error) {
        message.error("Error fetching suppliers:", error);
        console.error("Error fetching suppliers:", error);
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
      await axios.delete(`https://acconex-backend.vercel.app/supplier/delete/${_id}`, {
        withCredentials: true,
      });
      setSuppliers(suppliers.filter((supplier) => supplier._id !== _id));
      setFilterSupplier(
        filterSupplier.filter((supplier) => supplier._id !== _id)
      );

      message.success("Supplier deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setIsAccessDeniedVisible(true); // Show access denied modal
      } else {
        console.error("Error deleting supplier:", error);
        swal({
          title: "Error",
          text: "An error occurred while deleting the supplier.",
          icon: "error",
          button: "OK",
        });
      }
    }
  };

  const showDeleteConfirmation = (_id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this supplier?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(_id);
      },
    });
  };

  const closeModal = () => {
    setIsAccessDeniedVisible(false);
  };

  // Function to search for suppliers by name or ID
  const filterSuppliers = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const supplierData = suppliers.filter(
      (row) =>
        row.firstName.toLowerCase().includes(searchValue) ||
        row.supplierId.toLowerCase().includes(searchValue)
    );

    setFilterSupplier(supplierData);
  };

  // Columns for DataTable
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
      name: "Supply Items",
      selector: (row) => row.items,
      sortable: true,
      cell: row => (
        <div>
          {row.items && row.items.length > 0
            ? row.items.map(item => Object.values(item).join("")).join(", ")
            : "No items"}
        </div>
      ),
    },
    
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/admin/supplier/update/${row._id}`}>
            <EditFilled />
          </Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}>
            <DeleteFilled />
          </Link>
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
            style={{ marginBottom: "12px", width: "300px", padding: "5px" }}
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
          <Link to={"/admin/supplier/create"}>Add Supplier</Link>
        </Space>
      </div>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <DataTable
        columns={columns}
        data={filterSupplier}
        selectableRows
        fixedHeader
        pagination
      />
      </div>
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
        <p>You do not have permission to delete this supplier.</p>
      </Modal>
      </DefaultHandle>
    </div>
  );
}

export default Supplier;
