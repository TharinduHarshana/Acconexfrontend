import React, { useState } from 'react';
import {FileDoneOutlined ,RollbackOutlined,HomeOutlined,LogoutOutlined,UserAddOutlined ,ReconciliationOutlined,} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import "./../../styles/sidebar.css"; 
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
        <h3 className="title">ACONEX COMPUTER</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          selectedKeys={selectedKey}
          onClick={handleMenuClick}
          >
            <Menu.Item key="home" icon={<RollbackOutlined />}>
            <Link to="/admin/dashbord">Back</Link>
            </Menu.Item>


            <Menu.Item key="/bill" icon={<FileDoneOutlined />}>
            <Link to="/admin/bill">Bill</Link>
            </Menu.Item>


            <Menu.Item key="/holdclose" icon={<ReconciliationOutlined />}>
            <Link to="/holdbill">Suspend Sale</Link>
            </Menu.Item>
            <br></br>

            <Menu.Item key="/dailysales" icon={<ReconciliationOutlined />}>
            <Link to="/dailysales">Daily Sale</Link>
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
              <Link to ="/home" ><HomeOutlined /></Link>
                <SettingFilled />
                <SyncOutlined spin />
               <Link to ='/log'> <LogoutOutlined /></Link>
            </Space>

        </Header>
        <Content className='Handlercontent'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultHandleSales;