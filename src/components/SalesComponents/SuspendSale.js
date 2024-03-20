import React from 'react';
import {  Table } from 'antd';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sales.css';


const columns = [
  {
    title: 'Customer_ID',
    dataIndex: 'CusID',
    key: 'CusID',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Customer_Name',
    dataIndex: 'cusname',
    key: 'cusname',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Item_Id',
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
    title: 'price',
    dataIndex: 'itprice',
    key: 'itprice',
  },
];

const data = [
  {
    key: '1',
    CusID:'Cus002',
    cusname:'Hiru',
    ITID: 'Item001',
    Qnt: 2,
    itprice: 'RS: 1200/=',
  },
];

const SuspendSale = () => (
  <DefaultHandleSales>
    <Table className ='table'columns={columns} dataSource={data} />
  </DefaultHandleSales>
);

export default SuspendSale;
