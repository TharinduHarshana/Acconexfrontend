import React, { useState, useEffect } from 'react';
import { Menu, Modal } from 'antd';
import Modal2 from'react-modal';
import { HomeOutlined, FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons';
import axios from 'axios';
import logo from '../../images/logo.jpg';
import '../../styles/webheadder.css';
import Login from '../../pages/Weblogin' // Import the Login component

export const handleCancel = setShowLoginForm => () => {
    setShowLoginForm(false); // Hide login form when cancel is clicked
};

function WebHeader() {
    const [categories, setCategories] = useState([]);
    const [showLoginForm, setShowLoginForm] = useState(false); // State to control the visibility of the login form

    useEffect(() => {
        axios.get('http://localhost:8000/item/')
            .then(res => {
                const uniqueCategories = Array.from(new Set(res.data.data.map(item => item.category)));
                setCategories(uniqueCategories);
            })
            .catch(err => console.log(err));
    }, []);

    const onMenuclick = (item) => {
        if (item.key === 'login') {
            setShowLoginForm(true); // Show login form when 'LOGIN/REGISTER' is clicked
        } else {
            window.location.href = '/web/' + item.key;
        }
    };

    const handleCancel = () => {
        setShowLoginForm(false); // Hide login form when cancel is clicked
    };

    return (
        <div>
            <div className='main'>
                <img src={logo} alt='acconex logo' className='logoimg'></img>
                <div className='heding1'>
                    <h2>ACONEX COMPUTER ONLINE STORE</h2>
                    <p> ACCONEX COMPUTER, ANAGARIKA DHARMAPALA ROAD MATARA</p>
                    <p>CONTACT US :0778570388</p>
                    <p>FOLLOW US :
                        <a href="https://www.facebook.com/Aconexcomputer/"><FacebookOutlined /></a>
                        <a href="https://wa.me/+94717314099"><WhatsAppOutlined /></a>
                    </p>
                </div>
            </div>
            <div className='webHeader'>
                <Menu
                    mode='horizontal'
                    theme='dark'
                    defaultSelectedKeys={['home']}
                    onClick={onMenuclick}
                >
                    <Menu.Item key='home' icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.SubMenu key='products' title='ALL PRODUCTS'>
                        {categories.map(category => (
                            <Menu.Item key={category}>
                                {category}
                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                    <Menu.Item key='about'>
                        ABOUT US
                    </Menu.Item>
                    <Menu.Item key='services'>
                        SERVICES
                    </Menu.Item>
                    <Menu.Item key='payment'>
                        PAYMENT METHODS
                    </Menu.Item>
                    <Menu.Item key='contact'>
                        CONTACT US
                    </Menu.Item>
                    <Menu.Item key='login'>
                        LOGIN/REGISTER
                    </Menu.Item>
                </Menu>
            </div>
            {/* Modal for login form */}
            <Modal
                visible={showLoginForm}
                onCancel={handleCancel}
                footer={null}
            >
                <Login />
            </Modal>
        </div>
    );
}

export default WebHeader;
