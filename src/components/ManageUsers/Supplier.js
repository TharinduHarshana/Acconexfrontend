import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Space } from "antd";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/supplier/get");
        setSuppliers(response.data.data);
        console.log(response.data); // Add this line to check the fetched data
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    loadSuppliers();
  }, []);

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
        </div>
      ),
    },
  ];

  return (
    <div>
      <DefaultHandle>
        <Space size={12} style={{ marginBottom: "25px", textAlign: "right" }}>
          <Link
            to={"/admin/supplier/create"}
            style={{ marginTop: "20px", fontSize: "16px" }}
          >
            Add Supplier
          </Link>
        </Space>
        <DataTable
          columns={columns}
          data={suppliers}
          selectableRows
          fixedHeader
          pagination
        />
      </DefaultHandle>
    </div>
  );
}

export default Supplier;
