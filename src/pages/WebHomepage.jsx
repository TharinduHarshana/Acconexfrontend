import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WebHeader from '../components/WebComponent/WebHeader';
import Card from 'react-bootstrap/Card';
import WebFooter from '../components/WebComponent/WebFooter';
import CarouselFade from '../components/WebComponent/CarouselFade'; 
import '../styles/webhomepage.css';

function WebHomepage() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/category/')
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/webitem/')
            .then(res => {
                const sortedItems = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
                setItems(sortedItems);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="web-homepage">
            <WebHeader />
            <CarouselFade />
            <div className="container">
                <div className="row">
                    {categories.map(category => (
                        <div className="col-md-3 mb-4" key={category._id}>
                            <Link to={`/web/${category.categoryname}`} className="category-link">
                                <Card className="category-card">
                                    <div 
                                        className="category-card-img"
                                        style={{ backgroundImage: `url(${category.imageLink})` }}
                                    >
                                        <div className='card-text' >
                                            <Card.Body>
                                                <Card.Title>{category.categoryname}</Card.Title>
                                                <Card.Text className="category-card-overlay">
                                                    {category.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <h3 className='text-center'>LATEST PRODUCTS</h3>
                    <p className='text-center'>BEST - LOWEST PRICE FOR ALL PRODUCTS</p>
                </div>
                {items.map(item => (
                    <div className="col-md-3 mb-4" key={item._id}>
                        {/* Wrap the entire Card component with a Link component */}
                        <Link to={`/web/search/${item.displayName}`} className="product-link">
                            <Card className="product-card">
                                <Card.Img variant="top" src={item.imageLink} />
                                <Card.Body>
                                    <Card.Title>{item.displayName}</Card.Title>
                                    <Card.Text>
                                        {/* Display item details as needed */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
            <WebFooter />
        </div>
    );
}

export default WebHomepage;
