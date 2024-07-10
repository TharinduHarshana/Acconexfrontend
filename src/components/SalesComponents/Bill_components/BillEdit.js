import React, { useState } from 'react';

const BillEdit = ({ onClose, onConfirm }) => {
  const [editedValue, setEditedValue] = useState('');

  const handleConfirm = () => {
    // Validate the edited value here if needed
    onConfirm(editedValue);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h6>Enter quantity</h6>
        <input 
          type="text" 
          value={editedValue} 
          onChange={(e) => setEditedValue(e.target.value)} 
        />
        <div className='popupbtn'>
          <br />
          <button className='popupbtnok' onClick={handleConfirm}>Set</button>
          <button className='popupbtnclose' onClick={onClose}>Set default</button>
        </div>
      </div>
    </div>
  );
};

export default BillEdit;
