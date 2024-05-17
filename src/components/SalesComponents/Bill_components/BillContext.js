// BillContext.js
import React, { createContext, useContext, useState } from 'react';

const BillContext = createContext();

export const useBillContext = () => useContext(BillContext);

export const BillProvider = ({ children }) => {
  const [billItems, setBillItems] = useState([]);

  const handleRestoreItem = (itemNames, quantities) => {
    const restoredItems = itemNames.map((name, index) => ({
      product: name,
      quantity: quantities[index]
    }));
    setBillItems([...billItems, ...restoredItems]);
  };

  return (
    <BillContext.Provider value={{ billItems, handleRestoreItem }}>
      {children}
    </BillContext.Provider>
  );
};
