import React from 'react'
import{Menu}from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'

function WebHeader(){
    const navigate = useNavigate();
    const onMenuclick = (item) => {
        //console.log(item)
        navigate('/category/'+item.key)
    };

    return(
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
           items ={[
            {
            label: <HomeOutlined/>,
            key: 'home',
        },
        
        {
            label: 'ALL PRODUCTS',
            key: 'products',
                children: [
                {
                    label: 'Laptops',
                    key: 'laptops',
                },
                {
                    label: 'Desktop',
                    key: 'desktop',
                },
                {
                    label: 'CCTV',
                    key: 'cctv',
                },
                {
                    label: 'Laptop Accessories',
                    key: 'laptopaccessories',
                },
                {
                    label: 'Desktop Accessories',
                    key: 'desktopaccessories',
                },
                {
                    label: 'CCTV Accessories',
                    key: 'cctvaccessories',
                },
                
            ],
        },
        {
            label: 'ABOUT US',
            key: 'about',
        },
        {
            label: 'SERVICES',
            key: 'services',
        },
        {
            label: 'PAYMENT METHODS',
            key: 'payment',
        },
        {
            label: 'CONTACT US',
            key: 'contact',
        },
        {
            label: 'LOGIN/REGISTER',
            key: 'login',
        },




           ]}/>
        </div>
        </div>
    )
}

export default WebHeader;