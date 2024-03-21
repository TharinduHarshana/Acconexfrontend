import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import DefaultHandleInventory from './DefaultHandlerInventory';


const AddNewItem = () =>{

    const[displayName, setDisplayName] = useState('');
    const[itemName, setItemName] = useState('');
    const[productID, setProductID] = useState('');
    const[quantity, setQuantity] = useState('');
    const[costPrice, setCostPrice] = useState('');
    const[sellingPrice, setSellingPrice] = useState('');
    const[fixedPrice, setFixedPrice] = useState('');
    const [itemSerial, setItemSerial] = useState('');
    const[supplierID, setSupplierID] = useState('');
    const[category, setCategory] = useState('');
    const[warranty, setWarranty] = useState('');

    //add item to DB

    function subData(e){
        e.preventDefault();
        if(displayName ==='' || itemName === ''|| productID ===''|| quantity ===''|| costPrice ===''|| sellingPrice ===''|| supplierID ===''|| category ===''|| warranty ===''){
            Swal.fire({
                icon:'error',
                text: 'Enter all data'
            })
            return;
        }
        const newItem ={
            displayName, 
            itemName, 
            productID, 
            quantity, 
            costPrice, 
            sellingPrice,
            fixedPrice,
            itemSerial,
            supplierID,
            category, 
            warranty
        }

        axios.post('http://localhost:8000/InventoryComponents/InventoryDashboard/add',newItem)
        .then((res)=>{
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                text:'New Item Added'
            })
        })
        .catch((err)=>{
            console.log(err)
        });
    };
    return(
        <DefaultHandleInventory>
        <div style={formS}>
            <form className="form">
                <h1>Add Items</h1>
                <label style={label}>
                    Display Name: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setDisplayName(e.target.value)} value={displayName} required style={input}/>
                </label>
                <label style={label}>
                    Item Name: 
                    <input type="text" className="form-c" placeholder="Kingston SSD" onChange={(e)=> setItemName(e.target.value)} value={itemName} required style={input}/>
                </label>
                <label style={label}>
                    Product ID: 
                    <input type="text" className="form-c" placeholder="001" onChange={(e)=> setProductID(e.target.value)} value={productID} required style={input}/>
                </label>
                <label style={label}>
                    Quantity: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setQuantity(e.target.value)} value={quantity} required style={input}/>
                </label>
                <label style={label}>
                    Cost Price: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setCostPrice(e.target.value)} value={costPrice} required style={input}/>
                </label>
                <label style={label}>
                    Selling Price: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setSellingPrice(e.target.value)} value={sellingPrice} required style={input}/>
                </label>
                <label style={label}>
                    Fixed Price: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setFixedPrice(e.target.value)} value={fixedPrice} style={input}/>
                </label>
                <label style={label}>
                    Item Serial: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setItemSerial(e.target.value)} value={itemSerial} required style={input}/>
                </label>
                <label style={label}>Select Supplier</label>
                <select className="form-c" onChange={(e)=> setSupplierID(e.target.value)} value={supplierID} style={input}>
                <option value="1">Ozone Computers</option>
                <option value="2">Genext</option>
                <option value="3">Hikvision</option>
                </select>

                <label style={label}>Category</label>
                <select className="form-c" onChange={(e)=> setCategory(e.target.value)} value={category} style={input}>
                <option value="4">Computer</option>
                <option value="5">Laptop</option>
                <option value="6">CCTV</option>
                </select>
                <label style={label}>
                    Warranty: 
                    <input type="text" className="form-c" placeholder="SSD" onChange={(e)=> setWarranty(e.target.value)} value={warranty} required style={input}/>
                </label>
                <button className='btn btn-success' onClick={(e) => subData(e)} style={button}>Add New Item</button>
            </form>
        </div>
        </DefaultHandleInventory>
    )
};
const formS ={
    display : 'flex',
    fontColor:'$font-color',
    fontFamily: '$font-family',
    fontSize: '14px',
    width: '65%',
    margin: 'auto',
};
const label={
    display: 'block',
    fontSize: '18px',
    marginBottom: '10px'
};

const input={
    width: '175%',
    padding: '8px',
    marginBottom: '10px',
    boxSizing: 'border-box',
};
const button={
    marginLeft: 'none',
    width: '100%',
    height: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
}



export default AddNewItem;