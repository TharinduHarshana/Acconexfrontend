const { useState } = require("react")
import Swal from "sweetalert2";


const AddNewItem = () =>{

    const[displayName, setDisplayName] = useState('');
    const[itemName, setItemName] = useState('');
    const[productID, setProductID] = useState('');
    const[quantity, setQuantity] = useState('');
    const[costPrice, setCostPrice] = useState('');
    const[sellingPrice, setSellingPrice] = useState('');
    const[fixedPrice, setFixedPrice] = useState('');
    const[itemSerial, setItemSerial] = useState('');
    const[supplierID, setSupplierID] = useState('');
    const[category, setCategory] = useState('');
    const[warranty, setWarranty] = useState('');

    //add item to DB

    function subData(e){
        e.preventDefault();
        if(displayName =='' || itemName == ''|| productID ==''|| quantity ==''|| costPrice ==''|| sellingPrice ==''|| supplierID ==''|| category ==''|| warranty ==''){
            Swal.fire({

            })
        }
    }
}