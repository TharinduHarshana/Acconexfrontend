import React from 'react';
import { Input, Button, Flex} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sales.css';
import '../../styles/customer.css';
import { PauseOutlined,CloseOutlined ,UserAddOutlined} from '@ant-design/icons';


const Bill = () => (
  <div className='maindiv'>
  <DefaultHandleSales>
    <div className='serchdiv'>
        <Input className='inboxserch' placeholder=' Enter the Item Name or Id' />
        <Button className='seachbtn' icon={<SearchOutlined />}>Search</Button>
        </div>
       
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
              <tbody>        
                 <tr >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                          
                </tbody>
            </table>
          </div>
          <div  className='bill_FormContainer'>
              <form >
              <div >
              <button className='add_cus_btn'>Add_Customer<UserAddOutlined /></button>
              <button className='puase_btn'>Suspend Sale<PauseOutlined /></button>
              <button className='cancel_btn'>Cancel Sale<CloseOutlined /></button>
              <hr/>
                <h1>Thank You</h1>
                </div>
                <div className='bill_content'>
                <label htmlFor='cusid'>Discount  :
                <input type='text' id='cusid' name='cusid' /></label>
                <br/>
                <label htmlFor='name'>Customer Name :
                <input type='text' id='name' name='name'  /></label>
                <hr></hr>
                </div>
                
              <div className='amount' style={{display:'flex'}}>
              
                  <div className='tot_amaount'>
                    <label htmlFor='mobile'>Total :</label><br></br>
                  <input type='tel' id='mobile' name='mobile'  />
                  </div>
                  <div className='due_amount' >
                  <label htmlFor='mobile'>Amount Due :</label><br></br>
                  <input type='tel' id='mobile' name='mobile'    />
                  </div>
               </div>
            <button className='btn'>Submit</button>
          </form>
            </div>
          </div>
        

       
  </DefaultHandleSales>
  </div>
);

export default Bill;
