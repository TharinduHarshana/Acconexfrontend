// TenderedPopup.js

import React, { useState } from 'react';
import '../../../styles/bill.css'

const TenderedPopup = ({ onClose, onConfirm }) => {
  const [tenderedValue, setTenderedValue] = useState('');

  const handleConfirm = () => {
    // Validate the tendered value here if needed
    onConfirm(tenderedValue);
    onClose();
  };

  return (
    <div className="sales_popup">
      <div className="popup-inner">
        <h6>Enter Tendered Amount</h6>
        <input type="text" value={tenderedValue} onChange={(e) => setTenderedValue(e.target.value)} />
        <div className='sales_popupbtn'><br/>
          <button  className ='sales_popupbtnok' onClick={handleConfirm}>OK</button>
          <button  className ='sales_popupbtnclose' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TenderedPopup;
