import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Statistic, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ShoppingCartOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import DefaultHandle from "../components/DefaultHandle";

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [salesCount, setSalesCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [itemKitCount, setItemKitCount] = useState(0);
  const [monthlyTotalSalesData, setMonthlyTotalSalesData] = useState([]);
  const [weeklyTotalSalesData, setWeeklyTotalSalesData] = useState([]);

  useEffect(() => {
    getCountSales();
    getCountCustomer();
    getItemCount();
    getItemKitCount();
    fetchMonthlyTotalSalesData();
    fetchWeeklyTotalSalesData();
  }, []);

  const getCountSales = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dailysales/count');
      setSalesCount(response.data.data);
    } catch (error) {
      console.error('Error fetching sales count:', error);
    }
  };

  const getCountCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:8000/customer/count');
      setCustomerCount(response.data.data);
    } catch (error) {
      console.error('Error fetching customer count:', error);
    }
  };

  const getItemCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/item/count');
      setItemCount(response.data.data);
    } catch (error) {
      console.error('Error fetching item count:', error);
    }
  };

  const getItemKitCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/itemkit/count');
      setItemKitCount(response.data.data);
    } catch (error) {
      console.error('Error fetching item kit count:', error);
    }
  };


 
  const fetchMonthlyTotalSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dailysales/monthly_totals');
      setMonthlyTotalSalesData(response.data.data);
    } catch (error) {
      console.error('Error fetching monthly total sales data:', error);
    }
  };

  const fetchWeeklyTotalSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dailysales/weekly_totals');
      setWeeklyTotalSalesData(response.data.data);
    } catch (error) {
      console.error('Error fetching weekly total sales data:', error);
    }
  };

  return (
    <DefaultHandle>
    <div style={{ display: '', height: '500px', overflow: 'auto' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={salesCount}
              valueStyle={{ color: "#1890ff" }}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={customerCount}
              valueStyle={{ color: "#52c41a" }}
              prefix={<UsergroupAddOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Items"
              value={itemCount}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Item Kits"
              value={itemKitCount}
              valueStyle={{ color: "#fa8c16" }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Weekly" key="1">
              <Card title="Weekly Total Sales">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={weeklyTotalSalesData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAmount" fill="#8884d8" />
                    <Bar dataKey="totalProfit" fill="#82ca9d" />
                    <Bar dataKey="totalLoss" fill="#ff4d4f" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabPane>
            <TabPane tab="Monthly" key="2">
              <Card title="Monthly Total Sales">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={monthlyTotalSalesData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAmount" fill="#8884d8" />
                    <Bar dataKey="totalProfit" fill="#82ca9d" />
                    <Bar dataKey="totalLoss" fill="#ff4d4f" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
    </DefaultHandle>
  );
};

export default AdminDashboard;
