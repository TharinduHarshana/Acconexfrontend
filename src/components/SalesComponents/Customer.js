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

    // Function to handle changes in the add customer form fields
    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission for adding a new customer
   // Function to handle form submission for adding a new customer
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Check if cusid already exists
        const existingCustomer = dataList.find(customer => customer.cusid === formData.cusid);
        if (existingCustomer) {
            alert('Customer with this ID already exists');
            return; // Stop further execution
        }

        // If cusid doesn't exist, proceed with adding the customer
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


    // Function to fetch customer data
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

    // Function to handle deletion of a customer
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
    
    // Function to handle updating a customer
    const handleUpdate = async () => {
        try {
            const existingCustomer = dataList.find(customer => customer.cusid === formDataEdit.cusid);
            if (existingCustomer) {
                alert('Customer with this ID already exists');
                return; // Stop further execution
            }
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
    

    // Function to handle changes in the edit customer form fields
    const handleEditOnChange = (e) => {
        const { value, name } = e.target;
        setFormDataEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle editing a customer
    const handleEdit = (el) => {
        setFormDataEdit(el);
        setEditSection(true);
    };

    return (
        <DefaultHandleSales>
            <div className="container">
                {/* Button to toggle add customer form */}
                <button className='btn btn_add' onClick={() => setAddSection(true)}>Add Customer</button>
                {/* Render add customer form if addSection is true */}
                {addSection && 
                <CustomerForm 
                        handleSubmit={handleSubmit} 
                        handleOnChange={handleOnChange} 
                        handleClose={() => setAddSection(false)}
                        formData={formData} 
                        />}
                {/* Render edit customer form if editSection is true */}
                {editSection && 
                <CustomerForm
                        handleSubmit={handleUpdate} 
                        handleOnChange={handleEditOnChange} 
                        handleClose={() => setEditSection(false)}
                        formData={formDataEdit}
                        />
                        }
                {/* Table to display customer data */}
                <div className='tableContainer' style={{ maxHeight: '400px', overflowY: 'auto',position:'relative' }}>
                    <table >
                        <thead style={{position:'sticky',top:0}}>
                            <tr>
                                <th>Customer_ID</th>
                                <th>Customer_Name</th>
                                <th>Customer_Address</th>
                                <th>Contact_NO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{overflowY:'auto',maxHeight:'calc(100%-40px)'}}>
                            {/* Map over dataList to render each customer */}
                            {dataList.map((el) => (
                                <tr key={el.cusid}>
                                    <td>{el.cusid}</td>
                                    <td>{el.name}</td>
                                    <td>{el.address}</td>
                                    <td>{el.mobile}</td>
                                    <td>
                                        {/* Button to edit customer */}
                                        <button className='btn btn-edit' onClick={() => handleEdit(el)}><EditFilled /></button>
                                        {/* Button to delete customer */}
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
