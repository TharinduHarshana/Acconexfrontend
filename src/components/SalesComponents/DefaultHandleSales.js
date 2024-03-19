import React, { useState } from 'react';
import {FileDoneOutlined ,HomeOutlined,LogoutOutlined,UserAddOutlined ,ReconciliationOutlined,} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import "./../../styles/sidebar.css";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex} from 'antd';
import { Space,} from 'antd';
import { SettingFilled, SyncOutlined } from '@ant-design/icons';


const { Header, Sider, Content } = Layout;

const DefaultHandleSales= ({children}) => {
  const [collapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h3 className="text-center text-light font-wight-bold">ACONEX COMPUTER</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={selectedKey}
          onClick={handleMenuClick}
          >
            <Menu.Item key="/home" icon={<HomeOutlined/>}>
            <Link to="/home">Home</Link>
            </Menu.Item>

            <Menu.Item key="/bill" icon={<FileDoneOutlined />}>
            <Link to="/bill">Bill</Link>
            </Menu.Item>

            <Menu.Item key="/addcus" icon={<UserAddOutlined />}>
            <Link to="/addcus">Customer</Link>
            </Menu.Item>

            <Menu.Item key="/holdclose" icon={<ReconciliationOutlined />}>
            <Link to="/holdbill">Suspend Sale</Link>
            </Menu.Item>
            <br></br>

            <Menu.Item key="/log" icon={<LogoutOutlined  />}>
            <Link to="/log">LOGOUT</Link>
            </Menu.Item>


          </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer}}>

            <Space className='topbar'>
                <HomeOutlined />
                <SettingFilled />
                <SyncOutlined spin />
                <LogoutOutlined />
            </Space>

        </Header>
        <Content
        
>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultHandleSales;