import React, { useState } from 'react';
import { Button, Space, Table, Modal } from 'antd';
import '../styles/sales.css';
import DefaultHandleSales from '../components/SalesComponents/DefaultHandleSales';
import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ViewCustomer = () => {
  const [tableEnabled, setTableEnabled] = useState(false); // State variable to manage table enable/disable state
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Doe',
      age: 30,
      address: 'New York',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 25,
      address: 'Los Angeles',
    },
  ]);

  const handleUpdate = () => {
    setTableEnabled(true); // Enable the table when Update button is clicked
  };

  const handleDelete = (record) => {
    confirm({
      title: 'Are you sure you want to delete this record?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setDataSource(prevDataSource => {
          const updatedDataSource = prevDataSource.filter(item => item.key !== record.key);
          return updatedDataSource;
        });
      },
      onCancel() {
        console.log('Delete operation canceled');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'addresscoloum',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record)}> <DeleteFilled /></a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // Handle row selection if needed
    },
    hideDefaultSelections: true, // Hide the default row selection checkboxes
    getCheckboxProps: () => ({
      disabled: !tableEnabled, // Disable checkboxes when table is not enabled
    }),
  };

  return (
    <DefaultHandleSales>
      <div className='table_content'>
        <Table
          className='viewtable'
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection} // Enable row selection
        />
      </div>
      <div className='viewbutton-container'>
        <Button className='update-btn' onClick={handleUpdate}>Update</Button>
        <Button className='ok-btn'>Ok</Button>
      </div>
    </DefaultHandleSales>
  );
};

export default ViewCustomer;
