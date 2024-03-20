import React from 'react';
import { Button, Table } from 'antd';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sales.css';

const columns = [
  {
    title: 'Customer ID',
    dataIndex: 'CusID',
    key: 'CusID',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Customer Name',
    dataIndex: 'cusname',
    key: 'cusname',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Item ID',
    dataIndex: 'ITID',
    key: 'ITID',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'Qnt',
    key: 'Qnt',
  },
  {
    title: 'Price',
    dataIndex: 'itprice',
    key: 'itprice',
  },
];

const data = [
  {
    key: '1',
    CusID: 'Cus002',
    cusname: 'Hiru',
    ITID: 'Item001',
    Qnt: 2,
    itprice: 'RS: 1200/=',
  },
  // Add more data objects if needed
];

const SuspendSale = () => (
  <DefaultHandleSales>
    
    <Table className='table' columns={columns} dataSource={data} />
    <div className="button-container">
      <Button className="update-btn">Update</Button>
      <Button className="ok-btn">Ok</Button>
    </div>
  </DefaultHandleSales>
);

export default SuspendSale;
