import React from 'react'
import DefaultHandleInventory from './DefaultHandlerInventory'
import {Space, Typography, Card,Statistic} from 'antd'
import{ShoppingCartOutlined,ShoppingOutlined, UserOutlined, DollarCircleOutlined,} from "@ant-design/icons";
import '../../styles/sidebar.css';
//import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";

function InventoryDashboard() {
  return (
    <DefaultHandleInventory>
      <div className='dashBoard'>
        <Space size={20} direction='vertical'>
        <Typography.Title level={4}>Inventory Dashboard</Typography.Title>
        <Space direction='horizontal'>
          <DashboardCard
          icon ={
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
        title={"Orders"}
      
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
        title={"Inventory"}
        
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
        title={"Customer"}
        
      />
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Revenue"}
       
      />
        </Space>
        </Space>

      </div>
    </DefaultHandleInventory>
    
  )
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

export default InventoryDashboard
