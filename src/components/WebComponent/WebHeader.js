import React, { useState, useEffect } from 'react';
import { Menu, AutoComplete, Input,Avatar } from 'antd';
import { ShoppingCartOutlined,UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../../images/logo.jpg';
import DisplayCart from '../WebComponent/Web.DisplayCart'; // Adjust the import path as needed
import SubMenu from 'antd/es/menu/SubMenu';

const { Option } = AutoComplete;

function WebHeader() {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false); // Track if the page has been refreshed
  const navigate = useNavigate();
  const [userdata, setUserData] = useState([]);

  //get logged user name and the profile picture
 
  useEffect(() => {
    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('https://acconex-backend.vercel.app/webuser/get', {
                    headers: { 'Authorization': token }
                });
                const { fname, profileImage } = response.data;
                setUserData({ fname,profileImage });
            } catch (error) {
                console.error('Error fetching user details:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load user details. Please try again later.'
                });
            }
        }
    };

    fetchUserDetails();
}, []);



  useEffect(() => {
    axios.get('https://acconex-backend.vercel.app/webitem/')
      .then(res => {
        const uniqueCategories = Array.from(new Set(res.data.data.map(item => item.category)));
        setCategories(uniqueCategories);

        const itemNames = res.data.data.map(item => item.displayName);
        setDataSource(itemNames);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getCartCount();
    checkLoginStatus();
  }, []);

  const onMenuClick = (item) => {
    if (item.key === 'cart') {
      setCartVisible(true);
    } else if (item.key === 'logout') {
      navigate('/web/home');
      window.location.reload();
    } else if (item.key !== 'search') {
      navigate(`/web/${item.key}`); // Use navigate for internal navigation
    }
  };

  // Check if user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Remove token from cookies
    setIsLoggedIn(false);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Logged out successfully',
    });
    navigate('/');
  };

  // Get cart count with login user 
  const getCartCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await axios.get('https://acconex-backend.vercel.app/cart/count', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCartCount(res.data.count); // Assume the response contains a 'count' field
      }
    } catch (error) {
      console.error(error);
      setCartCount(0); // Default to 0 if there is an error
    }
  };

  const handleSearch = (value) => {
    const trimmedValue = value.trim().slice(0, 10);
    setSearchValue(trimmedValue);
    if (trimmedValue.length > 0) {
      axios.get(`https://acconex-backend.vercel.app/webitem/search/${trimmedValue}`)
        .then(res => {
          const filtered = res.data.data.map(item => item.displayName);
          setFilteredData(filtered);
        })
        .catch(err => {
          console.log(err);
          setFilteredData([]);
        });
    } else {
      setFilteredData([]);
    }
  };
  
  const handleSelect = (value) => {
    setSearchValue(value.slice(0, 10));
    navigate(`/web/search/${value.slice(0, 10)}`);
  };
  
  const handleSearchSubmit = (value) => {
    const trimmedValue = value.trim().slice(0, 10);
    if (trimmedValue.length > 0) {
      navigate(`/web/search/${trimmedValue}`);
    }
  };
  

  const handleCartClose = () => {
    setCartVisible(false);
    if (!hasRefreshed) {
      setHasRefreshed(true);
      window.location.reload(); // Refresh the page when the cart is closed for the first time
    }
  };

  return (
    <div className='header-container'>
      <div className='webHeader sticky'>
        <Menu
          mode='horizontal'
          theme='dark'
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', position: 'fixed', zIndex: '10' }}
          onClick={onMenuClick}
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
          <Menu.Item key='about'>ABOUT US</Menu.Item>
          <Menu.Item key='services'>SERVICES</Menu.Item>
          <Menu.Item key='payment'>PAYMENT METHODS</Menu.Item>
          <Menu.Item key='contact'>CONTACT US</Menu.Item>

          <Menu.Item key='search' style={{ width: '325px' }}>
            <AutoComplete
              style={{ width: 300 }}
              options={filteredData.map(item => ({ value: item }))}
              value={searchValue}
              onSearch={handleSearch}
              onSelect={handleSelect}
            >
              <Input.Search
                placeholder='Search for products...'
                onSearch={handleSearchSubmit}
                onPressEnter={() => handleSearchSubmit(searchValue)}
              />
            </AutoComplete>
          </Menu.Item>
          {!isLoggedIn && (
            <>
              <Menu.Item key='login'>
                <Link to="/web/login">LOGIN</Link>
              </Menu.Item>
              <Menu.Item key='register'>
                <Link to="/web/register">REGISTER</Link>
              </Menu.Item>
            </>
          )}
           {isLoggedIn && (
            <SubMenu
              key='profile'
              title={
                <span>
                  <Avatar src={userdata.profileImage} alt={userdata.fname} style={{ marginRight: 8 }} />
                  {userdata.fname}
                </span>
              }
            >
              <Menu.Item key='profile'>
                <Link to="/web/profile">PROFILE</Link>
              </Menu.Item>
              <Menu.Item key='logout' onClick={handleLogout}>LOGOUT</Menu.Item>
            </SubMenu>
          )}
          <Menu.Item key='cart' icon={<ShoppingCartOutlined />}>CART ({cartCount})</Menu.Item>
        </Menu>
      </div>
      <DisplayCart show={cartVisible} handleClose={handleCartClose} />
    </div>
  );
}

export default WebHeader;
