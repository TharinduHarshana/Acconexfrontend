// TenderedPopup.js

import React, { useState } from 'react';

const TenderedPopup = ({ onClose, onConfirm }) => {
  const [tenderedValue, setTenderedValue] = useState('');

  const handleConfirm = () => {
    // Validate the tendered value here if needed
    onConfirm(tenderedValue);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h6>Enter Tendered Amount</h6>
        <input type="text" value={tenderedValue} onChange={(e) => setTenderedValue(e.target.value)} />
        <div className='popupbtn'><br/>
          <button  className ='popupbtnok' onClick={handleConfirm}>OK</button>
          <button  className ='popupbtnclose' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TenderedPopup;
