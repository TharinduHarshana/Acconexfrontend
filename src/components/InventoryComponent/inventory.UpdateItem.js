import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component'


function UpdateItem() {
  
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
  const [item,setItem] = useState([])
  const {_id} = useParams();
  const navigate = useNavigate();
        
        useEffect(()=>{
            axios.patch('http://localhost:8000/inventory/update/'+_id)
            .then(res => { console.log(res.data.data)
              setDisplayName(res.data.data.displayName)
              setItemName(res.data.data.itemName)
              setProductID(res.data.data.productID)
              setQuantity(res.data.data.quantity)
              setCostPrice(res.data.data.costPrice)
              setSellingPrice(res.data.data.sellingPrice)
              setFixedPrice(res.data.data.fixedPrice)
              setItemSerial(res.data.data.itemSereal)
              setSupplierID(res.data.data.supplierID)
              setCategory(res.data.data.category)
              setWarranty(res.data.data.warranty)
            })

            .catch(err => console.log(err))
        },[])

        const handleSubmit = async (e) => {
          e.preventDefault();
      
          const updatedItem = {
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
            warranty,
          };
      
          try {
            await axios.patch(`http://localhost:8000/inventory/update/${_id}`, updatedItem)
            Swal.fire({
              icon: 'success',
              title: 'Item updated successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            
            navigate('/admin/Inventory');

          } catch (error) {
            console.error(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
            });
          }
        };
      

    return (
    <div style={formStyle}>
         <form className='form'>
             <label style={label}>
               Display Name:
               <input type="text" className='form-control' placeholder="Cutting Wheel" onChange={(e) => setDisplayName(e.target.value)} value={displayName} required style={input} />
             </label>
             <label style={label}> 
               Item Name:
               <input type="text" className="form-control" placeholder="Cutting Wheel 5''" onChange={(e) => setItemName(e.target.value)}  value={itemName} required style={input} />
             </label>
             <label style={label} >
               Product ID:
               <input type="text" className="form-control" placeholder="001" onChange={(e) => setProductID(e.target.value)}  value={productID} required style={input} />
             </label>
             <label style={label}>
               Quantity:
               <input type="number" className="form-control" placeholder="20" onChange={(e) => setQuantity(e.target.value)}  value={quantity} required style={input} />
             </label>
             <label style={label}>
               Cost Pricelabel
               <input type="text" className="form-control" placeholder="200" onChange={(e) => setCostPrice(e.target.value)}  value={costPrice} required style={input} />
             </label>
             <label style={label}>
               Selling Price:
               <input type="text" className="form-control" placeholder="400" onChange={(e) => setSellingPrice(e.target.value)}  value={sellingPrice} required style={input} />
             </label>
             <label style={label}>
               Fixed Price:
               <input type="text" className="form-control" placeholder="300" onChange={(e) => setFixedPrice(e.target.value)}  value={fixedPrice} style={input} />
             </label>
             <label style={label}>
                   Item Sereal:
               <input type="text" className="form-control" placeholder="AK2928582-9582" onChange={(e) => setItemSerial(e.target.value)}  value={itemSereal} style={input} />
             </label>

             <label style={label} >Select Supplier:</label>
                 <select className="form-control" onChange={(e) => setSupplierID(e.target.value)}  value={supplierID} style={input}>
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
             <button className='btn btn-success' onClick={handleSubmit} >Update Item</button>
             
           </form>
 </div> 

    );
}

export default UpdateItem;

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