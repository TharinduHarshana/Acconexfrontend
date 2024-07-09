import React, { useState, useEffect } from 'react';
import DefaultHandle from '../components/DefaultHandle';
import axios from 'axios';

const AdminDashboard = () => {
    const [categoryCount, setCategoryCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        getCountCategory();
    }, []);

    useEffect(() => {
        getCountCustomer();
    }
    , []);
    useEffect(() => {
        getItemCount();
    }, []);


    const getCountCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/category/count');
            setCategoryCount(response.data.data); 
        } catch (error) {
            console.error('Error fetching category count:', error);
        }
    };

    const getCountCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:8000/customer/count');
            setCustomerCount(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching customer count:', error);
        }
    };

    const getItemCount = async () => {
        try {
            const response = await axios.get('http://localhost:8000/item/count/');
            setItemCount(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching item count:', error);
        }
    };

    return (
        <DefaultHandle>
            <div>
                <h1>Admin Dashboard</h1>
                {/* Ensure categoryCount is a number before rendering */}
                <h2>Category Count: {typeof categoryCount === 'number' ? categoryCount : 'Loading...'}</h2>
                <h3>Customer Count: {typeof customerCount === 'number'? customerCount : 'Loading...'}</h3>
                <h4>Item Count: {typeof itemCount === 'number' ? itemCount : 'Loading...'}</h4>

            </div>
        </DefaultHandle>
    );
};

export default AdminDashboard;
