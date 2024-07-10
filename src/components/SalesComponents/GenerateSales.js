import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import Chart from 'chart.js/auto';

function GenerateSales({ handleCancel }) {
  const [chartData, setChartData] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     const startDate = e.target.start.value;
     const endDate = e.target.end.value;

     
    // Fetch sales data
    try {
      const response = await axios.get('http://localhost:8000/dailysales/', {
        params: {
            startDate,
            endDate,
        },
      });
      
      const salesData = response.data;

      // Process data to count number of sales each day
      const salesCountByDay = {};
      salesData.forEach((sale) => {
        const date = new Date(sale.datetime).toLocaleDateString();
        salesCountByDay[date] = (salesCountByDay[date] || 0) + 1;
      });

      // Create chart data
      const chartLabels = Object.keys(salesCountByDay);
      const chartValues = Object.values(salesCountByDay);
      
      // Update chart data state
      setChartData({
        labels: chartLabels,
        datasets: [{
          label: 'Number of Sales',
          data: chartValues,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      });
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  // Render chart
  if (chartData) {
    const chartConfig = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Sales',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
        },
      },
    };

    new Chart(document.getElementById('salesChart'), chartConfig);
  }

  return (
    <div>
      <form style={{ width: '350px', height: '350px' }} className='modal-content' onSubmit={handleSubmit}>
        <div className='close-btn' onClick={handleCancel}>
          <CloseOutlined />
        </div>

        <label htmlFor='start'>Enter Start Date:</label>
        <input type='date' id='start' name='start' />

        <label htmlFor='end'>Enter End date:</label>
        <input type='date' id='end' name='end' />

        <button style={{ width: '80px' }} className='btn' type='submit'>Generate</button>
      </form>

      <div>
        <canvas id="salesChart"></canvas>
      </div>
    </div>
  );
}

export default GenerateSales;
