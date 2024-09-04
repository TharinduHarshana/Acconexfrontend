import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component'
import DefaultHandle from '../DefaultHandle';


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
  const {id} = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
        
        useEffect(()=>{
            axios.patch('https://acconexfrontend.vercel.app/item/update/'+id)
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



        useEffect(() => {
          const fetchData = async () => {
            try {
              const categoriesResponse = await axios.get('https://acconexfrontend.vercel.app/category/');
              const suppliersResponse = await axios.get('https://acconexfrontend.vercel.app/supplier/get');
              setCategories(categoriesResponse.data.data);
              console.log(categoriesResponse.data.data);
              setSuppliers(suppliersResponse.data.data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);




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
            await axios.patch(`https://acconexfrontend.vercel.app/item/update/${id}`, updatedItem)
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
    <DefaultHandle>
    <div style={{ display: '', height: '500px', overflow: 'auto' }}>
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

                   {/* Your form inputs */}
      <label className='label'>Select Supplier:</label>
      <select onChange={(e) => setSupplierID(e.target.value)} value={supplierID} className='input'>
      <option value="">Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier.supplierId}>{supplier.firstName}</option>
        ))}
      </select>

      <label className='label'>Select Category:</label>
      <select onChange={(e) => setCategory(e.target.value)} value={category} className='input'>
      <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.categoryname}>{category.categoryname}</option>
        ))}
      </select>

            <label style={label}>
               Warranty:
               <input type="text" className="form-control" placeholder="AK2928582-9582" onChange={(e) => setWarranty(e.target.value)} value={warranty} style={input} />
             </label>
             <button className='btn btn-success' onClick={handleSubmit} >Update Item</button>
             
           </form>
 </div> 
 </DefaultHandle>

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