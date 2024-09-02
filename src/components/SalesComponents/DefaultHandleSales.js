import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Badge, Typography, Space, Dropdown, theme } from "antd";
import {
  ReconciliationOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  RollbackOutlined,
  UserOutlined,
  PlusOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "../../styles/sidebar.css"; 
import "../../styles/adminheader.css";

const { Header, Sider, Content } = Layout;

const DefaultHandleSales = ({ children }) => {
  const [collapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const actionItems = [
    { key: '1', icon: <UserOutlined />, title: 'Profile', linkTo: '/profile' },
    { key: '2', icon: <LogoutOutlined />, title: 'Logout', linkTo: '/logout' },
  ];

  const messagesItems = [
    { key: '1', title: 'Message 1' },
    { key: '2', title: 'Message 2' },
  ];

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 className="title">ACONEX COMPUTER</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="home" icon={<RollbackOutlined />}>
            <Link to="/admin/dashboard">Back</Link>
          </Menu.Item>
          <Menu.Item key="/bill" icon={<FileDoneOutlined />}>
            <Link to="/admin/sale">Bill</Link>
          </Menu.Item>
          <Menu.Item key="/admin/holdclose" icon={<ReconciliationOutlined />}>
            <Link to="/admin/holdbill">Suspend Sale</Link>
          </Menu.Item>
          <Menu.Item key="/dailysales" icon={<ReconciliationOutlined />}>
            <Link to="/admin/dailysales">Daily Sale</Link>
          </Menu.Item>
          <Menu.Item key="/log" icon={<LogoutOutlined />}>
            <Link to="/log">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="adminHeader" style={{ backgroundColor: '#B9D9EB' }}>
          <Typography.Title
            level={3}
            style={{ fontSize: "13px", fontFamily: "sans-serif" }}
          >
            
          </Typography.Title>
          <Space>
            <div className="header-action" style={{ marginRight: "8px" }}>
              <Dropdown
                overlay={
                  <Menu>
                    {actionItems.map((item) => (
                      <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.linkTo}>{item.title}</Link>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <span style={{ marginRight: "36px", fontSize: "12px" }}>
                  <PlusOutlined style={{ marginLeft: "18px", marginRight: "18px" }} />
                </span>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    {messagesItems.map((item) => (
                      <Menu.Item key={item.key}>{item.title}</Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <Badge count={2} overflowCount={10} style={{ marginRight: "16px", color: "white" }}>
                  <BellOutlined style={{ marginLeft: "8px", marginRight: "8px", color: "black" }} />
                </Badge>
              </Dropdown>
              <Dropdown
                overlay={
                  <Menu>
                    {actionItems.map((item) => (
                      <Menu.Item key={item.key} icon={item.icon}>
                        {item.title}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <span>
                  <UserOutlined style={{ marginLeft: "4px", marginRight: "4px" }} />
                </span>
              </Dropdown>
            </div>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px -25px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultHandleSales;
