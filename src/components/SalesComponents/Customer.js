import React, { useState, useEffect } from 'react';
import '../../styles/customer.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';
import CustomerForm from './customerForm'; // Assuming the file is named CustomerForm.js
import DefaultHandleSales from './DefaultHandleSales';
import '../../styles/sidebar.css';

axios.defaults.baseURL = "http://localhost:8000/sales";

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

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/add', formData);
            if (response.data.success) {
                setAddSection(false);
                getFetchData(); 
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

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

    const handleUpdate = async () => {
        try {
            const response = await axios.patch('/update/' + formDataEdit.cusid, formDataEdit);
            if (response.data.success) {
                getFetchData();
                alert(response.data.message);
                setEditSection(false); // Close the edit section after successful update
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

    return (
        <DefaultHandleSales>
        <div className="container">
            <button className='btn btn_add' onClick={() => setAddSection(true)}>Add Customer</button>
            {addSection && <CustomerForm 
                    handleSubmit={handleSubmit} 
                    handleOnChange={handleOnChange} 
                    handleClose={() => setAddSection(false)}
                    rest={formData} 
                    />}
            {editSection && <CustomerForm
                     handleSubmit={handleUpdate} 
                     handleOnChange={handleEditOnChange} 
                     handleClose={() => setEditSection(false)}
                     rest={formDataEdit}
                     />}
            <div className='tableContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>Customer_ID</th>
                            <th>Customer_Name</th>
                            <th>Customer_Address</th>
                            <th>Contact_NO</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((el) => (
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
        </DefaultHandleSales>
    );
}

export default Customer;
