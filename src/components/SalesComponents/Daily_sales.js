import React, { useState, useEffect } from "react";
import { Input, Modal, Table } from "antd";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import "../../styles/customer.css";
import BillForm from './Bill_components/bill_Form';


function DailySales() {
  const [dailySales, setDailySales] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showviewModal, setShowViewModal] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDailySales = async () => {
    try {
      const response = await axios.get("http://localhost:8000/dailysales");
      setDailySales(response.data.data);
    } catch (error) {
      console.error("Error fetching daily sales:", error);
    }
  };

  const handleItemClick = (item) => {
    setBillItems([...billItems, item]); // Add item to billItems
    setShowViewModal(true);
  };

  useEffect(() => {
    fetchDailySales();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleConfirmAddToBill = (formData) => {
    const itemToAdd = { ...formData, costPrice: selectedItem.costPrice, productID: selectedItem.productID }; // Include product ID here
    setBillItems([...billItems, itemToAdd]);
    setShowModal(false);
  };

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
              placeholder="Search sales by customer name or date"
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
            { name: "Item Count ", selector: (row) => <button onClick={() => handleItemClick(row)}>{row.itemcount}</button>, sortable: true },
            { name: "Payment Method", selector: (row) => row.paymentmethod, sortable: true },
            { name: "Total Amount", selector: (row) => row.totalamount, sortable: true },
            { name: "Total Cost", selector: (row) => row.totalcost, sortable: true },
            { name: "Profit", selector: (row) => row.profit, sortable: true }
          ]}
          data={filteredDataList}
          selectableRows
          fixedHeader
          pagination
        />

        
      </DefaultHandle>

      <Modal
          title="Bill Items"
          visible={showviewModal}
          onCancel={() => setShowViewModal(false)}
          footer={null}
        >
        {/* Table to display bill items */}
        <Table
          dataSource={billItems}
          columns={[
            { title: 'Product Name', dataIndex: 'product', key: 'product' },
            { title: 'Product ID', dataIndex: 'productID', key: 'productID' }, // Access product ID here
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
          ]}
        />
      </Modal>
    </div>
  );
}

export default DailySales;
