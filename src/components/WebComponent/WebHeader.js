import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';

function WebHeader() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/item/')
            .then(res => {
                const uniqueCategories = Array.from(new Set(res.data.data.map(item => item.category)));
                setCategories(uniqueCategories);
            })
            .catch(err => console.log(err));
    }, []);

    const onMenuclick = (item) => {
        window.location.href = '/web/' + item.key;
    };

    return (
        <div>
            <div>
                <h1>ACCONEX</h1>
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
        </div>
    );
}

export default WebHeader;
