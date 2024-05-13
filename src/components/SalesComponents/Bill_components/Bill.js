// import React, { useState, useEffect } from 'react';
// import DefaultHandleSales from '../DefaultHandleSales';
// import '../../../styles/bill.css';
// import axios from 'axios';
// import BillForm from './bill_Form';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import TenderedPopup from './TenderedPopup';
// import CustomerForm from "../../CustomerComponents/customerForm";
// import { message } from 'antd';

// const Bill = () => {
//   const [billItems, setBillItems] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchValue, setSearchValue] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [invoiceNo, setInvoiceNo] = useState('');
//   const [cashier, setCashier] = useState('');
//   const [date, setDate] = useState('');
//   const [total, setTotal] = useState(0);
//   const [tendered, setTendered] = useState(0);
//   const [balance, setBalance] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [showTenderedPopup, setShowTenderedPopup] = useState(false);
//   const [searchCustomerValue, setSearchCustomerValue] = useState("");
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [selectedCustomerName, setSelectedCustomerName] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [itemsResponse, customersResponse] = await Promise.all([
//           axios.get('http://localhost:8000/item/'),
//           axios.get('http://localhost:8000/customer/')
//         ]);
//         setItems(itemsResponse.data.data);
//         setFilteredItems(itemsResponse.data.data);
//         setCustomers(customersResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching items or customers:', error.message);
//       }
//     };
//     fetchData();
//     const currentInvoiceNumber = generateInvoiceNumber();
//     setInvoiceNo(currentInvoiceNumber);
//     const currentDate = getCurrentDateTime();
//     setDate(currentDate);
//     setCashier('hiru');
//   }, []);

//   useEffect(() => {
//     const calculatedTotal = billItems.reduce((acc, item) => acc + ((item.price * item.quantity) - item.discount), 0);
//     setTotal(calculatedTotal);
//     if (tendered !== '') {
//       const enteredAmount = parseFloat(tendered);
//       const calculateBalance = enteredAmount - calculatedTotal;
//       setBalance(calculateBalance);
//     }
//   }, [billItems, tendered]);

//   const generateInvoiceNumber = () => {
//     return `inv${(1000 + billItems.length + 1).toString().substr(1)}`;
//   };

//   const getCurrentDateTime = () => {
//     const date = new Date();
//     const formattedDate = date.toISOString().slice(0, 10);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();
//     const formattedTime = `${hours}:${minutes}:${seconds}`;
//     return `${formattedDate} ${formattedTime}`;
//   };

//   const filterItem = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchValue(value);
//     const filteredData = items.filter(
//       (row) =>
//         row.displayName.toLowerCase().includes(value) ||
//         row.productID.toLowerCase().includes(value)
//     );
//     setFilteredItems(filteredData);
//   };

//   const handleChange = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const handleConfirmAddToBill = (formData) => {
//     const itemToAdd = { ...formData };
//     setBillItems([...billItems, itemToAdd]);
//     setShowModal(false);
//   };

//   const calculateTotalQuantity = () => {
//     return billItems.reduce((acc, item) => acc + parseInt(item.quantity), 0);
//   };

//   const calculateTotalCost = () => {
//     return billItems.reduce((acc, item) => acc + (selectedItem.costPrice * item.quantity), 0);
// };


  
//   const handleCompleteSale = async () => {
//     try {
//       const totalQuantity = calculateTotalQuantity();
//       const totalCost = calculateTotalCost();
//       const calculateProfit = (total - totalCost);
    

//       const data = {
//         POSNO:99,
//         cashirename: cashier,
//         datetime: date,
//         customername: selectedCustomerName,
//         itemcount: totalQuantity,
//         paymentmethod: paymentMethod,
//         totalamount: total,
//         totalcost: totalCost,
//         profit: calculateProfit
//       };

//       const response = await axios.post("http://localhost:8000/dailysales/add", data);

//       if (response.data.success) {
//         message.success("Sale completed successfully and data saved to daily sales.");
//       } else {
//         message.error("Failed to save data to daily sales. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Error completing sale and saving data to daily sales:", error);
//       message.error("An error occurred while completing the sale. Please try again later.");
//     }
//   };

//   const generatePDFAndCompleteSale = () => {
//     generatePDF();
//     handleCompleteSale();
//   };

//   const generatePDF = () => {
//     const input = document.getElementById('print_bill');
//     const pdfWidth = input.offsetWidth;
//     const pdfHeight = input.offsetHeight;
//     html2canvas(input, { width: pdfWidth, height: pdfHeight }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'p',
//         unit: 'px',
//         format: [pdfWidth, pdfHeight]
//       });
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('bill.pdf');
//     });
//   };

//   const handleConfirmTendered = (tenderedAmount) => {
//     setTendered(tenderedAmount);
//     setShowTenderedPopup(false);
//   };

//   const formatNumber = (number) => {
//     return parseFloat(number).toFixed(2);
//   };

//   const handleCashRadioChange = () => {
//     setShowTenderedPopup(true);
//     setPaymentMethod('cash');
//   };

//   const handleBankTransferRadioChange = () => {
//     setTendered(formatNumber(total));
//     setPaymentMethod('bank');
//   };

//   const filterCustomer = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchCustomerValue(value);
//     const filteredData = customers.filter(
//       (row) =>
//         row.name.toLowerCase().includes(value) ||
//         row.cusid.toLowerCase().includes(value)
//     );
//     setFilteredCustomers(filteredData);
//   };

//   const handleCustomerItemClick = (customer) => {
//     setSelectedCustomerName(customer.name);
//     setSearchCustomerValue("");
//   };

//   const handleAddCustomer = () => {
//     setShowForm(true);
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       const existingCustomer = customers.find((customer) => customer.cusid === formData.cusid);
//       if (existingCustomer) {
//         message.error("Customer ID already exists. Please choose a different ID.");
//         return;
//       }
//       const response = await axios.post("http://localhost:8000/customer/add", formData);
//       if (response.data.success) {
//         message.success(response.data.message);
//         setShowForm(false);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       message.error("An error occurred while submitting the form.");
//     }
//   };

//   return (
//     <div className='bill_container'>
//       <DefaultHandleSales>
//         <div className='content'>
//           <div className='bill_container'>
//             <div>
//               <div className='bill_table_container'>
//                 <input placeholder='Search item' value={searchValue} onChange={filterItem} />
//                 <table className='bill_table'>
//                   <thead>
//                     <tr>
//                       <th style={{ width: '50px' }}>Item ID</th>
//                       <th style={{ width: '150px' }}>Item Name</th>
//                       <th style={{ width: '20px' }}>Qnt</th>
//                       <th style={{ width: '50px' }}>Price</th>
//                       <th style={{ width: '50px' }}> Cost</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredItems.map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.productID}</td>
//                         <td>{item.displayName}</td>
//                         <td>{item.quantity}</td>
//                         <td>{formatNumber(item.sellingPrice)}</td>
//                         <td>{formatNumber(item.costPrice)}</td>
//                         <td>
//                           <button onClick={() => handleChange(item)}>Add</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className='print_bill' id='print_bill'>
//             <div className='searchcustomer'>
//               <input placeholder='Search customer' value={searchCustomerValue} onChange={filterCustomer} />
//               {searchCustomerValue && filteredCustomers.length > 0 && (
//                 <div className='customer-list'>
//                   {filteredCustomers.map((customer, index) => (
//                     <div key={index} className='customer-item' onClick={() => handleCustomerItemClick(customer)}>
//                       <table>
//                         <tbody>
//                           <tr>
//                             <td className='selectedcustomer'>
//                               <span style={{ fontWeight: 'bold' }}>Name: {customer.name}</span><br />
//                               <span>Address: {customer.address}</span>
//                               <span style={{ marginLeft: '30px' }}>Mobile: {customer.mobile}</span>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div>
//               <form className='bill_form'>
//                 <div>
//                   <p style={{ textAlign: 'center', fontSize: 18, fontStyle: 'oblique' }}>Acconex Computers<br /></p>
//                   <p style={{ textAlign: 'center', fontSize: 11 }}>Kaburupitiya, Mathara.<br /> Mob; 0712293447 Tel: 0770897865</p>
//                   <hr />
//                   <div className="form-row">
//                     <div className="print_bill_label">
//                       <label style={{ fontSize: 12 }} htmlFor='invoice_no'>Invoice No:</label><br />
//                       <label style={{ fontSize: 12 }} htmlFor='cashier'>Cashier:</label><br />
//                       <label style={{ fontSize: 12 }} htmlFor='date'>Date:</label>
//                     </div>
//                     <div className="print_bill_input">
//                       <input type='text' style={{ fontSize: 12 }} id='invoice_no' className="input-no-border" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} readOnly /><br />
//                       <input type='text' style={{ fontSize: 12 }} id='cashier' className="input-no-border" value={cashier} onChange={(e) => setCashier(e.target.value)} readOnly /><br />
//                       <input type='text' style={{ fontSize: 12 }} id='date' className="input-no-border" value={date} onChange={(e) => setDate(e.target.value)} readOnly />
//                     </div>
//                   </div>
//                 </div>
//                 <hr />
//                 <div>
//                   <table className='print_bill_table'>
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th>Price</th>
//                         <th>Qty</th>
//                         <th>Discount</th>
//                         <th>Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {billItems.map((item, index) => (
//                         <tr key={index}>
//                           <td>{item.product}</td>
//                           <td>{formatNumber(item.price)}</td>
//                           <td>{item.quantity}</td>
//                           <td>{item.discount}</td>
//                           <td>{formatNumber(((item.price * item.quantity) - item.discount))}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <hr />
//                 <div className="form-row">
//                   <div className="print_bill_label">
//                     <label style={{ fontSize: 13 }} htmlFor='net_amount'>Net Amount:</label><br />
//                     <label style={{ fontSize: 13 }} htmlFor='torent'>Tendered Amount:</label><br />
//                     <label style={{ fontSize: 13 }} htmlFor='balance'>Due Amount:</label>
//                   </div>
//                   <div className="print_bill_input">
//                     <input type='float' id='net_amount' className="input-no-border" value={formatNumber(total)} readOnly /><br />
//                     <input type='float' id='torent' className="input-no-border" value={formatNumber(tendered)} onChange={(e) => setTendered(formatNumber(e.target.value))} /><br />
//                     <input type='float' id='balance' className="input-no-border" value={formatNumber(balance)} readOnly />
//                   </div>
//                 </div>
//                 <br />
//                 <div className='payment-method-container'>
//                   <div className="payment-method">
//                     <input type='radio' name='paymentMethod' id='cash' checked={paymentMethod === 'cash'} value='cash' onChange={handleCashRadioChange} />
//                     <label htmlFor='cash'>Cash</label>
//                   </div>
//                   <div className="payment-method">
//                     <input type='radio' name='paymentMethod' id='bank' checked={paymentMethod === 'bank'} value='bank' onChange={handleBankTransferRadioChange} />
//                     <label htmlFor='bank'>Bank Transfer</label>
//                   </div>
//                 </div>
//                 <hr />
//                 <p style={{ textAlign: 'center' }}>Thank You {selectedCustomerName && `${selectedCustomerName}`}..! Come Again.</p>
//                 <p>Total Quantity: {calculateTotalQuantity()}</p>
//               </form>
//             </div>
//           </div>
//           {showTenderedPopup && paymentMethod === 'cash' && (
//             <TenderedPopup onClose={() => setShowTenderedPopup(false)} onConfirm={handleConfirmTendered} />
//           )}
//           {showModal && (
//             <BillForm
//               handleClose={() => setShowModal(false)}
//               handleConfirmAddToBill={handleConfirmAddToBill}
//               selectedItem={selectedItem}
//               invoiceNo={invoiceNo}
//               setInvoiceNo={setInvoiceNo}
//               date={date}
//               setDate={setDate}
//               handleCompleteSale={handleCompleteSale}
//             />
//           )}
//           {showForm && (
//             <CustomerForm handleSubmit={handleFormSubmit} handleClose={() => setShowForm(false)} />
//           )}
//           <div className='bill_btn'>
//             <button className='complete_sale' onClick={generatePDFAndCompleteSale}>Complete Sell</button>
//             <button className='add_customer' onClick={handleAddCustomer}>Add Customer</button>
//             <button className='suspend_sale'>Suspend Sale</button>
//           </div>
//         </div>
//       </DefaultHandleSales>
//     </div>
//   );
// }

// export default Bill;
