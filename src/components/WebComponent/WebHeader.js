import React, { useState, useEffect } from 'react';
import { Menu, Input } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../images/logo.jpg';

function WebHeader() {
  const [categories, setCategories] = useState([]);
  const { Search } = Input;

  useEffect(() => {
    axios.get('http://localhost:8000/webitem/')
      .then(res => {
        const uniqueCategories = Array.from(new Set(res.data.data.map(item => item.category)));
        setCategories(uniqueCategories);
      })
      .catch(err => console.log(err));
  }, []);

  const onMenuClick = (item) => {
    window.location.href = '/web/' + item.key;
  }

  return (
    <div className='header-container'>
      <div className='webHeader sticky'>
        <Menu
          mode='horizontal'
          theme='dark'
          onClick={onMenuClick}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', zIndex: '10'}
        }
        >
          <Menu.Item key='home' style={{ padding: '0' }}>
            <img src={logo} alt='acconex logo' style={{ width: '100px', height: '40px' }} />
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
            <Menu.Item key='search'>
                <Search placeholder='Search' style={{ width: '300px',paddingTop:'10px'}} />
            </Menu.Item>
          <Menu.Item key='login' >
            <Link to="/web/login">LOGIN</Link>
          </Menu.Item>
          <Menu.Item key='register'>
            <Link to="/web/register">REGISTER</Link>
          </Menu.Item>
          <Menu.Item key='cart' icon={<ShoppingCartOutlined />}>
            CART (0)
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default WebHeader;