
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
import {EditFilled ,DeleteFilled,UserAddOutlined ,CheckCircleOutlined ,PauseCircleOutlined  ,CloseCircleOutlined} from '@ant-design/icons';



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
  const [disc , setDisc] = useState(0);
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
          axios.get('https://acconex-backend.vercel.app/item/'),
          axios.get('https://acconex-backend.vercel.app/customer/'),
          axios.get('https://acconex-backend.vercel.app/dailysales/'),
          axios.get('https://acconex-backend.vercel.app/suspendsale/')
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
    if (tendered !== '' ) {
      const enteredAmount = parseFloat(tendered);
      const discount = parseFloat(disc);
      
      const discountAmount = (calculatedTotal * discount  ) / 100;
      const totalAfterDiscount = calculatedTotal - discountAmount;

      const calculateBalance = enteredAmount - totalAfterDiscount;
      setBalance(calculateBalance);
    }
  }, [billItems, tendered,invoiceNo,disc]);

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
    if(item.quantity===0)
    {
      message.error("Out of Stock Cannot and this Item..")
    }
    else{
      setShowModal(true);
    } 
  };

  const handleConfirmAddToBill = async (formData) => {
    const existingItemIndex = billItems.findIndex(existingItem => existingItem.productID === selectedItem.productID);
  
    if (existingItemIndex === -1) {
      const itemToAdd = { ...formData, costPrice: selectedItem.costPrice, productID: selectedItem.productID };
  
      try {
        // Make API call to reduce quantity in the database
        const response = await axios.patch(`https://acconex-backend.vercel.app/item/update/${selectedItem._id}`, {
          
        });
  
        if (response.data.success) {
          // Update frontend state only if API call is successful
          const updatedItems = items.map(item => {
            if (item.productID === selectedItem.productID) {
              const newQuantity = item.quantity - formData.quantity;
              // Check the quantity and show warning message if necessary
              if (newQuantity <= 2) {
                message.warning("This item is in Low Stock...");
              }
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
  
          // Update billItems and items state
          setBillItems([...billItems, itemToAdd]);
          setItems(updatedItems);
  
          // Optionally update filteredItems state if needed
          setFilteredItems(updatedItems.filter(
            (row) =>
              row.displayName.toLowerCase().includes(searchValue) ||
              row.productID.toLowerCase().includes(searchValue)
          ));
  
          // Show success message
          message.success('Item quantity updated successfully.');
        } else {
          throw new Error('Failed to update item quantity in the database.');
        }
  
      } catch (error) {
        console.error('Error updating item quantity:', error.message);
        message.error('Failed to update item quantity. Please try again.');
      }
    } else {
      // Item already exists, show warning or handle as needed
      message.warning("This item is already added to the bill.");
    }
  
    setShowModal(false);
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

    // Extract and prepare item details
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

    // Save sale data
    const response = await axios.post("https://acconex-backend.vercel.app/dailysales/add", data);

    if (response.data.success) {
      console.log("Sales data saved successfully");

      // Prepare requests to update item quantities
      const updateRequests = billItems.map(async (item) => {
        if (item.productID) {
          try {
            // Fetch current quantity from the backend
            const getItemResponse = await axios.get(`https://acconex-backend.vercel.app/item/get/${item.productID}`);
            if (getItemResponse.data.success) {
              const currentQuantity = Number(getItemResponse.data.data.quantity);
              const reductionAmount = Number(item.quantity);
              const newQuantity = currentQuantity - reductionAmount;

              console.log(`Updating item with product ID: ${item.productID}, reducing quantity by: ${reductionAmount}, new quantity in backend: ${newQuantity}`);

              // Send request to update the quantity in the backend
              return axios.patch(`https://acconex-backend.vercel.app/item/update/productID/${item.productID}`, {
                quantity: newQuantity // Ensure this is the reduced quantity
              });
            } else {
              console.warn(`Failed to fetch current quantity for item with product ID: ${item.productID}`);
            }
          } catch (error) {
            console.error(`Error fetching item with product ID: ${item.productID}:`, error);
          }
        } else {
          console.warn(`Skipping update for item with undefined productID. Item details:`, item);
          return Promise.resolve(); // Skip if productID is undefined
        }
      });

      // Send all update requests concurrently
      await Promise.all(updateRequests);

      message.success("Sales completed and inventory updated successfully.");

      // Increment invoice number by 1 for the next sale
      const nextInvoiceNumber = generateNextInvoiceNumber(invoiceNo);
      setInvoiceNo(nextInvoiceNumber);

      // Clear the bill items
      setBillItems([]);
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
  handlePrint();
  await handleCompleteSale();

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

    const response = await axios.post("https://acconex-backend.vercel.app/suspendsale/add", suspendData);

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
  printBill(invoiceNo, cashier, date, paymentMethod, billItems, total, tendered, balance,selectedCustomerName,disc);
};

 //add tendered amount
 const handleConfirmTendered = ({ tenderedAmount, discountAmount }) => {
  const parsedTenderedAmount = parseFloat(tenderedAmount);
  
  // Parse and format discount amount as a percentage
  const formattedDiscountAmount = discountAmount ? `${parseFloat(discountAmount).toFixed(0)}%` : '0%';
  setTendered(parsedTenderedAmount);
  setDisc(formattedDiscountAmount);
  setShowTenderedPopup(false);
};

  //fomat the nummber to 0.00
  const formatNumber = (number) => {
    return parseFloat(number).toFixed(2);
  };

  //handle payment method
  const handleCashChange = () => {
    setShowTenderedPopup(true);
    setPaymentMethod('cash');
  };

  //handle payment method
  const handleBankTransferChange = () => {
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
      const customersResponse = await axios.get('https://acconex-backend.vercel.app/customer/');
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
      const response = await axios.post("https://acconex-backend.vercel.app/customer/add", formData);
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

//edit quantity after added to the bill
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
  
 //cancel sale
 const handleCancelSale = () => {
  if (billItems.length === 0) {
      message.warning('There are no items in the bill to cancel.');
      return;
  }

  // Validate billItems before processing
  const invalidItems = billItems.filter(item => !item.productID);
  if (invalidItems.length > 0) {
      console.error("Invalid items without productID found:", invalidItems);
      message.error('Some items in the bill are missing their product IDs.');
      return;
  }

  // Create a map for quick lookup of quantities to add back
  const quantityToAddBack = billItems.reduce((acc, item) => {
      if (item.productID) {
          const quantity = Number(item.quantity);
          acc[item.productID] = (acc[item.productID] || 0) + quantity;
      }
      return acc;
  }, {});

  console.log('Quantity to Add Back:', quantityToAddBack);

  // Update inventory quantities back
  setItems(prevItems => {
      const updatedItems = prevItems.map(item => {
          const quantityToAdd = quantityToAddBack[item.productID];
          if (quantityToAdd) {
              const newQuantity = Number(item.quantity) + quantityToAdd;
              console.log(`Updating ${item.productID}: old quantity = ${item.quantity}, add back = ${quantityToAdd}, new quantity = ${newQuantity}`);
              return { ...item, quantity: newQuantity };
          }
          return item;
      });

      // After updating inventory, set the new filtered items
      setFilteredItems(updatedItems.filter(
        (row) =>
          row.displayName.toLowerCase().includes(searchValue) ||
          row.productID.toLowerCase().includes(searchValue)
      ));

      return updatedItems;
  });

  // Clear bill items and reset related state
  setBillItems([]);
  setSelectedCustomerName('');
  setSelectedCustomerId('');
  setTendered(0);
  setDisc(0);
  setBalance(0);
};



  return (
    <div className='sales_bill_container'>
      <DefaultHandleSales>
        <div  className='sales_content' style={{marginLeft:'10px',marginTop:'-25px'}}>
          <div className='sales_bill_container'>
            <div>
              <div className='sales_bill_table_container'>
                <input placeholder='Search item' value={searchValue} onChange={filterItem} style={{width:'570px',marginBottom: '10px', marginLeft:'10px'}}/>
                <div className='sales_bill_table_wrapper'>
                <table 
                className='sales_bill_table'>
                  <thead>
                    <tr>
                      <th style={{ width: '10px' }}>Item ID</th>
                      <th style={{ width: '130px' }}>Item Name</th>
                      <th style={{ width: '20px' }}>Qnt</th>
                      <th style={{ width: '40px' }}>Price (LKR)</th>
                      <th style={{ width: '40px' }}> Cost (LKR)</th>
                      <th style={{ width: '60px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{border:'1px solid balck'}}>
                    {filteredItems.map((item, index) => (
                      <tr style={{border:'1px solid balck'}} key={index}>
                        <td style={{border:'1px solid balck'}}>{item.productID}</td>
                        <td>{item.displayName}</td>
                        <td>{item.quantity}</td>
                        <td>{formatNumber(item.sellingPrice)}</td>
                        <td>{formatNumber(item.costPrice)}</td>
                        <td>
                          <button style={{width:'50px',padding:'2px 1px',fontSize:'11px'}} onClick={() => handleChange(item)}>Add to Bill</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
          <div className='sales_print_bill' id='sales_print_bill' style={{marginLeft:'-15px'}}>
            <div className='sales_searchcustomer'>
              <input placeholder='Search customer' value={searchCustomerValue} onChange={filterCustomer} style={{marginBottom: '20px'}}/>
              {searchCustomerValue && filteredCustomers.length > 0 && (
                <div className='sales_customer-list'>
                  {filteredCustomers.map((customer, index) => (
                    <div key={index} className='customer-item' onClick={() => handleCustomerItemClick(customer)}>
                      <table>
                        <tbody>
                          <tr>
                            <td className='sales_selectedcustomer'>
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
            <div className='sales_printout'>
              <form className='sales_bill_form' id='bill_form'style={{height:'800px'}}>
                <hr/>
                <div>
                  <table className='sales_print_bill_table'>
                    <thead>
                      <tr>
                        <th style={{ width: '180px', fontSize:'11'}}>Product</th>
                        <th>Price (LKR)</th>
                        <th  style={{ width: '10px' ,padding:'2px 2px 2px',textAlign:'center'}}>Qty</th>
                        <th>Dis(LKR)</th>
                        <th>Amount (LKR)</th>
                        <th style={{width:'30px'}}>     </th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item, index) => (
                        <tr >
                          <td>{item.product}</td>
                          <td>{formatNumber(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td style={{textAlign:'center'}}>{item.discount}</td>
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
                <div className="sales_form-row">
                  <div className="print_bill_label">
                    <label style={{ fontSize: 13 }} htmlFor='net_amount'>Net Amount:</label><br />  
                    <label style={{ fontSize: 13 }} htmlFor='torent'>Tendered Amount:</label><br />
                    <label style={{ fontSize: 13 }} htmlFor="discount">Discount:</label><br />
                    <label style={{ fontSize: 13 }} htmlFor='balance'>Due Amount:</label>
                  </div>
                  <div className="print_bill_input">
                    <input style={{ fontSize: 13 }} type='float' id='net_amount' className="input-no-border" value={formatNumber(total)} readOnly /><br />
                    <input style={{ fontSize: 13 }} type='float' id='torent' className="input-no-border" value={formatNumber(tendered)} readOnly onChange={(e) => setTendered(formatNumber(e.target.value))} /><br />
                    <input style={{ fontSize: 13 }} type="float" id="discount" className="input-no-border" readOnly value={disc} onChange={(e) => setDisc(e.target.value)}/><br />
                    <input style={{ fontSize: 13 }} type='float' id='balance' className="input-no-border" value={formatNumber(balance)} readOnly />
                  </div>
                </div>
                <br />
                <div className='sales_payment-method-container'>
                  <div className="payment-method">
                    <button type='button' name='paymentMethod' id='cash' onClick={handleCashChange}>Cash</button>
  
                  </div>
                  <div className="payment-method">
                    <button type='button' name='paymentMethod' id='bank' onClick={handleBankTransferChange}>Bank Transfer</button>
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
          <div className='sales_bill_btn'>
            <button className='sales_add_customer' onClick={handleAddCustomer}><UserAddOutlined/><br/>Add customer</button>
            <button className='sales_suspend_sale'onClick={handleSuspendSale}><PauseCircleOutlined /><br/>Suspend Sale</button>
            <button className='sales_complete_sale' onClick={printAndCompleteSale}><CheckCircleOutlined /> <br/>Complete sale</button>
            <button className='sales_cancel_btn'onClick={handleCancelSale}><CloseCircleOutlined /><br/>Cancel Sale</button>
            
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
