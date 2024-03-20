import { Layout, theme,Menu } from "antd";
import { useState } from "react";
import {PercentageOutlined,DatabaseOutlined ,HomeOutlined,LogoutOutlined,SettingFilled,SyncOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import '../../styles/sidebar.css';


const {Header, Sider, Content} = Layout

const DefaultHandleInventory = ({children}) => {
    const [collapsed] = useState(false);
    const[selectedKey, setSelectedKey] = useState(window.location.pathname);

    const{
        token: {colorBgContainer},
    } = theme.useToken();
    
    const handleMenuClick =(e) =>{
        setSelectedKey(e.key);
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical"/>
            <h3 className="AccTitle">ACONEX COMPUTER</h3>
            <Menu theme="dark"
                mode ="inline"
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={selectedKey}
                onClick={handleMenuClick}
                >
                <Menu.Item key = "/home" icon={<HomeOutlined/>}>
                <Link to ="/home">Home</Link>
                </Menu.Item>

                <Menu.Item key = "/inventory" icon={<DatabaseOutlined/>}>
                <Link to ="/inventory">Inventory</Link>
                </Menu.Item>

                <Menu.Item key = "/discountcalc" icon={<PercentageOutlined/>}>
                <Link to ="/discountcalc">Discount</Link>
                </Menu.Item>
                <Menu.Item key="/log" icon={<LogoutOutlined/>}>
                <Link to="/log">LOGOUT</Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>
            <Header style={{background: colorBgContainer}}>
                <space className="topbar">
                <HomeOutlined />
                <SettingFilled />
                <SyncOutlined spin />
                <LogoutOutlined />
                </space>
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
        </Layout>
    
    );
}
 
export default DefaultHandleInventory;