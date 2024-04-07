// AdminDashboard.js
import React, { useState } from "react";
import { Button } from "antd";
import { Bar } from "react-chartjs-2";
import DefaultHandle from './DefaultHandle.js';
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined,ProductOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import {Chart as ChartJS,CategoryScale,BarElement,Title,Tooltip,Legend,} from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function AdminDashboard() {

  return (
    <DefaultHandle>
      <div className='dashCard'>
        <Space size={20} direction="vertical">
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Sales"}
          
        
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Items"}
         
          
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Customer"}
          
          
        />
        <DashboardCard
          icon={
            <ProductOutlined 
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Item Kits"}
          
         
        />
      </Space>
     
    </Space>
    </div>
      <div className='dashCard'>
        <Space size={20} direction="vertical">
          <Typography.Title level={4}></Typography.Title>
          <Space direction="horizontal">
            {/* Your dashboard cards/components here */}
          </Space>
        </Space>
      </div>
    </DefaultHandle>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

  


export default AdminDashboard;



