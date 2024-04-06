import React from 'react';
import { Input, Button, Flex} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sales.css';
import '../../styles/customer.css';
import { PauseOutlined,CloseOutlined ,UserAddOutlined,ShoppingCartOutlined,MinusCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Bill = () => (
  <div className='maindiv'>
  <DefaultHandleSales>
    <div className='serchdiv'>
        <Input className='inboxserch' placeholder=' Enter the Item Name or Id' />
        <Button className='seachbtn' icon={<SearchOutlined />}>Search</Button>
        </div>
       
        <div className='bill_view'>
          <div className='bill_tableContainer'style={{ maxHeight: '400px', overflowY: 'auto',position:'relative' }}>
            <table>
              <thead  style={{position:'sticky',top:0}}>
                <tr>
                  <th>Item_ID</th>
                  <th>Item_name</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{overflowY:'auto',maxHeight:'calc(100%-40px)'}}>        
                 <tr >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <Button><ShoppingCartOutlined /></Button>
                      <Button><MinusCircleOutlined /></Button>
                    </td>
                  </tr>     
                </tbody>
            </table>
          </div>
          <div  className='bill_FormContainer'>
              <form >
              <div className='bill_btn'>
              <button className='add_cus_btn'><Link to ='/addcus'>Add_Customer<UserAddOutlined /></Link></button>
              <button className='puase_btn'>Suspend Sale<PauseOutlined /></button>
              <button className='cancel_btn'>Cancel Sale<CloseOutlined /></button>
              <hr className='linebrake'/>
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
