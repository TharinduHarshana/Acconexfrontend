import React, { useState, useEffect } from "react";
import { Input } from "antd";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import "../../styles/customer.css";

function DailySales() {
  const [dailySales, setDailySales] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchDailySales = async () => {
    try {
      const response = await axios.get("http://localhost:8000/dailysales");
      setDailySales(response.data.data);
    } catch (error) {
      console.error("Error fetching daily sales:", error);
    }
  };

  useEffect(() => {
    fetchDailySales();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter daily sales based on search input
  const filteredDataList = dailySales.filter(
    (row) =>
      row.customername.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.datetime.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <DefaultHandle>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Input
              placeholder="Search sales"
              value={searchValue}
              onChange={handleSearch}
              style={{ marginBottom: "12px", width: "300px" }}
            />
          </div>
        </div>

        <DataTable
          columns={[
            { name: "POS NO", selector: (row) => row.POSNO, sortable: true },
            { name: "Cashier Name", selector: (row) => row.cashirename, sortable: true },
            { name: "Date", selector: (row) => row.datetime, sortable: true },
            { name: "Customer Name", selector: (row) => row.customername, sortable: true },
            { name: "Item Count ", selector: (row) => row.itemcount, sortable: true },
            { name: "Payment Method", selector: (row) => row.paymentmethod, sortable: true },
            { name: "Total Amount", selector: (row) => row.totalamount, sortable: true },
            { name: "Total Cost", selector: (row) => row.totalcost, sortable: true },
            { name: "Profit", selector: (row) => row.profit, sortable: true },
            // Add more columns as needed
          ]}
          data={filteredDataList}
          selectableRows
          fixedHeader
          pagination
        />
      </DefaultHandle>
    </div>
  );
}

export default DailySales;
