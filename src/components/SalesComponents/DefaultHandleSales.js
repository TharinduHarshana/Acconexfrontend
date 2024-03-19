import React, { useState } from 'react';
import {MenuFoldOutlined,MenuUnfoldOutlined,UploadOutlined,UserOutlined,VideoCameraOutlined,} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import "./../../styles/sidebar.css";

const { Header, Sider, Content } = Layout;

const DefaultHandleSales= ({children}) => {
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
        <div className="demo-logo-vertical" />
        <h3>ACONEX COMPUTER</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={selectedKey}
          onClick={handleMenuClick}
          >
            <Menu.Item key="/home" icon={<MenuFoldOutlined />}>
            <Link to="/home">Home</Link>
            </Menu.Item>

            <Menu.Item key="/user" icon={<UserOutlined />}>
            <Link to="/user">Users</Link>
          </Menu.Item>

            <Menu.Item key="/" icon={<MenuFoldOutlined />}>
            <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item key="/" icon={<MenuFoldOutlined />}>
            <Link to="/">Home</Link>
            </Menu.Item>


          </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer}}>
        </Header>
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

export default DefaultHandleSales;