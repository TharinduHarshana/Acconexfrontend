import WebHeader from '../components/WebComponent/WebHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../images/lap.jpg';
import CarouselFade from '../components/WebComponent/CarouselFade'; 
import WebFooter from '../components/WebComponent/WebFooter';

function WebHomepage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/webitem/')
            .then(res => {
                setItems(res.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div >
            <WebHeader />
            <CarouselFade />
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
            <WebFooter/>
        </div>
    );
}

export default WebHomepage;
