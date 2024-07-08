
import React, { useState, useEffect } from 'react';
import DefaultHandleSales from '../DefaultHandleSales';
import '../../../styles/bill.css';
import axios from 'axios';
import BillForm from './bill_Form';
import '../../../styles/print.css';
import TenderedPopup from './TenderedPopup';
import CustomerForm from "../../CustomerComponents/customerForm";
import { message,Modal} from 'antd'; 
import printBill from './printBill'; 
import { Link } from "react-router-dom";
import {EditFilled ,DeleteFilled } from '@ant-design/icons';


const Bill = () => {
  const [billItems, setBillItems] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [suspendId, setSuspendId] = useState('');
  const [cashier, setCashier] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);
  const [tendered, setTendered] = useState(0);
  const [balance, setBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showTenderedPopup, setShowTenderedPopup] = useState(false);
  const [searchCustomerValue, setSearchCustomerValue] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [nextCustomerId, setNextCustomerId] = useState('');
  const [deleteRowIndex, setDeleteRowIndex] = useState(null); // State to track the index of the row to delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [editRowIndex, setEditRowIndex] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [editQuantity, setEditQuantity] = useState(0); 
 
  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        // Fetch items, customers, and daily sales
        const [itemsResponse, customersResponse, dailySalesResponse,suspendSalesResponse] = await Promise.all([
          axios.get('http://localhost:8000/item/'),
          axios.get('http://localhost:8000/customer/'),
          axios.get('http://localhost:8000/dailysales/'),
          axios.get('http://localhost:8000/suspendsale/')
        ]);
        // Update state with fetched data
        const itemsData = itemsResponse.data.data;
        setItems(itemsData);
        setFilteredItems(itemsData);
        setCustomers(customersResponse.data.data);
  
        // Extract last invoice number and generate next invoice number
        const lastInvoiceNumber = dailySalesResponse.data.data.length > 0 ? dailySalesResponse.data.data[dailySalesResponse.data.data.length - 1].POSNO : 0;
        const nextInvoiceNumber = generateNextInvoiceNumber(lastInvoiceNumber);
        setInvoiceNo(nextInvoiceNumber);
  
          // Extract last suspend ID and generate next suspend ID
        const lastSuspendId = suspendSalesResponse.data.data.length > 0 ? suspendSalesResponse.data.data[suspendSalesResponse.data.data.length - 1].suspend_id : 'sps000';
        const nextSuspendId = generateNextSuspendId(lastSuspendId);
        setSuspendId(nextSuspendId);
      
        //get the last customer id and generate next customer id
        const lastCustomerId =customersResponse.data.data.length > 0 ? customersResponse.data.data[customersResponse.data.data.length - 1].cusid:'cus000';
        const nextCustomerId = generateNextCustomerId(lastCustomerId);
        setSelectedCustomerId(nextCustomerId);

        // Restore sale data if available
        const restoredSaleData = sessionStorage.getItem('restoredSale');
        if (restoredSaleData) {
          try {
            const { selectedSale, items } = JSON.parse(restoredSaleData);
            console.log("Restored Sale Data:", selectedSale); // Log the selectedSale object
            console.log("Restored Sale Items:", items); // Log the items array
  
            setSelectedCustomerName(selectedSale.customer_name);
            setSelectedCustomerId(selectedSale.customer_id);
  
            // Map over the restored items and add costPrice from itemsData
            const updatedBillItems = items.map(item => {
              const itemDetails = itemsData.find(i => i.productID === item.productID);
              return {
                ...item,
                costPrice: itemDetails ? itemDetails.costPrice : 0,
                total: item.quantity * item.price * (1 - item.discount / 100),
                totalCost:item.costPrice *item.quantity
              };
            });
  
            setBillItems(updatedBillItems);
            sessionStorage.removeItem('restoredSale');
          } catch (error) {
            console.error('Error parsing restored sale data:', error.message);
          }
        }
      } catch (error) {
        console.error('Error fetching items or customers:', error.message);
      }
    };
    fetchData();
  
    //get current date when resotre
    const currentDate = getCurrentDateTime();
    setDate(currentDate);
    setCashier('hiru');
  }, []);
  
  
//generate the invoice number
  const generateNextInvoiceNumber = (currentInvoiceNumber) => {
    const nextNumber = parseInt(currentInvoiceNumber.substr(3)) + 1;
    return `inv${nextNumber.toString().padStart(3, '0')}`;
  };
  
//generate the suspendsale number
const generateNextSuspendId = (currentSuspendId) => {
  const nextNumber = parseInt(currentSuspendId.substr(3)) + 1;
  return `sps${nextNumber.toString().padStart(3, '0')}`;
};

//generate the customer id
const generateNextCustomerId = (currentCustomerId) => {
  const nextNumber = parseInt(currentCustomerId.substr(3)) + 1;
  return `cus${nextNumber.toString().padStart(3, '0')}`;
};

  useEffect(() => {
    localStorage.setItem('invoiceNumber', invoiceNo);

    const calculatedTotal = billItems.reduce((acc, item) => acc + ((item.price * item.quantity) - item.discount), 0);
    setTotal(calculatedTotal);
    if (tendered !== '') {
      const enteredAmount = parseFloat(tendered);
      const calculateBalance = enteredAmount - calculatedTotal;
      setBalance(calculateBalance);
    }
  }, [billItems, tendered,invoiceNo]);

  

  //get current date
  const getCurrentDateTime = () => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return `${formattedDate} ${formattedTime}`;
  };


  //search item
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

  //check the quantity
  const handleChange = (item) => {
    setSelectedItem(item);
        setShowModal(true);
        if(item.quantity<=2){
          message.warning("This item is in Low Stock...");
        }
  };

  const handleConfirmAddToBill = async (formData) => {
    const existingItemIndex = billItems.findIndex(existingItem => existingItem.productID === selectedItem.productID);

    if (existingItemIndex === -1) {
      const itemToAdd = { ...formData, costPrice: selectedItem.costPrice, productID: selectedItem.productID };

      // Create a new array with the added item
      const newBillItems = [...billItems, itemToAdd];

      try {
        // Reduce the quantity in the `items` state
        const updatedItems = items.map(item => {
          if (item.productID === selectedItem.productID) {
            return { ...item, quantity: item.quantity - formData.quantity };
          }
          return item;
        });

        setBillItems(newBillItems);
        setItems(updatedItems);
        setFilteredItems(updatedItems.filter(
          (row) =>
            row.displayName.toLowerCase().includes(searchValue) ||
            row.productID.toLowerCase().includes(searchValue)
        ));
      } catch (error) {
        console.error('Error updating item quantity:', error.message);
      }

      setShowModal(false);
    } else {
      message.warning('This item is already added to the bill');
      setShowModal(false);
    }
  };

  //calculate  totlal qnt
  const calculateTotalQuantity = () => { return billItems.reduce((acc, item) => acc + parseInt(item.quantity), 0); };

  //calculate cost of total
  const calculateTotalCost = () => { return billItems.reduce((acc, item) => acc + (item.costPrice*item.quantity), 0);};
  
  
//function for complete the sale
const handleCompleteSale = async () => {
  try {
    const totalQuantity = calculateTotalQuantity();
    const totalCost = calculateTotalCost();
    const calculateProfit = total - totalCost;
    

    // Extract and prepare item details as comma-separated strings
    const itemIds = billItems.map(item => item.productID).join(',');
    const itemNames = billItems.map(item => item.product).join(',');
    const quantities = billItems.map(item => item.quantity).join(',');
    const prices = billItems.map(item => item.price).join(',');
    const discounts = billItems.map(item => item.discount).join(',');

    const data = {
      POSNO: invoiceNo,
      cashirename: cashier,
      datetime: date,
      customername: selectedCustomerName,
      itemcount: totalQuantity,
      Item_IDs: itemIds,
      Item_Names: itemNames,
      Qnt: quantities,
      Prices: prices,
      Discounts: discounts,
      paymentmethod: paymentMethod,
      totalamount: total,
      totalcost: totalCost,
      profit: calculateProfit,
      
    };

    console.log("Attempting to complete sale with data:", data);
    const response = await axios.post("http://localhost:8000/dailysales/add", data);

    if (response.data.success) {
     message.success("Sales complete Successfully...")

      // Increment invoice number by 1 for the next sale
      const nextInvoiceNumber = generateNextInvoiceNumber(invoiceNo);
      setInvoiceNo(nextInvoiceNumber);

      // Clear the bill items
      setBillItems([]);

      // Clear the print contents
      const printContents = document.getElementById('bill_form');
      if (printContents) {
        printContents.innerHTML = '';
      }
    } else {
      message.error("Failed to save data to daily sales. Please try again later.");
      console.log("Failed to add data");
    }
  } catch (error) {
    console.error("Error completing sale and saving data to daily sales:", error);
    message.error("An error occurred while completing the sale. Please try again later.");
  }
};

  
//function for print tha bill
const printAndCompleteSale = async () => {

  if (!selectedCustomerName || !selectedCustomerId) {
    message.warning('Please select or add a customer before complete the bill.');
    return;
  }

  if (billItems.length === 0) {
    message.warning('Please add items to the bill before complete the bill.');
    return;
  }
  //printout the bill
  //handlePrint();
  //store value to the daily sales table 
  await handleCompleteSale();
  //refresh the page
  window.location.reload();
};

//function for suspend sale
const handleSuspendSale = async () => {
  try {

    if (!selectedCustomerName || !selectedCustomerId) {
      message.warning('Please select or add a customer before suspending the bill.');
      return;
    }

    if (billItems.length === 0) {
      message.warning('Please add items to the bill before suspending.');
      return;
    }

    const itemIds =billItems.map(item => item.productID).join(',');
    const itemNames =billItems.map(item => item.product).join(',');
    const quntities = billItems.map(item => item.quantity).join(',');
    const prices = billItems.map(item => item.price).join(',');
    const discounts = billItems.map(item => item.discount).join(',');

    const suspendData ={
      suspend_id:suspendId,
      Cashire_Name: cashier,
      Date:date ,
      customer_id: selectedCustomerId,
      customer_name: selectedCustomerName,
      Item_ID: itemIds,
      Item_Name: itemNames,
      Qnt:quntities,
      Prices: prices,
      Discounts: discounts,
      total: total
    };

    const response = await axios.post("http://localhost:8000/suspendsale/add", suspendData);

    if (response.data.success) {
      message.success("Sale suspended successfully.");

       // Generate next suspend ID and update state
       const nextSuspendId = generateNextSuspendId(suspendId);
       setSuspendId(nextSuspendId);

        // Clear the bill items
        setBillItems([]);
    } else {
      message.error("Failed to suspend sale. Please try again later.");
    }
    
  } catch (error) {
    message.error("An error occurred while suspending the sale. Please try again later.");
  }
  
};

const handlePrint = () => {
  printBill(invoiceNo, cashier, date, paymentMethod, billItems, total, tendered, balance,selectedCustomerName);
};



 //add tendered amount
  const handleConfirmTendered = (tenderedAmount) => {
    setTendered(tenderedAmount);
    setShowTenderedPopup(false);
  };

  //fomat the nummber to 0.00
  const formatNumber = (number) => {
    return parseFloat(number).toFixed(2);
  };

  //handle payment method
  const handleCashRadioChange = () => {
    setShowTenderedPopup(true);
    setPaymentMethod('cash');
  };

  //handle payment method
  const handleBankTransferRadioChange = () => {
    const formattedTotal = formatNumber(total); // Ensure that the total is formatted correctly
    setTendered(parseFloat(formattedTotal)); // Convert the formatted total to a number
    setPaymentMethod('bank');
  };
  

  //search the customer 
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

  //ad customer to the bill
  const handleCustomerItemClick = (customer) => {
    setSelectedCustomerName(customer.name);
    setSelectedCustomerId(customer.cusid);
    setSearchCustomerValue("");
  };

  //add customer form
  const handleAddCustomer = async () => {
    try {
      const customersResponse = await axios.get('http://localhost:8000/customer/');
      const lastCustomerId = customersResponse.data.data.length > 0 ? customersResponse.data.data[customersResponse.data.data.length - 1].cusid : 'cus000';
      const nextCustomerId = generateNextCustomerId(lastCustomerId);
      setNextCustomerId(nextCustomerId);
      setShowForm(true);
    } catch (error) {
      message.error('Error fetching customer data.');
    }
  };

//add customer to the databse
  const handleFormSubmit = async (formData) => {
    try {
      const existingCustomer = customers.find((customer) => customer.cusid === formData.cusid);
      if (existingCustomer) {
        message.error("Customer ID already exists. Please choose a different ID.");
        return;
      }
      const response = await axios.post("http://localhost:8000/customer/add", formData);
      if (response.data.success) {
        message.success(response.data.message);
        setShowForm(false);
        window.location.reload();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form.");
    }
  };

   // Function to handle click on a row to delete
const handleRowClickToDelete = (index) => {
  setDeleteRowIndex(index);
  setShowDeleteConfirmation(true);
};

const handleConfirmDelete = () => {
  if (deleteRowIndex !== null) {
    const itemToRemove = billItems[deleteRowIndex];
    const updatedBillItems = billItems.filter((_, index) => index !== deleteRowIndex);

    // Update inventory in the `items` state
    const updatedItems = items.map(item => {
      if (item.productID === itemToRemove.productID) {
        // Ensure the quantity is updated correctly
        const newQuantity = Number(item.quantity) + Number(itemToRemove.quantity); // Convert to numbers and add
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setBillItems(updatedBillItems);
    setItems(updatedItems);
    setFilteredItems(updatedItems.filter(
      (row) =>
        row.displayName.toLowerCase().includes(searchValue) ||
        row.productID.toLowerCase().includes(searchValue)
    ));
    setShowDeleteConfirmation(false);
    setDeleteRowIndex(null);

    // Optionally show a success message
    message.success('Item deleted successfully');
  }
};


  const handleEditQuantity = async() => {
    if (editRowIndex !== null) {
      const updatedBillItems = [...billItems];
      const oldQuantity = updatedBillItems[editRowIndex].quantity;
      const newQuantity = editQuantity;
      const quantityDifference = newQuantity - oldQuantity;
      updatedBillItems[editRowIndex].quantity = newQuantity;

      // Update inventory in the `items` state
      const updatedItems = items.map(item => {
        if (item.productID === updatedBillItems[editRowIndex].productID) {
          return { ...item, quantity: item.quantity - quantityDifference };
        }
        return item;
      });
      
      setBillItems(updatedBillItems);
      setItems(updatedItems);
      setFilteredItems(updatedItems.filter(
        (row) =>
          row.displayName.toLowerCase().includes(searchValue) ||
          row.productID.toLowerCase().includes(searchValue)
      ));
      setShowEditModal(false);
      setEditRowIndex(null);
      setEditQuantity(0);
    }
  };

  const handleRowClickToEdit = (index) => {
    setEditRowIndex(index);
    setEditQuantity(billItems[index].quantity);
    setShowEditModal(true);
  };

  return (
    <div className='bill_container'>
      <DefaultHandleSales>
        <div className='content'>
          <div className='bill_container'>
            <div>
              <div className='bill_table_container'>
                <input placeholder='Search item' value={searchValue} onChange={filterItem} style={{width:'550px',marginBottom: '10px'}}/>
                <div className='bill_table_wrapper'>
                <table className='bill_table'>
                  <thead>
                    <tr>
                      <th style={{ width: '10px' }}>Item ID</th>
                      <th style={{ width: '150px' }}>Item Name</th>
                      <th style={{ width: '20px' }}>Qnt</th>
                      <th style={{ width: '40px' }}>Price</th>
                      <th style={{ width: '40px' }}> Cost</th>
                      <th style={{ width: '40px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productID}</td>
                        <td>{item.displayName}</td>
                        <td>{item.quantity}</td>
                        <td>{formatNumber(item.sellingPrice)}</td>
                        <td>{formatNumber(item.costPrice)}</td>
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
          </div>
          <div className='print_bill' id='print_bill'>
            <div className='searchcustomer'>
              <input placeholder='Search customer' value={searchCustomerValue} onChange={filterCustomer} style={{marginBottom: '10px'}}/>
              {searchCustomerValue && filteredCustomers.length > 0 && (
                <div className='customer-list'>
                  {filteredCustomers.map((customer, index) => (
                    <div key={index} className='customer-item' onClick={() => handleCustomerItemClick(customer)}>
                      <table>
                        <tbody>
                          <tr>
                            <td className='selectedcustomer'>
                              <span style={{ fontWeight: 'bold' }}>Name: {customer.name}</span><br />
                              <span>Address: {customer.address}</span>
                              <span style={{ marginLeft: '30px' }}>Mobile: {customer.mobile}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='printout'>
              <form className='bill_form' id='bill_form'>
                <div>
                  <p style={{ textAlign: 'center', fontSize: 18, fontStyle: 'oblique' }}>Acconex Computers<br /></p>
                  <p style={{ textAlign: 'center', fontSize: 11 }}>Kaburupitiya, Mathara.<br /> Mob; 0712293447 Tel: 0770897865</p>
                  <hr />
                  <div className="form-row">
                    <div className="print_bill_label">
                      <label style={{ fontSize: 12 }} htmlFor='invoice_no'>Invoice No:</label><br />
                      <label style={{ fontSize: 12 }} htmlFor='cashier'>Cashier:</label><br />
                      <label style={{ fontSize: 12 }} htmlFor='date'>Date:</label>
                    </div>
                    <div className="print_bill_input">
                      <input type='text' style={{ fontSize: 12 }} id='invoice_no' className="input-no-border" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} readOnly /><br />
                      <input type='text' style={{ fontSize: 12 }} id='cashier' className="input-no-border" value={cashier} onChange={(e) => setCashier(e.target.value)} readOnly /><br />
                      <input type='text' style={{ fontSize: 12 }} id='date' className="input-no-border" value={date} onChange={(e) => setDate(e.target.value)} readOnly />
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <table className='print_bill_table'>
                    <thead>
                      <tr>
                        <th style={{ width: '220px' }}>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Dis</th>
                        <th>Amount</th>
                        <th>     </th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item, index) => (
                        <tr >
                          <td>{item.product}</td>
                          <td>{formatNumber(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td>{item.discount}</td>
                          <td>{formatNumber(((item.price * item.quantity) - item.discount))}</td>
                          <td><Link onClick={() => handleRowClickToDelete(index)}>
                              <DeleteFilled />
                            </Link>
                            <Link onClick={() => handleRowClickToEdit(index)}>
                                <EditFilled />
                             </Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <div className="form-row">
                  <div className="print_bill_label">
                    <label style={{ fontSize: 13 }} htmlFor='net_amount'>Net Amount:</label><br />
                    <label style={{ fontSize: 13 }} htmlFor='torent'>Tendered Amount:</label><br />
                    <label style={{ fontSize: 13 }} htmlFor='balance'>Due Amount:</label>
                  </div>
                  <div className="print_bill_input">
                    <input type='float' id='net_amount' className="input-no-border" value={formatNumber(total)} readOnly /><br />
                    <input type='float' id='torent' className="input-no-border" value={formatNumber(tendered)} onChange={(e) => setTendered(formatNumber(e.target.value))} /><br />
                    <input type='float' id='balance' className="input-no-border" value={formatNumber(balance)} readOnly />
                  </div>
                </div>
                <br />
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
                <p style={{ textAlign: 'center' }}>Thank You {selectedCustomerName && `${selectedCustomerName}`}..! Come Again.</p>
              </form>
            </div>
          </div>
          {showTenderedPopup && paymentMethod === 'cash' && (
            <TenderedPopup onClose={() => setShowTenderedPopup(false)} onConfirm={handleConfirmTendered} />
          )}
          {showModal && (
            <BillForm
              handleClose={() => setShowModal(false)}
              handleConfirmAddToBill={handleConfirmAddToBill}
              selectedItem={selectedItem}
              invoiceNo={invoiceNo}
              setInvoiceNo={setInvoiceNo}
              date={date}
              setDate={setDate}
              handleCompleteSale={handleCompleteSale}
              handleSuspendSale ={handleSuspendSale}
            />
          )}
          {showForm && (
            <CustomerForm 
              handleSubmit={handleFormSubmit} 
              handleClose={() => setShowForm(false)} 
              formData={{ cusid: nextCustomerId }} // Pass the next customer ID
            />
          )}
          <div className='bill_btn'>
            <button className='complete_sale' onClick={printAndCompleteSale}>Complete Sell</button>
            <button className='add_customer' onClick={handleAddCustomer}>Add Customer</button>
            <button className='suspend_sale'onClick={handleSuspendSale}>Suspend Sale</button>
            
          </div>
        </div>
        <Modal
              title='Confirm Remove'
              visible={showDeleteConfirmation}
              onOk={handleConfirmDelete}
              onCancel={() => setShowDeleteConfirmation(false)}
              
              >
              <p>Are you sure you want to remove this item?</p>
            </Modal>
              <Modal
              visible={showEditModal}
              onCancel={() => setShowEditModal(false)}
              onOk={handleEditQuantity}
              title="Edit Quantity?"
            >
  <div>
    <label>Quantity:</label>
    <input type='number' value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} />
  </div>
</Modal>

      </DefaultHandleSales>
   
    </div>
  );
}

export default Bill;