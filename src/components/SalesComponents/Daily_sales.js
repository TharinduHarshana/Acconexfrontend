
import React, { useState, useEffect } from "react";
import { Input , Modal } from "antd";
import DataTable from "react-data-table-component";
import DefaultHandle from "../DefaultHandle";
import axios from "axios";
import "../../styles/customer.css";

function DailySales({ billItems }) {
  const [dailySales, setDailySales] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  

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

  // Function to handle click on item count and show item details
  const handleItemClick = (sale) => {
    setSelectedSale(sale);
    setModalVisible(true);
  };

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
        title="Item Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedSale && (
          <table className='bill_data'>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.productID}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal>
    </div>
  );
}

export default DailySales;
