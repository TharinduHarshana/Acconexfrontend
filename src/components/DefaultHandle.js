import React, { useState } from 'react';
import { DashboardOutlined, ContactsOutlined, ProductOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined,LineChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import "../styles/sidebar.css";
import { Link } from 'react-router-dom';




const { Header, Sider, Content } = Layout;

const DefaultHandle = ({ children }) => {
  const [collapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3 >ACONEX COMPUTER</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">Home</Link>
          </Menu.Item>

          <Menu.Item key="/admin/items" icon={<ProductOutlined />}>
            <Link to="/admin/items">Inventory</Link>
          </Menu.Item>

          <Menu.Item key="/admin/customers" icon={<ContactsOutlined />}>
            <Link to="/admin/customer">Customers</Link>
          </Menu.Item>


          <Menu.Item key="/user" icon={<UserOutlined />}>
            <Link to="/user">Users</Link>
          </Menu.Item>

          <Menu.Item key="/sale" icon={<ShoppingCartOutlined />}>
            <Link to="/sale">Sales</Link>

          <Menu.Item key="/admin/users" icon={<UserOutlined />}>
            <Link to="/admin/users">Users</Link>
          </Menu.Item>

          <Menu.Item key="/admin/sales" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/sales">Sales</Link>

          </Menu.Item>

          <Menu.Item key="/admin/reports" icon={<LineChartOutlined />}>
            <Link to="/admin/reports">Reports</Link>
          </Menu.Item>

          <Menu.Item key="/admin/logout" icon={<LogoutOutlined />}>
            <Link to="/admin/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultHandle;