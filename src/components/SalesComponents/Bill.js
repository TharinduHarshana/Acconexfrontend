import React from 'react';
import { Input, Button, Flex, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sales.css';

const columns = [
  {
    title: 'Item_Code',
    dataIndex: 'itemcode',
    key: 'itemcode',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Item_Name',
    dataIndex: 'itemname',
    key: 'itemname',
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
    itemcode: 'Item001',
    itemname: 'Apple headset',
    Qnt: 2,
    itprice: 'RS: 1200/=',
  },
];

const Bill = () => (
  <DefaultHandleSales>
    <Flex gap="small" vertical>
      <Flex wrap="wrap" gap="small">
        <Input className='inboxserch' placeholder=' Enter the Item Name or Id' />
        <Button className='seachbtn' icon={<SearchOutlined />}>Search</Button>
      </Flex>
    </Flex>
    <Table className ='table'columns={columns} dataSource={data} />
  </DefaultHandleSales>
);

export default Bill;
