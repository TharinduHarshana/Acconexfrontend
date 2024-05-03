import WebHeader from '../components/WebComponent/WebHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../images/lap.jpg';
import '../styles/webhomepage.css'

//get all items from the database and display them in the homepage
function WebHomepage() {
    const [items, setItems] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/item/')
            .then(res => {
                setItems(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

//display sideshow images
useEffect(() => {
    const interval = setInterval(() => {
    setSlideIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
}, []);

const images = [
    require('../images/image1.jpg'),
    require('../images/image2.jpg'),
    require('../images/image3.jpg')
];

    return (
        <div>
            <WebHeader/>


            <div>
            <div className="slideshow-container">
            {images.map((image, index) => (
                <div
                key={index}
                className={index === slideIndex ? 'slide showing' : 'slide'}
                >
                <img src={image} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </div>
        </div>




            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {items.map(item => (
                    <div key={item._id} style={{ border: '1px solid #ddd', padding: '10px' }}>
                        <img src={image} alt='item' style={{ width: '100%', height: '200px' }} />
                        <h5>{item.itemName}</h5>
                        <p>Rs: ${item.sellingPrice}</p>
                        <p>Warranty: {item.warranty}</p>
                        <p>Category: {item.category}</p>
                        <button className='btn btn-sm btn-warning' style={{ marginRight: '10px' }}>Add to Cart</button>
                        <button className='btn btn-sm btn-primary'>Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WebHomepage;
