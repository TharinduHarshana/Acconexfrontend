import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, Card, Image, Typography, Badge, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import WebHeader from '../WebComponent/WebHeader';
import Footer from '../WebComponent/WebFooter';
import ItemDetails from '../WebComponent/WebItemDetails';
import Banner from '../../images/baner.jpeg';

function SearchResults() {
  const [results, setResults] = useState([]);
  const { value } = useParams();
  const navigate = useNavigate(); // Correctly destructure navigate from useNavigate
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    if (value && value.trim().length > 0) {
      axios.get(`http://localhost:8000/webitem/search/${value}`)
      .then(res => {
        setResults(res.data.data);
      })
      .catch(err => console.log(err));
    }
  }, [value]);

  //functon in save item to the cart 
  const handleAddToCart = async (item) => {
    try {
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
      console.error('Please Login/Regiater first', error);
      message.error('Please Login/Regiater first');
    }
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item); // Set the selected item
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div>
      <div><WebHeader /></div>
      <div className='banner'>
      <img src={Banner} alt='banner' style={{ width: '100%', height: '420px' }} />
      </div>
      <div >
        <List
          grid={{ column: 3 }}
          dataSource={results}
          renderItem={(item, index) => (
            <Badge.Ribbon className={item.quantity === 0 ? "out-of-stock" : "in-stock"} text={item.quantity === 0 ? "Out of Stock" : "In Stock"}>
              <Card className='Itemcard' title={item.itemName} key={index}
                cover={<Image className='displaimg' alt="example" src={item.imageLink} />}
                actions={[
                  <Button onClick={() => handleAddToCart(item)}>{<ShoppingCartOutlined />} Add to Cart</Button>,
                  <Button onClick={() => handleShowDetails(item)} > Show More Details</Button>
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

export default SearchResults;
