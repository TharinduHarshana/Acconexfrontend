import React, { useState, useEffect } from 'react';
import DefaultHandleSales from './DefaultHandleSales';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function TotalSale() {
  const [cashTotals, setCashTotals] = useState({});
  const [bankTotals, setBankTotals] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchDailySales = async (datetime) => {
    console.log(`Fetching sales for date: ${datetime}`);
    try {
      const response = await axios.get(`http://localhost:8000/dailysales?datetime=${datetime}`);
      const salesData = response.data.data;
      console.log('Fetched sales data:', salesData);
      calculateTotals(salesData);
    } catch (error) {
      console.error("Error fetching daily sales:", error);
    }
  };

  const calculateTotals = (data) => {
    const initialTotals = {
      totalQuantity: 0,
      totalAmount: 0,
      totalCost: 0,
      totalProfit: 0,
      totalLoss: 0
    };

    const cash = data.reduce((acc, sale) => {
      if (sale.paymentmethod.toLowerCase() === 'cash') {
        acc.totalQuantity += sale.itemcount;
        acc.totalAmount += sale.totalamount;
        acc.totalCost += sale.totalcost;
        acc.totalProfit += sale.profit;
        acc.totalLoss += sale.loss;
      }
      return acc;
    }, { ...initialTotals });

    const bank = data.reduce((acc, sale) => {
      if (sale.paymentmethod.toLowerCase() === 'bank') {
        acc.totalQuantity += sale.itemcount;
        acc.totalAmount += sale.totalamount;
        acc.totalCost += sale.totalcost;
        acc.totalProfit += sale.profit;
        acc.totalLoss += sale.loss;
      }
      return acc;
    }, { ...initialTotals });

    console.log('Calculated cash totals:', cash);
    console.log('Calculated bank totals:', bank);

    setCashTotals(cash);
    setBankTotals(bank);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSeeTotalSale = () => {
    fetchDailySales(selectedDate);
  };

  return (
    <div>
      <DefaultHandleSales>
        <div className='maindiv'>
          <div className='divcontent'>
            <h3>Today's Total Sale</h3>
            <div>
              <label htmlFor='start'>Enter Start Date:</label>
              <input 
                type='date' 
                id='start' 
                name='start' 
                style={{ marginLeft: '20px', marginRight: '50px' }} 
                value={selectedDate}
                onChange={handleDateChange}
              />
              <button onClick={handleSeeTotalSale}>See Total Sale</button>
              <button>See More About Sales</button>
            </div>
            <div className='table'>
              <DataTable
                columns={[
                  { name: "Payment Method", selector: row => row.paymentMethod, sortable: true },
                  { name: "Total Quantity", selector: row => row.totalQuantity, sortable: true },
                  { name: "Total Amount", selector: row => row.totalAmount, sortable: true },
                  { name: "Total Cost", selector: row => row.totalCost, sortable: true },
                  { name: "Total Profit", selector: row => row.totalProfit, sortable: true },
                  { name: "Total Loss", selector: row => row.totalLoss, sortable: true },
                ]}
                data={[
                  { paymentMethod: 'Cash', ...cashTotals },
                  { paymentMethod: 'Bank', ...bankTotals }
                ]}
                selectableRows
                fixedHeader
                pagination
              />
            </div>
          </div>
        </div>
      </DefaultHandleSales>
    </div>
  );
}

export default TotalSale;