import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../InventoryComponent/firebase'; // Adjust the import path as necessary
import DefaultHandle from '../DefaultHandle';
import '../../styles/addnewitem.css';

const AddNewItem = () => {
  // Store data in form
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
  const [imageLink, setImageLink] = useState('');
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  


  

  // Image upload file change handle
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  // Image upload
  const handleUpload = () => {
    if (!file) {
      alert('Please upload an image first!');
    }

    const storageRef = ref(storage, `/files/${file.name}`);


    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // Update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // Download URL
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageLink(url);
        });
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:8000/category/');
        const suppliersResponse = await axios.get('http://localhost:8000/supplier/get');
        setCategories(categoriesResponse.data.data);
        setSuppliers(suppliersResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function sbmitItemData(e) {
    e.preventDefault();

    // Check all required data are filled by the user
    if (
      displayName === '' ||
      itemName === '' ||
      productID === '' ||
      quantity === '' ||
      costPrice === '' ||
      sellingPrice === '' || // Check for empty string, not ' '
      supplierID === '' ||
      category === '' ||
      warranty === '' ||
      imageLink === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text: 'Please Enter All Data',
      });
      return;
    }

    // Parse numeric values as numbers
    const numericQuantity = parseInt(quantity, 10);
    const numericCostPrice = parseFloat(costPrice);
    const numericSellingPrice = parseFloat(sellingPrice);
    const numericFixedPrice = parseFloat(fixedPrice);

    const newItem = {
      displayName,
      itemName,
      productID,
      quantity: numericQuantity,
      costPrice: numericCostPrice,
      sellingPrice: numericSellingPrice,
      fixedPrice: numericFixedPrice,
      itemSereal,
      supplierID,
      category,
      warranty,
      imageLink,
    };
    console.log(newItem);
    axios
      .post('http://localhost:8000/item/add', newItem)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New Item Added!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

    return (
<DefaultHandle> 
<div className='formContainer'>
        <form className='form'>
            <label className='label'>
              Display Name:
              <input type="text"  placeholder="Cutting Wheel" onChange={(e) => setDisplayName(e.target.value)} value={displayName} required className='input' />
            </label>
            <label className='label'> 
              Item Name:
              <input type="text"  placeholder="Cutting Wheel 5''" onChange={(e) => setItemName(e.target.value)} value={itemName} required className='input' />
            </label>
            <label>
              Description:
              <textarea
                  className="form-control"
                  placeholder="Category Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  style={{ height: '200px', width: '1000px' }} // Adjust the height and width as needed
                ></textarea>

            </label>
            <label className='label' >
              Product ID:
              <input type="text"  placeholder="001" onChange={(e) => setProductID(e.target.value)} value={productID} required className='input' />
            </label>
            <label className='label'>
              Quantity:
              <input type="number"  placeholder="20" onChange={(e) => setQuantity(e.target.value)} value={quantity} required className='input' />
            </label>
            <label className='label'>
  Cost Price
  <input 
    type="text" 

    placeholder="200" 
    onChange={(e) => {
      const inputVal = e.target.value;
      if (/^\d+$/.test(inputVal) || inputVal === '') {
        setCostPrice(inputVal);
      }
    }} 
    value={costPrice} 
    required 
    className='input' 
  />
</label>
<label className='label'>
  Selling Price:
  <input 
    type="text" 

    placeholder="400" 
    onChange={(e) => {
      const inputVal = e.target.value;
      if (/^\d+$/.test(inputVal) || inputVal === '') {
        setSellingPrice(inputVal);
      }
    }} 
    value={sellingPrice} 
    required 
    className='input' 
  />
</label>
<label className='label'>
  Fixed Price:
  <input 
    type="text" 

    placeholder="300" 
    onChange={(e) => {
      const inputVal = e.target.value;
      if (/^\d+$/.test(inputVal) || inputVal === '') {
        setFixedPrice(inputVal);
      }
    }} 
    value={fixedPrice} 
    className='input' 
  />
</label>
<label>
              Item Sereal:
              <input type="text" placeholder="AK2928582-9582" onChange={(e) => setItemSerial(e.target.value)} value={itemSereal} className='input' />
            </label>

            {/* Your form inputs */}
      <label className='label'>Select Supplier:</label>
      <select onChange={(e) => setSupplierID(e.target.value)} value={supplierID} className='input'>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier.supplierId}>{supplier.firstName}</option>
        ))}
      </select>

      <label className='label'>Select Category:</label>
      <select onChange={(e) => setCategory(e.target.value)} value={category} className='input'>
        {categories.map((category) => (
          <option key={category._id} value={category.categoryname}>{category.categoryname}</option>
        ))}
      </select>

            <label className= 'label'>
              Warranty:
              <input type="text"  placeholder="AK2928582-9582" onChange={(e) => setWarranty(e.target.value)} value={warranty} className='input' />
            </label>

            <div className="row md-6">
          <div className="col-md-6">
          <label className="labels">
              Upload Image :
            </label>
            <input 
              type="file"
              class="form-control"  
              onChange={handleChange}   
            />
            <div className={{marginTop: "10px"}}>
              <button type="button" class="btn btn-secondary" onClick={handleUpload}>Upload</button>
              <p>{percent} "% done"</p>
            </div>
          </div>
        </div>

              
              <button className="btn btn-success" onClick={sbmitItemData}>
              Add New Item
              </button>
          </form>
</div>
</DefaultHandle>
    
    )
}


  
export default AddNewItem;