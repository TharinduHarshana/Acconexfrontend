import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import '../../styles/fadeimg.css';
import image1 from '../../images/image1.jpg'; // Import your images
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import image4 from '../../images/image4.jpg';
const CarouselFade = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="img"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1 className='mainheadding' >CCTV & ACCESSORIES </h1>
          <p className='para'>Security in Sight: Your Watchful Eye</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img"
          src={image2}
          alt="Second slide"
        />
        <Carousel.Caption>
        <h1 className='mainheadding' >LAPTOP &  ACCESSORIES</h1>
        <p className='para'>Design Meets Performance</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img"
          src={image3}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h1 className='mainheadding' >PRINTER & ACCESSORIES </h1>
        <p className='para'>Security in Sight: Your Watchful Eye</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img"
          src={image4}
          alt="Fourth slide"
        />
        <Carousel.Caption>
        <h1 className='mainheadding' >DESKTOP & DESKTOP ACCESSORIES</h1>
        <p className='para'>Try Your Dream Desktop</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;
