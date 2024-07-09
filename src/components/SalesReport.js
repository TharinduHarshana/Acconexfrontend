import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, DatePicker, Button, Statistic, Row, Col, message } from 'antd';
import moment from 'moment';
import DefaultHandle from './DefaultHandle';

const { MonthPicker } = DatePicker;

const SalesReport = () => {
  const [monthlyTotalSalesData, setMonthlyTotalSalesData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const fetchMonthlyTotalSalesData = async () => {
    try {
      if (!selectedMonth) {
        return; // Do nothing if selectedMonth is null
      }

      const response = await axios.get('http://localhost:8000/dailysales/monthtotals', {
        params: {
          month: selectedMonth.format('YYYY-MM'),
        }
      });

      if (response.data.success) {
        setMonthlyTotalSalesData(response.data.data); // Assuming response.data.data holds the sales totals
      } else {
        setMonthlyTotalSalesData(null);
        message.error('No data available for the selected month.');
      }
    } catch (error) {
      console.error('Error fetching monthly total sales data:', error);
      message.error('Failed to fetch data. Please try again later.');
    }
  };

  const handleMonthChange = (date, dateString) => {
    setSelectedMonth(date);
  };

  return (
    <>
      <DefaultHandle>
        <div>
          <Card>
            <MonthPicker
              onChange={handleMonthChange}
              placeholder="Select month"
              allowClear // Enable clear button
            />
            <Button
              type="primary"
              onClick={fetchMonthlyTotalSalesData}
              style={{ marginLeft: '10px' }}
              disabled={!selectedMonth}
            >
              Generate Report
            </Button>
          </Card>
          {monthlyTotalSalesData !== null ? (
            <Card title={`Monthly Sales Report - ${selectedMonth ? selectedMonth.format('MMMM YYYY') : ''}`}>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="Total Amount" value={monthlyTotalSalesData.totalAmount} precision={2} />
                </Col>
                <Col span={8}>
                  <Statistic title="Total Cost" value={monthlyTotalSalesData.totalCost} precision={2} />
                </Col>
                <Col span={8}>
                  <Statistic title="Total Profit" value={monthlyTotalSalesData.totalProfit} precision={2} />
                </Col>
              </Row>
            </Card>
          ) : (
            <Card>
              <p>No data available for the selected month.</p>
            </Card>
          )}
        </div>
      </DefaultHandle>
    </>
  );
};

export default SalesReport;
