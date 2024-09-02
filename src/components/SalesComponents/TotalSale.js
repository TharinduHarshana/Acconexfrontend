import React, { useState, useEffect } from 'react';
import DefaultHandleSales from './DefaultHandleSales';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function TotalSale() {
  const [cashTotals, setCashTotals] = useState({});
  const [bankTotals, setBankTotals] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchDailySales = async (date) => {
    console.log(`Fetching sales for date: ${date}`);
    try {
      const response = await axios.get(`http://localhost:8000/dailysales/get/${date}`);
      const salesData = response.data.data;
      console.log('Fetched sales data:', salesData);
      calculateTotals(salesData);
      prepareChartData(salesData);
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
        acc.totalLoss += sale.loss || 0; // Handle case if `loss` is not defined
      }
      return acc;
    }, { ...initialTotals });

    const bank = data.reduce((acc, sale) => {
      if (sale.paymentmethod.toLowerCase() === 'bank') {
        acc.totalQuantity += sale.itemcount;
        acc.totalAmount += sale.totalamount;
        acc.totalCost += sale.totalcost;
        acc.totalProfit += sale.profit;
        acc.totalLoss += sale.loss || 0; // Handle case if `loss` is not defined
      }
      return acc;
    }, { ...initialTotals });

    console.log('Calculated cash totals:', cash);
    console.log('Calculated bank totals:', bank);

    setCashTotals(cash);
    setBankTotals(bank);
  };

  const prepareChartData = (data) => {
    const labels = ['Cash', 'Bank'];
    const totals = {
      totalQuantity: [0, 0],
      totalAmount: [0, 0],
      totalCost: [0, 0],
      totalProfit: [0, 0],
      totalLoss: [0, 0]
    };

    data.forEach((sale) => {
      const index = sale.paymentmethod.toLowerCase() === 'cash' ? 0 : 1;
      totals.totalQuantity[index] += sale.itemcount;
      totals.totalAmount[index] += sale.totalamount;
      totals.totalCost[index] += sale.totalcost;
      totals.totalProfit[index] += sale.profit;
      totals.totalLoss[index] += sale.loss || 0;
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Total Amount (LKR)',
          data: totals.totalAmount,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        },
        {
          label: 'Total Cost (LKR)',
          data: totals.totalCost,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2
        },
        {
          label: 'Total Profit (LKR)',
          data: totals.totalProfit,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2
        },
        {
          label: 'Total Loss (LKR)',
          data: totals.totalLoss,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }
      ]
    });
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
        <div style={{ display: '', height: '800px', overflow: 'hidden', marginTop:'-20px' }} className='maindiv'>
            <h3 style={{textAlign:'center'}}>Today's Total Sale</h3>
            <div>
              <label htmlFor='start' style={{fontWeight:'bold',marginLeft:'30px'}}>Enter Start Date:</label>
              <input 
                type='date' 
                id='start' 
                name='start' 
                value={selectedDate}
                onChange={handleDateChange}
                style={{marginLeft:'20px',width:'200px'}}
              />
              <button style={{backgroundColor:'rgb(11, 2, 51)',color:'white',width:'130px',height:'40px',marginLeft:'20px'}} onClick={handleSeeTotalSale}>See Total Sale</button>
            </div>
            
            <div className='table dataTable-container' style={{marginLeft:'20px',width:'900px'}} >
              <DataTable style={{marginTop:'20px'}}
                columns={[
                  { name: "Payment Method", selector: row => row.paymentMethod, sortable: true },
                  { name: "Total Quantity", selector: row => row.totalQuantity, sortable: true },
                  { name: "Total Amount (LKR)", selector: row => row.totalAmount, sortable: true },
                  { name: "Total Cost (LKR)", selector: row => row.totalCost, sortable: true },
                  { name: "Total Profit (LKR)", selector: row => row.totalProfit, sortable: true },
                  { name: "Total Loss (LKR)", selector: row => row.totalLoss, sortable: true },
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
            <div className='chart'style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='chart-title'style={{fontWeight:'bold'}}>Total Sales Breakdown</div>
              {chartData.labels.length > 0 && (
                <div style={{ width: '800px', height: '300px',alignSelf:'center' }}>
                  <Bar 
                    data={chartData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            font: {
                              size: 14
                            },
                            color: 'rgba(0, 0, 0, 0.8)'
                          }
                        },
                        tooltip: {
                          enabled: true,
                          mode: 'index',
                          intersect: false
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false
                          },
                          title: {
                            display: true,
                            text: 'Payment Method',
                            font: {
                              size: 14
                            }
                          }
                        },
                        y: {
                          beginAtZero: true,
                          grid: {
                            display: true,
                            color: 'rgba(200, 200, 200, 0.2)'
                          },
                          title: {
                            display: true,
                            text: 'Amount',
                            font: {
                              size: 14
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          
        </div>
      </DefaultHandleSales>
    </div>
  );
}

export default TotalSale;
