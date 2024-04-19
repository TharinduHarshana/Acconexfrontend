import React from 'react'

import '../../styles/customer.css';
import DefaultHandleSales from './DefaultHandleSales';

function Daily_sales() {
  return (
  <DefaultHandleSales>
    <div className="container">
    <div className='daily_sale_tableContainer'>
            <table>
            <thead>
                <tr>
                <th>POS NO</th>
                <th>Totay Total Sale</th>
                <th>Total Sale Amount</th>
                <th>Profit</th>
                <th>Loss</th>
                </tr>
            </thead>
            <tbody>
                <tr>
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
  )
}

export default Daily_sales;