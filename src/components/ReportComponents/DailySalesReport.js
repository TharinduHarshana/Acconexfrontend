import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Row, Col, Modal } from 'antd';
import DefaultHandle from '../DefaultHandle';
import downloadReport from './ReportDownload';
import logo from "../../images/icon.jpg"; // Adjust the path to your logo image

function DailySales() {
  const [totals, setTotals] = useState({
    sellId: 1,
    totalSell: 0,
    totalCost: 0,
    totalProfit: 0,
    totalLoss: 0,
    totalItemsCount: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const selectedDate = location.state?.selectedDate;

  useEffect(() => {
    if (selectedDate) {
      fetchDailySales(selectedDate);
    }
  }, [selectedDate]);

  const fetchDailySales = async (date) => {
    try {
      const response = await axios.get(`http://localhost:8000/dailysales/report`, { params: { date } });
      const data = response.data.data;
      calculateTotals(data);
    } catch (error) {
      console.error("Error fetching sales report:", error);
    }
  };

  const calculateTotals = (data) => {
    let totalSell = 0;
    let totalCost = 0;
    let totalProfit = 0;
    let totalItemsCount = 0;

    data.forEach(item => {
      totalSell += item.totalamount;
      totalCost += item.totalcost;
      totalProfit += item.profit;
      totalItemsCount += item.itemcount;
    });

    const totalLoss = totalCost > totalSell ? totalCost - totalSell : 0;

    setTotals({
      sellId: '1', 
      totalSell,
      totalCost,
      totalProfit,
      totalLoss,
      totalItemsCount,
    });
  };

  const handleClose = () => {
    navigate('/admin/reports');
  };

  const handleDownload = () => {
    downloadReport(totals, selectedDate, logo);
  };

  return (
    <>
      <DefaultHandle>
        <div style={{ padding: '2px', marginTop: "2px" }}>
          <Modal
            visible
            footer={null}
            onCancel={handleClose}
            closeIcon={
              <Button 
                type="link" 
                style={{ color: 'black' }} 
              />
            }
            style={{ width: '50%' }}
          >
            <h5>Daily Sales Report for {selectedDate}</h5>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Sell ID">
                    <Input value={totals.sellId} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Total Sells (LKR)">
                    <Input value={totals.totalSell} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Total Cost (LKR)">
                    <Input value={totals.totalCost} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Total Profit (LKR)">
                    <Input value={totals.totalProfit} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Total Loss (LKR)">
                    <Input value={totals.totalLoss} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Total Items Count">
                    <Input value={totals.totalItemsCount} readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" style={{ width: "200px" }} onClick={handleDownload}>
                Download Report
              </Button>
            </Form>
          </Modal>
        </div>
  
      </DefaultHandle>
    </>
  );
}

export default DailySales;
