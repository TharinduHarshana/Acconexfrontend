import React, { useState } from "react";
import { Layout, Menu, Badge, Typography, Space, Dropdown, Input } from "antd";
import {
  DashboardOutlined,
  ContactsOutlined,
  ProductOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LineChartOutlined,
  BellFilled,
  PlusOutlined,
  UserSwitchOutlined,
  BellOutlined,
  MessageOutlined,
  ShoppingFilled,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const DefaultHandle = ({ children }) => {
  const [collapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  const menuItems = [
    {
      key: "new_sale",
      title: "New Sale",
      icon: <ProductOutlined></ProductOutlined>,
    },
    {
      key: "new_item",
      title: "New Item",
      icon: <ShoppingFilled></ShoppingFilled>,
    },
    {
      key: "new_customer",
      title: "New Customer",
      icon: <UserOutlined></UserOutlined>,
    },
  ];

  

  const actionItems = [
    {
      key: "support",
      title: "Support/Documentation",
      icon: <ContactsOutlined />,
      linkTo:
        "https://www.globalteckz.com/9-documentation-for-implementing-any-erp-system/",
    },
    { key: "switch_user", title: "Switch User", icon: <UserSwitchOutlined /> },
    {
      key: "edit_profile",
      title: "Edit Profile",
      icon: <UserSwitchOutlined />,
    },
  ];

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

          <Menu.SubMenu
            key="inventorySubMenu"
            title="Inventory"
            icon={<ProductOutlined />}
          >
            <Menu.Item key="inventory" title="inventory">
              <Link to="/admin/inventory">Inventory</Link>
            </Menu.Item>
            <Menu.Item key="itemKits" title="item-kits">
              <Link to="/admin/inventory/item-kits">Item Kits</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            key="contactsSubMenu"
            title="Contacts"
            icon={<ContactsOutlined />}
          >
            <Menu.Item key="supplier" title="Supplier">
              <Link to="/admin/supplier">Supplier</Link>
            </Menu.Item>
            <Menu.Item key="customer" title="Customer">
              <Link to="/admin/customer">Customer</Link>
            </Menu.Item>
          </Menu.SubMenu>
          
          <Menu.Item key="/admin/users" icon={<UserOutlined />}>
            <Link to="/admin/userTable">Users</Link>
          </Menu.Item>
          
          <Menu.Item key="admin/sale" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/sale">Sales</Link>
          </Menu.Item>

          <Menu.Item key="/admin/reports" icon={<LineChartOutlined />}>
            <Link to="/admin/reports">Reports</Link>
          </Menu.Item>

          <Menu.Item key="/admin/logout" icon={<LogoutOutlined />}>
            <Link to="/admin">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="adminHeader" style={{ backgroundColor: "#B9D9EB" }}>
          <Typography.Title
            level={3}
            style={{ fontSize: "13px", fontFamily: "sans-serif" }}
          >
          </Typography.Title>
          <Space>
            <div className="header-action" style={{ marginRight: "8px" }}>
            </div>
          </Space>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto", // Add overflow property here
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultHandle;





