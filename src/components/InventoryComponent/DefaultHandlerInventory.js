import { Layout, theme } from "antd";
import { useState } from "react";
import {FileDoneOutlined ,HomeOutlined,LogoutOutlined,UserAddOutlined ,ReconciliationOutlined,} from '@ant-design/icons';
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
            </menu>
        </Layout>
    );
}
 
export default DefaultHandleInventory;