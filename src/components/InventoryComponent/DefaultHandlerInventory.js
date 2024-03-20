import { Layout, theme } from "antd";
import { useState } from "react";
import {PercentageOutlined,DatabaseOutlined ,HomeOutlined,LogoutOutlined,UserAddOutlined ,ReconciliationOutlined,} from '@ant-design/icons';
import { Link } from "react-router-dom";


const {Header, Sider, Content} = Layout

const DefaultHandleInventory = (children) => {
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
            Sider trigger={null} collapsible collapsed={collapsed}
            <div className="demo-logo-vertical"/>
            <h3 className="text-center text-light text-weight-bold">ACONEX COMPUTER</h3>
            <menu theme="dark"
                mode ="inline"
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={selectedKey}
                onClick={handleMenuClick}
                >
                <menu.item key = "/home" icon={<HomeOutlined/>}>
                <Link to ="/home">Home</Link>
                </menu.item>

                <menu.item key = "/inventory" icon={<DatabaseOutlined/>}>
                <Link to ="/inventory">Inventory</Link>
                </menu.item>

                <menu.item key = "/discountcalc" icon={<PercentageOutlined/>}>
                <Link to ="/discountcalc">Discount</Link>
                </menu.item>
                <Menu.Item key="/log" icon={<LogoutOutlined  />}>
                <Link to="/log">LOGOUT</Link>
                </Menu.Item>
                
            </menu>
        </Layout>
    );
}
 
export default DefaultHandleInventory;