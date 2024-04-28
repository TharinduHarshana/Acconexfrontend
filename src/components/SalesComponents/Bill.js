// Bill.js

import React, { useState, useEffect } from 'react';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/bill.css';
import axios from 'axios';
import BillForm from './bill_Form';

const Bill = () => {
  const [billItems, setBillItems] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item
  const [invoiceNo, setInvoiceNo] = useState('');
  const [cashier, setCashier] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/item/');
        setItems(response.data.data);
        setFilteredItems(response.data.data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };
    fetchData();

    // Generate invoice number
    const currentInvoiceNumber = generateInvoiceNumber();
    setInvoiceNo(currentInvoiceNumber);

    // Get current date and time
    const currentDate = getCurrentDateTime();
    setDate(currentDate);

  }, []);

  const generateInvoiceNumber = () => {
    return `inv${(1000 + billItems.length + 1).toString().substr(1)}`;
  };

  
  // Function to get current date and time
  const getCurrentDateTime = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10); // Get date in YYYY-MM-DD format
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = `${hours}:${minutes}:${seconds}`; // Get time in HH:MM:SS format
    return `${formattedDate} ${formattedTime}`;
  };

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

 // Inside the Bill component
 const handleChange = (item) => {
  setSelectedItem(item); // Set the selected item
  setShowModal(true); // Show the modal form
};

  const handleConfirmAddToBill = (formData) => {
    const itemToAdd = { ...formData };
    setBillItems([...billItems, itemToAdd]);
    setShowModal(false);
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
                      <th>Item ID</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productID}</td>
                        <td>{item.displayName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.sellingPrice}</td>
                        <td>
                          <button onClick={() => handleChange(item)}>Add</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='print_bill'>
            <div>
              <form className='bill_form'>
                <div>
                  <p style={{ textAlign: 'center', fontSize: 18, fontStyle: 'oblique' }}>Acconex Computers<br /></p>
                  <p style={{ textAlign: 'center', fontSize: 11 }}>Kaburupitiya, Mathara.<br /> Mob; 0712293447 Tel: 0770897865</p>
                  <hr />
                  <div className="form-row">
                    <div className="form-group">
                      <label style={{ fontSize: 12 }} htmlFor='invoice_no'>Invoice No:</label>
                      <input type='text' id='invoice_no' className="input-no-border" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                    </div> 
                    <div className="form-group">
                      <label style={{ fontSize: 12 }} htmlFor='cashier'>Cashier:</label>
                      <input type='text' id='cashier' className="input-no-border" value={cashier} onChange={(e) => setCashier(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: 12 }} htmlFor='date'>Date:</label>
                      <input type='date' id='date' className="input-no-border" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                  </div>
                </div> 
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.discount}</td>
                          <td>{((item.price * item.quantity)-item.discount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <p>Net Total </p>
                <p>Tendered </p>
                <p>Balance </p>
                <hr />
                <p style={{ textAlign: 'center' }}>Thank You..! Come Again.</p>
              </form>
            </div>
          </div>
          {showModal && (
            <BillForm
              handleClose={() => setShowModal(false)}
              handleConfirmAddToBill={handleConfirmAddToBill}
              selectedItem={selectedItem} // Pass the selected item data to the modal form
              invoiceNo={invoiceNo}
              setInvoiceNo={setInvoiceNo}
              date={date}
              setDate={setDate}
            />
          )}
        </div>
      </DefaultHandleSales>
    </div>
  );
}

export default Bill;
