import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WebHeader from '../components/WebComponent/WebHeader';
import WebFooter from '../components/WebComponent/WebFooter';

const AboutUs = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/category/')
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const handleCategoryClick = (category) => {
        // Handle the click event for the category
        // For example, redirect to a category details page
        console.log('Category clicked:', category);
    };

    return (
        <div>
            <WebHeader />
            <div style={{ padding: '60px' }}>
                <h1 style={{ textAlign: 'center' }}>ABOUT US</h1>
                <p>Aconex Computers (Pvt) Ltd. began its humble journey in 2022. Our accolades and recognition by well-known multinational 
                    brands confirm our No. 1 position in the Southern Province of Sri Lanka.</p>
                <p>We offer a diverse range of products and represent major multinational brands such as HP, ASUS, Dell, EPSON, Canon, 
                    and HIK Vision. Our product portfolio includes desktop computers, laptops, printers, computer accessories, office automation 
                    products, CCTV, and security solutions, with a renowned expertise in gaming computers. We are pioneers in providing comprehensive 
                    solutions for both businesses and households, including network solutions, camera solutions, security and access control solutions,
                    Private Automatic Branch Exchange (PABX) solutions, and Public Address Sound Systems (PASS).</p>
                <h3>VISION</h3>
                <p>To be the most trusted and preferred IT solutions provider in the Southern Province of Sri Lanka.</p>
                <h3>MISSION</h3>
                <p>Our mission is to provide the best IT solutions to our customers, ensuring the highest quality products and services, 
                    while maintaining the highest standards of professionalism and integrity.</p>
                <h3>PRODUCTS</h3>
                <p>Our product portfolio includes desktop computers, laptops, printers, computer accessories, office automation products, 
                    CCTV and security solutions, with a renowned expertise in gaming computers.</p>

                
                <Slider {...settings}>
                    {categories.map(category => (
                        <div key={category.id} onClick={() => handleCategoryClick(category)}>
                            <img src={category.imageLink} alt={category.categoryname} style={{ width: '100%',height:'250px' , cursor: 'pointer' }} />
                            <p style={{ textAlign: 'center' }}>{category.categoryname}</p>
                        </div>
                    ))}
                </Slider>
            </div>
            <WebFooter />
        </div>
    );
};

export default AboutUs;
