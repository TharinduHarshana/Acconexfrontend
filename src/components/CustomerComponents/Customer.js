import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { message, Modal, Input } from "antd";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import CustomerForm from "./customerForm";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/customer");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (cusid) => {
    try {
      await axios.delete(`http://localhost:8000/customer/delete/${cusid}`);
      setCustomers(customers.filter((customer) => customer.cusid !== cusid));
      message.success("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
      message.error("An error occurred while deleting the customer.");
    }
  };

  const showDeleteConfirmation = (cusid) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this customer?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(cusid);
      },
    });
  };

  const handleAddCustomer = () => {
    setShowForm(true);
    setEditingCustomer(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Check if the customer ID already exists
      const existingCustomer = customers.find((customer) => customer.cusid === formData.cusid);
      if (existingCustomer) {
        message.error("Customer ID already exists. Please choose a different ID.");
        return;
      }

      const response = await axios.post("http://localhost:8000/customer/add", formData);
      if (response.data.success) {
        message.success(response.data.message);
        setShowForm(false);
        fetchCustomers();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form.");
    }
  };
  
  const handleEditCustomer = (customer) => {
    setShowForm(true);
    setEditingCustomer(customer);
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.patch(`http://localhost:8000/customer/update/${formData.cusid}`, formData);
      if (response.data.success) {
        message.success("Customer updated successfully!");
        fetchCustomers();
        setShowForm(false);
        setEditingCustomer(null);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      message.error("An error occurred while updating the customer.");
    }
  };

  const filteredDataList = customers.filter(
    (row) =>
      row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.cusid.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <DefaultHandle>
      <div style={{ marginBottom: "10px" }}>
        <div style={{  display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
          <Input
            placeholder="Search customer"
            value={searchValue}
            onChange={handleSearch}
            style={{ marginBottom: "12px", width: "300px" }}/>
          
      
            <Link to="#" onClick={handleAddCustomer}> Add Customer</Link>
            </div>
        </div>
        
        <DataTable
          columns={[
            { name: "Customer ID", selector: (row) => row.cusid, sortable: true },
            { name: "Customer Name", selector: (row) => row.name, sortable: true },
            { name: "Customer Address", selector: (row) => row.address, sortable: true },
            { name: "Contact Number", selector: (row) => row.mobile, sortable: true },
            {
              name: "Actions",
              cell: (row) => (
                <div>
                  <Link to="#" onClick={() => handleEditCustomer(row)}>
                    Edit
                  </Link>
                  <span style={{ margin: "0 8px" }}>|</span>
                  <Link onClick={() => showDeleteConfirmation(row.cusid)}>Delete</Link>
                </div>
              ),
            },
          ]}
          data={filteredDataList}
          selectableRows
          fixedHeader
          pagination
        />
        {showForm && (
          <CustomerForm
            handleClose={() => setShowForm(false)}
            formData={editingCustomer || {}}
            handleSubmit={editingCustomer ? handleUpdate : handleFormSubmit}
            editing={!!editingCustomer}
          />
        )}
      </DefaultHandle>
    </div>
  );
}

export default Customer;
