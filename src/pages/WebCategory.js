import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { List, Card, Image, Typography, Badge, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import '../styles/webCategory.css';
import WebHeader from '../components/WebComponent/WebHeader';
import Footer from '../components/WebComponent/WebFooter';
import ItemDetails from '../components/WebComponent/WebItemDetails';
import Banner from '../images/baner.jpeg';

const WebCategory = (props) => {
  const [items, setItems] = useState([]);
  const { slug } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/webitem/${slug}`);
        setItems(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, [slug]);

  // Function to handle adding item to the cart
  const handleAddToCart = async (item) => {
    try {
      if (item.quantity === 0) {
        message.error('This item cannot be added to the cart because it is out of stock.');
        return;
      }

      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const res = await axios.post('http://localhost:8000/cart/add', {
        Item_id: item._id,
        itemDisplayName: item.displayName,
        image: item.imageLink,
        quantity: 1,
        price: item.sellingPrice
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        }
      });

      if (res.status === 200) {
        message.success('Item added to cart');
      }
    } catch (error) {
      console.error('Please Login/Register first', error);
      message.error('Please Login/Register first');
    }
  };

  // Function to show item details in modal
  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div><WebHeader /></div>
      <div className='banner'>
        <img src={Banner} alt='banner' style={{ width: '100%', height: '420px' }} />
      </div>
      <div>
        <List
          grid={{ column: 3 }}
          dataSource={items}
          renderItem={(item, index) => (
            <Badge.Ribbon className={item.quantity === 0 ? "out-of-stock" : "in-stock"} text={item.quantity === 0 ? "Out of Stock" : "In Stock"}>
              <Card className='Itemcard' title={item.itemName} key={index}
                cover={<Image className='displaimg' alt="example" src={item.imageLink} />}
                actions={[
                  <Button onClick={() => handleAddToCart(item)}>{<ShoppingCartOutlined />} Add to Cart</Button>,
                  <Button onClick={() => handleShowDetails(item)}>Show More Details</Button>
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      {item.displayName}
                      <Typography.Text>
                        <br/><br/>
                        <span className="text-danger">Cash Price: Rs.{item.sellingPrice}.00</span>
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Badge.Ribbon>
          )}
        />
      </div>
      <ItemDetails 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedItem}
        handleAddToCart={handleAddToCart}
      />
      <Footer />
    </div>
  );
}

export default WebCategory;
