import React, { useState, useEffect } from 'react';
import '../../styles/customer.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';
import CustomerForm from './customerForm'; // Assuming the file is named CustomerForm.js
import { Input } from 'antd';
import DefaultHandle from '../DefaultHandle';

axios.defaults.baseURL = "http://localhost:8000/customer";

function Customer() {
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        cusid: "",
        name: "",
        address: "",
        mobile: ""
    });
    const [formDataEdit, setFormDataEdit] = useState({
        cusid: "",
        name: "",
        address: "",
        mobile: ""
    });
    const [dataList, setDataList] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Fetch data from the backend
    const getFetchData = async () => {
        try {
            const response = await axios.get('/');
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    // Delete customer
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');
        if (confirmed) {
            try {
                const response = await axios.delete('/delete/' + id);
                if (response.data.success) {
                    getFetchData();
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    // Update customer details
    const handleUpdate = async () => {
        try {
            const response = await axios.patch('/update/' + formDataEdit.cusid, formDataEdit);
            if (response.data.success) {
                getFetchData();
                alert(response.data.message);
                setEditSection(false);
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleEditOnChange = (e) => {
        const { value, name } = e.target;
        setFormDataEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (el) => {
        setFormDataEdit(el);
        setEditSection(true);
    };

    // Add new customer 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if customer ID already exists
            const existingCustomer = dataList.find(customer => customer.cusid === formData.cusid);
            if (existingCustomer) {
                alert('Customer with this ID already exists');
                return;
            }

            const response = await axios.post('/add', formData);
            if (response.data.success) {
                setFormData({
                    cusid: "",
                    name: "",
                    address: "",
                    mobile: ""
                });
                setAddSection(false);
                getFetchData();
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    // Filter customer details
    const filteredDataList = dataList.filter(
        (row) => row.name.toLowerCase().includes(searchValue.toLowerCase()) || row.cusid.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <DefaultHandle>
            <div className="container">
                <Input className='inboxserch' placeholder={'Enter the Customer ID or Name'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <button className='btn btn_add' onClick={() => setAddSection(true)}>Add Customer</button>
                {addSection && <CustomerForm
                    handleSubmit={handleSubmit}
                    handleOnChange={handleOnChange}
                    handleClose={() => setAddSection(false)}
                    formData={formData}
                />}
                {editSection && <CustomerForm
                    handleSubmit={handleUpdate}
                    handleOnChange={handleEditOnChange}
                    handleClose={() => setEditSection(false)}
                    formData={formDataEdit}
                    editing={true}
                />}
                <div className='tableContainer' style={{ maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
                    <table>
                        <thead style={{ position: 'sticky', top: -1 }}>
                            <tr>
                                <th>Customer_ID</th>
                                <th>Customer_Name</th>
                                <th>Customer_Address</th>
                                <th>Contact_NO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{ overflowY: 'auto', maxHeight: 'calc(100% - 40px)' }}>
                            {filteredDataList.map((el) => (
                                <tr key={el.cusid}>
                                    <td>{el.cusid}</td>
                                    <td>{el.name}</td>
                                    <td>{el.address}</td>
                                    <td>{el.mobile}</td>
                                    <td>
                                        <button className='btn btn-edit' onClick={() => handleEdit(el)}><EditFilled /></button>
                                        <button className='btn btn-delete' onClick={() => handleDelete(el.cusid)}><DeleteFilled /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultHandle>
    );
}

export default Customer;
