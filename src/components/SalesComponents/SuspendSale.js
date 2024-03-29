import React from 'react';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/customer.css';

const SuspendSale = () => (
  <DefaultHandleSales>
    <div className="container">
      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Customer_ID</th>
              <th>Customer_name</th>
              <th>Suspend_ID</th>
              <th>Bill_No</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </DefaultHandleSales>
);

export default SuspendSale;
