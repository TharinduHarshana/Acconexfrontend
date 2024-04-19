import React from 'react';
import '../../styles/customer.css';
import DefaultHandleSales from './DefaultHandleSales';

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
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </DefaultHandleSales>
);

export default SuspendSale;
