import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { List, Card, Image, Typography, Badge, Rate } from 'antd';
import image from '../images/lap.jpg';
import '../styles/webCategory.css';
import WebHeader from '../components/WebComponent/WebHeader';
import { Link } from 'react-router-dom';

const WebCategory = (props) => {
  const [items, setItems] = useState([]);
  const { slug } = useParams();
  console.log(slug)

  useEffect(() => {
    axios.get(`http://localhost:8000/item/${slug}`)
      .then(res => {
        console.log(res);
        setItems(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);


function addtocartBtn(params){
  return <Link className='addtocart'
  onClick={() => {
    
  }}
  >Add to Cart</Link> 
}


  return (
    <div>
      <WebHeader />
      <List
        grid={{ column: 3 }}
        dataSource={items}
        renderItem={(item, index) => (
          <Badge.Ribbon className={item.quantity === 0 ? "out-of-stock" : "in-stock"} text={item.quantity === 0 ? "Out of Stock" : "In Stock"}>
            <Card className='Itemcard' title={item.itemName} key={index}
              cover={<Image className='displaimg' alt="example" src={image} />}
              actions={[
                <Rate allowHalf defaultValue={3} />,
                <addtocartBtn/>
              ]}
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: Rs.{item.sellingPrice}
                    <Typography.Text>
                      <br></br>
                      Quantity: {item.quantity}
                    </Typography.Text>
                  </Typography.Paragraph>
                }
              />
            </Card>
          </Badge.Ribbon>
        )}
      />
    </div>
  );
}

export default WebCategory;
