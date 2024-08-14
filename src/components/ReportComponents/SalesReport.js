import React, { useState } from 'react';
import { Button, Select, Typography, Row, Col, Modal, DatePicker, message } from 'antd';
import DefaultHandle from '../DefaultHandle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

function Reports() {
  const [reportType, setReportType] = useState('dailysales');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate(); // useNavigate hook

  const handleReportTypeChange = (value) => {
    setReportType(value);
  };

  const handleGenerateReportClick = () => {
    if (reportType === 'dailysales') {
      setIsModalVisible(true);
    }
    // Add logic for other report types if needed
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const checkDateData = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8000/dailysales/report`, { params: { date } });
      return response.data.data.length > 0; // Assuming data is an array
    } catch (error) {
      console.error("Error fetching sales report:", error);
      return false;
    }
  };

  const handleModalSubmit = async () => {
    setIsModalVisible(false);
    if (selectedDate) {
      const hasData = await checkDateData(selectedDate);
      if (hasData) {
        navigate(`/dailysale`, { state: { selectedDate } }); // Navigate to DailySales page with selectedDate
      } else {
        message.error("This date has no data available.");
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <DefaultHandle>
      <div style={{ padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center', fontWeight: 'bold' }}>Aconex Computers Reports</Title>
        <Row gutter={16} justify='space-between' align='middle'>
          <Col>
            <label style={{ marginRight: "10px" }}>Report type:</label>
            <Select 
              style={{ width: '200px', marginTop: '50px' }} 
              value={reportType} 
              onChange={handleReportTypeChange}
            >
              <Option value='dailysales'>Daily Sales</Option>
              <Option value='monthsales'>Monthly Sales</Option>
              <Option value='weeksales'>Weekly Sales</Option>
            </Select>
          </Col>
          <Col>
            <Button 
              type='primary' 
              style={{ marginTop: '50px' }}
              onClick={handleGenerateReportClick}
            >
              Generate Report
            </Button>
          </Col>
        </Row>

        {/* Modal for Daily Sales Report */}
        <Modal
          title="Daily Sales Report"
          visible={isModalVisible}
          onOk={handleModalSubmit}
          onCancel={handleModalCancel}
        >
          <label>Select Date:</label>
          <DatePicker onChange={handleDateChange} style={{ width: '100%', marginTop: '10px' }} />
        </Modal>
      </div>
    </DefaultHandle>
  );
}

export default Reports;
