// Bill.js

import React, { useState, useEffect } from 'react';
import DefaultHandleSales from '../DefaultHandleSales';
import '../../../styles/bill.css';
import axios from 'axios';
import BillForm from './bill_Form';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import TenderedPopup from './TenderedPopup';

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
  const[total,setTotal]= useState('');
  const [tendered,setTendered]=useState('0.00');
  const [balance,setBalance]= useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showTenderedPopup, setShowTenderedPopup] = useState(false);
  const [searchCustomerValue, setSearchCustomerValue] = useState("");
  const [customers, setCustomers] = useState([]); // State for storing customer data
  const [filteredCustomers, setFilteredCustomers] = useState([]); // State for storing filtered customer list
  const [selectedCustomerName, setSelectedCustomerName] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/item/');
        setItems(response.data.data);
        setFilteredItems(response.data.data);

        const customerResponse = await axios.get('http://localhost:8000/customer/');
        setCustomers(customerResponse.data.data);

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

  //search the item
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

 
 const handleChange = (item) => {
  setSelectedItem(item); // Set the selected item
  setShowModal(true); // Show the modal form
};

  const handleConfirmAddToBill = (formData) => {
    const itemToAdd = { ...formData };
    setBillItems([...billItems, itemToAdd]);
    setShowModal(false);
  };

  //generate the bill into pdf and download
  const generatePDF = () => {
    const input = document.getElementById('print_bill');
  
    const pdfWidth = input.offsetWidth;
    const pdfHeight = input.offsetHeight;
  
    html2canvas(input, { width: pdfWidth, height: pdfHeight }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('bill.pdf');
    });
  };
  
//set payment method
const handleConfirmTendered = (tenderedAmount) => {
  // Handle the confirmation of the tendered amount here
  setTendered(tenderedAmount);
  setShowTenderedPopup(false);
};

// Function to format numbers with two decimal places
const formatNumber = (number) => {
  return parseFloat(number).toFixed(2);
};

// Function to handle cash radio button change
const handleCashRadioChange = () => {
  setShowTenderedPopup(true); // Show the tendered popup when "Cash" is selected
  setPaymentMethod('cash'); // Set payment method to "Cash"
};

// Callback function to handle tendered amount confirmation
const handleBankTransferRadioChange = () => {
  setTendered(formatNumber(total)); // Set tendered amount to net amount
  setPaymentMethod('bank'); // Set payment method to "Bank Transfer"
};

//search customer
const filterCustomer = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCustomerValue(value);
    const filteredData = customers.filter(
      (row) =>
        row.name.toLowerCase().includes(value) ||
        row.cusid.toLowerCase().includes(value)
    );
    setFilteredCustomers(filteredData);
  };


  const handleCustomerItemClick = (customer) => {
    setSelectedCustomerName(customer.name);
    // Other logic you may have
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
                        <td>{formatNumber(item.sellingPrice)}</td>
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
          <div className='print_bill' id='print_bill' >
          <div className='searchcustomer'>
          <input placeholder='Search customer' value={searchCustomerValue} onChange={filterCustomer} />
              {searchCustomerValue && filteredCustomers.length > 0 && (
                    <div className='customer-list'>
                      {filteredCustomers.map((customer, index) => (
                        <div key={index} className='customer-item'>
                          <table >
                            <tbody>
                              <tr>
                                <td> 
                                <span style={{fontWeight:'bold'}}>Name :{customer.name}</span><br/>
                                <span>Address :{customer.address}</span>
                                <span style={{marginLeft:'30px'}}>Mobile :{customer.mobile}</span>
                                </td>
                              </tr>
                             
                            </tbody>
                          
                          </table>
                        </div>
                     ))}
                   </div>
                
              )}
          </div>

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
                  <table className='print_bill_table'>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Discount</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item, index) => (
                        < tr key={index}>
                          <td>{item.product}</td>
                          <td>{formatNumber(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td>{item.discount}</td>
                          <td>{formatNumber(((item.price * item.quantity)-item.discount))}</td>
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
                      <input type='float' id='net_amount' className="input-no-border" value={formatNumber(total)} onChange={(e) => setTotal(e.target.value)} readOnly/><br/>
                      <input type='float' id='torent' className="input-no-border" value={formatNumber(tendered)} onChange={(e) => setTendered(formatNumber(e.target.value))}/><br/>
                      <input type='float' id='balance' className="input-no-border" value={formatNumber(balance)} onChange={(e) => setBalance(e.target.value)} readOnly />
                    </div>
                    
                  </div>
                  <br/>
                    <div className='payment-method-container'>
                      <div className="payment-method">
                        <input type='radio' name='paymentMethod' id='cash' checked={paymentMethod === 'cash'} value='cash' onChange={handleCashRadioChange} />
                        <label htmlFor='cash'>Cash</label>
                      </div>
                      <div className="payment-method">
                        <input type='radio' name='paymentMethod' id='bank' checked={paymentMethod === 'bank'} value='bank' onChange={handleBankTransferRadioChange} />
                        <label htmlFor='bank'>Bank Transfer</label>
                      </div>
                  </div>
                <hr />
                <p style={{ textAlign: 'center' }}>Thank You {selectedCustomerName && ` ${selectedCustomerName}`}..! Come Again.</p>
              </form>
            </div>
          </div>
          {showTenderedPopup && paymentMethod === 'cash' && ( // Show tendered popup only when "Cash" is selected
            <TenderedPopup onClose={() => setShowTenderedPopup(false)} onConfirm={handleConfirmTendered} />
          )}
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
                <button className='complete_sale'  onClick={generatePDF}>Complete Sell</button>
                <button className='add_customer'>Add Customer</button>
                <button className='suspend_sale'>Suspend Sale</button>
          </div>
        </div>
      </DefaultHandleSales>
    </div>
  );
}

export default Bill;
