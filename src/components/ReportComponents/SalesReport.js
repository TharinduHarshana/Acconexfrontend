import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Typography,
  Row,
  Col,
  Modal,
  DatePicker,
  message,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import DefaultHandle from "../DefaultHandle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/reportmodal.css";

const { Option } = Select;
const { Title } = Typography;

function Reports() {
  const [reportType, setReportType] = useState("dailysales");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [weeklySalesData, setWeeklySalesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeeklySalesData();
  }, []);

  const fetchWeeklySalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/dailysales/weekly_totals"
      );
      const formattedData = response.data.data.map((item) => ({
        week: `Week ${item._id}`,
        totalAmount: item.totalAmount,
        totalProfit: item.totalProfit,
        totalLoss: item.totalLoss,
      }));
      setWeeklySalesData(formattedData);
    } catch (error) {
      console.error("Error fetching weekly sales data:", error);
    }
  };

  const handleReportTypeChange = (value) => {
    setReportType(value);
  };

  const handleGenerateReportClick = () => {
    if (reportType === "dailysales") {
      setIsModalVisible(true);
    } else if (reportType === "weeksales") {
      // Code to handle weekly sales report generation can be added here
    } else if (reportType === "monthsales") {
      // Code to handle monthly sales report generation can be added here
    }
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const checkDateData = async (date) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/dailysales/report",
        { params: { date } }
      );
      return response.data.data.length > 0;
    } catch (error) {
      console.error("Error fetching sales report:", error);
      return false;
    }
  };

  const handleModalSubmit = async () => {
    if (!selectedDate) {
      message.error("Please select a date.");
      return;
    }

    setIsModalVisible(false);
    const hasData = await checkDateData(selectedDate);
    if (hasData) {
      navigate(`/dailysale`, { state: { selectedDate } });
    } else {
      message.error("This date has no data available.");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <DefaultHandle>
      <div style={{ padding: "20px" }}>
        <Title level={3} style={{ textAlign: "center", fontWeight: "bold" }}>
          Aconex Computers Reports
        </Title>
        <Row gutter={16} align="middle" style={{ marginBottom: "20px" }}>
          <Col>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Report type:
            </label>
            <Select
              style={{ width: "200px", marginRight: "10px" }}
              value={reportType}
              onChange={handleReportTypeChange}
            >
              <Option value="dailysales">Daily Sales</Option>
              <Option value="monthsales">Monthly Sales</Option>
              <Option value="weeksales">Weekly Sales</Option>
            </Select>
          </Col>
          <Col>
            <Button
              style={{
                width: "200px",
                marginLeft: "500px",
                backgroundColor: "rgb(1, 1, 41)",
                color: "white",
                borderColor: "black",
              }}
              onClick={handleGenerateReportClick}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(1, 1, 41)";
                e.currentTarget.style.color = "white";
              }}
            >
              Generate Report
            </Button>
          </Col>
        </Row>

        {/* Weekly Sales Chart Section */}
        <div style={{ marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalAmount" fill="#8884d8" name="Total Sales" />
              <Bar dataKey="totalProfit" fill="#82ca9d" name="Total Profit" />
              <Bar dataKey="totalLoss" fill="#ff6961" name="Total Loss" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Modal for Daily Sales Report */}
        <Modal
          title="Daily Sales Report"
          visible={isModalVisible}
          onOk={handleModalSubmit}
          onCancel={handleModalCancel}
          className="custom-modal"
        >
          <label>Select Date:</label>
          <DatePicker
            onChange={handleDateChange}
            style={{ width: "100%", marginTop: "10px" }}
          />
        </Modal>
      </div>
    </DefaultHandle>
  );
}

export default Reports;
