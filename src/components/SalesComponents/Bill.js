import React from 'react';
import { Input, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sales.css';
import '../../styles/customer.css';

const Bill = () => (
  <div className='maindiv'>
  <DefaultHandleSales>
    <div className='serchdiv'>
        <Input className='inboxserch' placeholder=' Enter the Item Name or Id' />
        <Button className='seachbtn' icon={<SearchOutlined />}>Search</Button>
        </div>
        <div className="bill_container" >
        <div className='bill_view'>
          <div className='bill_tableContainer'>
            <table>
              <thead>
                <tr>
                  <th>Item_ID</th>
                  <th>Item_name</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div  className='bill_FormContainer'>
            <table>
              <thead>
                <tr>
                  <th>Item_ID</th>
                  <th>Item_name</th>
                  <th>Quantity</th>
                  
                </tr>
              </thead>
            </table>
            </div>
          </div>
        </div>

       
  </DefaultHandleSales>
  </div>
);

export default Bill;
