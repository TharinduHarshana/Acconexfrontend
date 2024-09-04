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
      const response = await axios.get("https://acconex-backend.vercel.app/dailysales");
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

  // Helper function to render table rows
  const renderTableRows = (items) => {
    return items[0].map((_, index) => (
      <tr key={index}>
        <td style={{ border: '1px solid black', padding: '8px' }}>{items[0][index]}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{items[1][index]}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{items[2][index]}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{items[3][index]}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{items[4][index]}</td>
      </tr>
    ));
  };

  // Custom styles to set the max height for the table's body
  const customStyles = {
    rows: {
      style: {
        minHeight: '40px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
    tableWrapper: {
      style: {
        maxHeight: '400px', // Set the max height of the table container
        overflowY: 'auto', // Adds scroll if content exceeds the max height
      },
    },
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
          customStyles={customStyles}
        />
        <Modal
          title={'Invoice Details'} fontWeight = '500'
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
              <p><strong>Invoice number:</strong> {selectedSale.POSNO}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid black' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Item_ID</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Item Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Item Quantity</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Item Prices</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Item discounts</th>
                  </tr>
                </thead>
                <tbody >
                  {renderTableRows([ 
                    selectedSale.Item_IDs.split(','),
                    selectedSale.Item_Names.split(','),
                    selectedSale.Qnt.split(','),
                    selectedSale.Prices.split(','),
                    selectedSale.Discounts.split(',')
                  ])}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      </DefaultHandleSales>
      {showGenerateBillForm && <GenerateSales handleCancel={handleCancel} />}
    </div>
  );
}

export default DailySales;
