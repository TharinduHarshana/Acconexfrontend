import React, { useState, useEffect } from "react";
import { Input, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DefaultHandleSales from './DefaultHandleSales';
import axios from "axios";
import "../../styles/customer.css";
import GenerateSales from './GenerateSales';


function DailySales() {
  const [dailySales, setDailySales] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showviewModal, setShowViewModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showGenerateBillForm, setShowGenerateBillForm] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchDailySales();
  }, []);

  const fetchDailySales = async () => {
    try {
      const response = await axios.get("http://localhost:8000/dailysales");
      const sortedData = response.data.data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      setDailySales(sortedData);
    } catch (error) {
      console.error("Error fetching daily sales:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCancel = () => {
    setShowViewModal(false);
    setShowGenerateBillForm(false);
  };

  const handleRowClick = async (row) => {
    setSelectedSale(row);
    setShowViewModal(true);
  };

  const filteredDataList = dailySales.filter(
    (row) =>
      row.paymentmethod.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.datetime.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleTotalSale = () => {
    navigate('/admin/totalsale'); // Navigate to the TotalSale component
  };

  return (
    <div>
      <DefaultHandleSales>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Input
              placeholder="Search sales by payment method or date"
              value={searchValue}
              onChange={handleSearch}
              style={{ marginBottom: "12px", width: "300px" }}
            />
            <Button style={{ backgroundColor: 'rgb(11, 2, 51)', color: 'white', fontWeight: 'bold' }} type="primary" onClick={handleTotalSale}>
              Total Sale
            </Button>
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
            { name: "Profit", selector: (row) => row.profit, sortable: true }
          ]}
          data={filteredDataList}
          selectableRows
          fixedHeader
          pagination
          onRowClicked={handleRowClick}
        />
        <Modal
          title={'Invoice Details'}
          visible={showviewModal}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
          ]}
        >
          {selectedSale && (
            <div>
              <p><strong>Invoice number:</strong>{selectedSale.POSNO}</p>
              {/* <p>Cashier Name: {selectedSale.cashirename}</p> */}
              {/* <p>Date: {selectedSale.datetime}</p> */}
              {/* <p>Customer Name: {selectedSale.customername}</p> */}
              {/* <p>Item Count: {selectedSale.itemcount}</p> */}
              <p><strong>Item_ID:</strong><br />{selectedSale.Item_IDs}</p>
              <p><strong>Item Name:</strong> <br />{selectedSale.Item_Names}</p>
              <p><strong>Item Quantity:</strong><br />{selectedSale.Qnt}</p>
              <p><strong>Item Prices:</strong><br />{selectedSale.Prices}</p>
              <p><strong>Item discounts:</strong><br />{selectedSale.Discounts}</p>
              {/* <p>payment Method:{selectedSale.paymentmethod}</p> */}
              {/* <p>Net Amount: {selectedSale.totalamount}</p> */}
              {/* <p>tota Cost :{selectedSale.totalcost}</p> */}
              {/* <p>Profit:{selectedSale.profit}</p> */}
            </div>
          )}
        </Modal>
      </DefaultHandleSales>
      {showGenerateBillForm && <GenerateSales handleCancel={handleCancel} />}
    </div>
  );
}

export default DailySales;
