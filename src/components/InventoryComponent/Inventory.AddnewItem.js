import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component'
import DefaultHandle from '../DefaultHandle'


const AddNewItem = () =>{
    //store data in form
    const [displayName, setDisplayName] = useState('');
    const [itemName, setItemName] = useState('');
    const [productID, setProductID] = useState('');
    const [quantity, setQuantity] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [fixedPrice, setFixedPrice] = useState('');
    const [itemSereal, setItemSerial] = useState('');
    const [supplierID, setSupplierID] = useState('');
    const [category, setCategory] = useState('');
    const [warranty, setWarranty] = useState('');

    
    //add new item to DB
    function sbmitItemData(e){
        e.preventDefault();

        //Check all required data are fill the user
        if (displayName ==='' || itemName === '' || productID ==='' || quantity === '' || costPrice === '' || sellingPrice === ' ' || supplierID === '' || category ==='' || warranty==''){
            Swal.fire({
                icon:'error',
                title: 'Oops....',
                text:'Plase Enter All Data'
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
            itemSereal,
            supplierID,
            category, 
            warranty
        }
      
        
        axios.post('http://localhost:8000/item/add',newItem)
        .then((res) =>{
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New Item Added !',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch((err)=>{
            console.log(err);
        })

        window.location.reload(false)
    }

    return (
<DefaultHandle>
<div style={formStyle}>
        <form className='form'>
            <label style={label}>
              Display Name:
              <input type="text" className='form-control' placeholder="Cutting Wheel" onChange={(e) => setDisplayName(e.target.value)} value={displayName} required style={input} />
            </label>
            <label style={label}> 
              Item Name:
              <input type="text" className="form-control" placeholder="Cutting Wheel 5''" onChange={(e) => setItemName(e.target.value)} value={itemName} required style={input} />
            </label>
            <label style={label} >
              Product ID:
              <input type="text" className="form-control" placeholder="001" onChange={(e) => setProductID(e.target.value)} value={productID} required style={input} />
            </label>
            <label style={label}>
              Quantity:
              <input type="number" className="form-control" placeholder="20" onChange={(e) => setQuantity(e.target.value)} value={quantity} required style={input} />
            </label>
            <label style={label}>
              Cost Pricelabel
              <input type="text" className="form-control" placeholder="200" onChange={(e) => setCostPrice(e.target.value)} value={costPrice} required style={input} />
            </label>
            <label style={label}>
              Selling Price:
              <input type="text" className="form-control" placeholder="400" onChange={(e) => setSellingPrice(e.target.value)} value={sellingPrice} required style={input} />
            </label>
            <label style={label}>
              Fixed Price:
              <input type="text" className="form-control" placeholder="300" onChange={(e) => setFixedPrice(e.target.value)} value={fixedPrice} style={input} />
            </label>
            <label style={label}>
              Item Sereal:
              <input type="text" className="form-control" placeholder="AK2928582-9582" onChange={(e) => setItemSerial(e.target.value)} value={itemSereal} style={input} />
            </label>

            <label style={label} >Select Supplier:</label>
                <select className="form-control" onChange={(e) => setSupplierID(e.target.value)} value={supplierID} style={input}>
                  <option value="5">Volvo</option>
                  <option value="6">Saab</option>
                  <option value="7">Mercedes</option>
                  <option value="4">Audi</option>
                </select>

              <label style={label}>Select Category</label>
                  <select className="form-control" onChange={(e) => setCategory(e.target.value)} value={category} style={input}>
                    <option value="1">Volvo</option>
                    <option value="2">Saab</option>
                    <option value="3">Mercedes</option>
                    <option value="4">Audi</option>
              </select>

            <label style={label}>
              Warranty:
              <input type="text" className="form-control" placeholder="AK2928582-9582" onChange={(e) => setWarranty(e.target.value)} value={warranty} style={input} />
            </label>
            <button className='btn btn-success' onClick={(e) => sbmitItemData(e)} style={button}>Add New Item</button>
          </form>
</div>
</DefaultHandle>
    
    )
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',   
  color: '$font-color',
  fontFamily: '$font-family',
  fontSize: '14px',
  fontWeight: '400',
  width: '65%',
  margin: 'auto',  
};

const label = {
  display: 'block',
  marginBottom: '10px',
  fontSize:'18p'
};

const input = {
  width: '175%',
  padding: '8px',
  marginBottom: '10px',
  boxSizing: 'border-box',
};

const button = {
  marginLeft: 'none',
  width: '100%',
  height: '40px',
  fontWeight: 'bold',
  marginBottom: '20px',
};
  
export default AddNewItem;