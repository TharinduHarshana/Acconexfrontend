import React, { useState, useEffect } from 'react';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/bill.css'
import axios from 'axios'; 

function Bill() {
  const [billItems, setBillItems] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item
  const [quantity, setQuantity] = useState(1); // State to store quantity
  const [discount, setDiscount] = useState(0); // State to store discount
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all items 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/item/');
        setItems(response.data.data);
        setFilteredItems(response.data.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
 
  // Search items
  const filterItem = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filteredData = items.filter(
      (row) =>
        row.displayName.toLowerCase().includes(value) ||
        row.productID.toLowerCase().includes(value)
    );
    setFilteredItems(filteredData);
  };

  // Function to add item to bill table
  const handleAddToBill = () => {
    if (selectedItem) {
      const itemToAdd = { ...selectedItem, quantity, discount };
      setBillItems([...billItems, itemToAdd]);
      setShowModal(false);
    }
  };

  return (
    <div className='bill_container'>
      <DefaultHandleSales>
        <div className='content'>
          <div className='bill_container'>
            <div>
              <div className='bill_table_container'>
                <input placeholder='Search item' value={searchValue} onChange={filterItem} />
                
                <table className='bill_table'>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render filtered bill items */}
                    {filteredItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.displayName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.sellingPrice}</td>
                        <td><button onClick={() => {setSelectedItem(item) ;setShowModal(true)}}>Add to Bill</button></td> {/* Update selectedItem when button is clicked */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {showModal && (
            <div className='modal'>
              <div className='modal-content'>
                <h2>Add Quantity and Discount</h2>
                <label>Quantity:</label>
                <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <label>Discount:</label>
                <input type='number' value={discount} onChange={(e) => setDiscount(e.target.value)} />
                <button onClick={handleAddToBill}>Add to Bill</button>
              </div>
            </div>
          )}
        <div className='print_bill'>
          <div>
          <form className='bill_form' >
            <div>
              <p style={{textAlign:'center',fontSize:18, fontStyle:"oblique"}}>Acconex Computers<br/></p>
              <p style={{textAlign:'center',fontSize:11}}>Kaburupitiya, Mathara.<br/> Mob; 0712293447 Tel: 0770897865</p>
              <hr/>
              <p style={{fontSize:12}}>Invoice No:</p>
              <p style={{fontSize:12}}>Chashier:</p>
              <p style={{fontSize:12}}>Date:</p><hr/>
            </div>
            <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                         {/* Render bill items */}
                      {billItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.displayName}</td>
                          <td>{item.sellingPrice}</td>
                          <td>{item.discount}</td>
                          <td>{/* Calculate amount */}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                </div>
                <hr/>
                <p>Net Total </p>
                <p>Tebdered </p>
                <p>Balance </p>
                <hr/>
                <p style={{textAlign:'center'}}>Thank You..!Come Again.</p>
          </form>
          </div>
          </div>
        </div>
      </DefaultHandleSales>
    </div>
  )
}

export default Bill;
