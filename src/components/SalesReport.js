import React, { useState } from 'react';
import { DatePicker, Table, Card, message, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const DailySalesReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reportData, setReportData] = useState([]);

  const fetchDailySalesReport = async (date) => {
    try {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        console.log(`Requesting report for: ${formattedDate}`);
        const response = await axios.get(`http://localhost:8000/dailysales/report/${formattedDate}`);
        console.log('Response data:', response.data);
        setReportData(response.data);
    } catch (error) {
        message.error('Error fetching sales report');
        console.error('Error fetching sales report:', error.response ? error.response.data : error.message);
    }
};


  const handleGenerateReport = () => {
    if (selectedDate) {
      fetchDailySalesReport(selectedDate);
    } else {
      message.error('Please select a date first');
    }
  };

  const columns = [
    { title: 'Date', dataIndex: '_id.day', key: '_id.day' },
    { title: 'Cashier Name', dataIndex: '_id.cashier', key: '_id.cashier' },
    { title: 'Customer Name', dataIndex: '_id.customer', key: '_id.customer' },
    { title: 'Total Sales', dataIndex: 'totalSales', key: 'totalSales' },
    { title: 'Item Count', dataIndex: 'itemCount', key: 'itemCount' },
    { title: 'Items', dataIndex: 'items', key: 'items', render: items => items.join(', ') },
  ];

  return (
    <div style={{ margin: '20px' }}>
      <Card title="Daily Sales Report">
        <DatePicker onChange={(date) => setSelectedDate(date)} />
        <Button type="primary" onClick={handleGenerateReport} style={{ marginLeft: '10px' }}>
          Generate Report
        </Button>
        <Table
          columns={columns}
          dataSource={reportData}
          rowKey={(record) => `${record._id.year}-${record._id.month}-${record._id.day}-${record._id.cashier}-${record._id.customer}`}
          pagination={{ pageSize: 10 }}
          style={{ marginTop: '10px' }}
        />
      </Card>
    </div>
  );
};

export default DailySalesReport;
