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
  const[total,setTotal]= useState(0);
  const [tendered,setTendered]=useState('');
  const [balance,setBalance]= useState(0);

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

    setCashier('hiru');
  }, []);

  useEffect(( )=>{
    //calculate net amount
    const calculatedTotal = billItems.reduce((acc,item)=>acc+((item.price*item.quantity)-item.discount),0);
    setTotal(calculatedTotal);

    //calculate balance
    if(tendered !== ''){
      const enteredAmount = parseFloat(tendered);
      const calculateBalance = enteredAmount - calculatedTotal;
      setBalance(calculateBalance);
    }

  } ,[billItems,tendered,total]);

  


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
                      <th style={{width: '50px'}}>Item ID</th>
                      <th style={{width: '150px'}}>Item Name</th>
                      <th style={{width: '50px'}}>Quantity</th>
                      <th style={{width:'50px'}}>Price</th>
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
                    <div className="print_bill_label">
                    <label style={{ fontSize: 12 }} htmlFor='invoice_no'>Invoice No:</label><br/>
                    <label style={{ fontSize: 12 }} htmlFor='cashier'>Cashier:</label><br/>
                    <label style={{ fontSize: 12 }} htmlFor='date'>Date:</label>
                  </div> 
                  
                    <div className="print_bill_input">
                      <input type='text' style={{ fontSize: 12 }} id='invoice_no' className="input-no-border" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} readOnly /><br/>
                      <input type='text' style={{ fontSize: 12 }} id='cashier' className="input-no-border" value={cashier} onChange={(e) => setCashier(e.target.value)} readOnly /><br/>
                      <input type='text' style={{ fontSize: 12 }} id='date' className="input-no-border" value={date} onChange={(e) => setDate(e.target.value)} readOnly />
                    </div>
                   
                  </div>
                </div> <hr/>
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
                <div className="form-row">
                    <div className="print_bill_label">
                    <label style={{ fontSize: 13 }} htmlFor='net_amount'>Net Amount:</label><br/>
                    <label style={{ fontSize: 13 }} htmlFor='torent'>Torent:</label><br/>
                    <label style={{ fontSize: 13 }} htmlFor='balance'>Balance:</label>
                  </div> 
                  
                    <div className="print_bill_input">
                      <input type='float' id='net_amount' className="input-no-border" value={total} onChange={(e) => setTotal(e.target.value)} readOnly/><br/>
                      <input type='float' id='torent' className="input-no-border" value={tendered} onChange={(e) => setTendered(e.target.value)}/><br/>
                      <input type='float' id='balance' className="input-no-border" value={balance} onChange={(e) => setBalance(e.target.value)} readOnly />
                    </div>
                   
                  </div>
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
          <div className='bill_btn'>
                <button className='complete_sale'>Complete Sell</button>
                <button className='add_customer'>Add Customer</button>
                <button className='suspend_sale'>Suspend Sale</button>
          </div>
        </div>
      </DefaultHandleSales>
    </div>
  );
}

export default Bill;
