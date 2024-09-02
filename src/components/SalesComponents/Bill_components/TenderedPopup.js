// TenderedPopup.js

import React, { useState } from 'react';
import '../../../styles/bill.css';
import { message } from 'antd';

const TenderedPopup = ({ onClose, onConfirm }) => {
  const [tenderedValue, setTenderedValue] = useState('');
  const [discValue, setDiscValue] = useState('');

  const handleempty = () => {
    if (tenderedValue.trim() === '') {
      message.error('Please enter a valid amount.');
      return true; // Return true if the value is empty or invalid
    }
    return false; // Return false if the value is valid
  };

  const handleConfirm = () => {
    // Check if the input is empty or invalid
    if (!handleempty()) {
      onConfirm({
        tenderedAmount: tenderedValue,
        discountAmount: discValue
      });
      onClose();
    } else {
      message.error('Invalid amount');
    }
  };


  return (
    <div className="sales_popup">
      <div className="popup-inner">
        <h6>Enter Tendered Amount</h6>
        <input type="text" value={tenderedValue} onChange={(e) => setTenderedValue(e.target.value)} />
        <h6>Enter Discount Amount</h6>
        <input type="text" value={discValue} onChange={(e) => setDiscValue(e.target.value)} />
        <div className='sales_popupbtn'><br />
          <button className='sales_popupbtnok' onClick={handleConfirm}>OK</button>
          <button className='sales_popupbtnclose' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TenderedPopup;
