import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultHandle from '../components/DefaultHandle'

const Items = () =>{
  const navigate = useNavigate();
  //Assign Items
  const column = [
    {
      name: 'Product ID',
      selector: row => row.productID,
      sortable : true
    },
    {
      name: 'Display Name',
      selector: row => row.displayName,
      sortable : true
    },
    {
      name: 'Cost Price',
      selector: row => row.costPrice,
      sortable : true
    },
    {
      name: 'Selling Price',
      selector: row => row.sellingPrice,
      sortable : true
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable : true
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      sortable : true
    },

    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <Link
            to={`updateitem/${row._id}`}
          >
            Edit
          </Link>
          <Link
            onClick={(e) => handleDelete(row._id)}
          >
            Delete
          </Link>
        </div>
      ),
    },

  ];  


// Get All Items from DB
const [items, setItems] = useState([]);
const [FilterItems, setFilterItems] = useState([]);

  useEffect(()=>{
    
    const fetchData = async()=>{
    axios.get('http://localhost:8000/item/')
    .then(res =>{
        setItems(res.data.data)
        console.log(items)
        setFilterItems(res.data.data)
    
    })
    .catch(err => console.log(err));
    }
    fetchData();
  },[])

  //data stor variable and search variable
  
  const handleDelete = async (_id) => {
    try{
    axios.delete('http://localhost:8000/item/delete/'+_id)
    .then(res =>{
      Swal.fire({
        icon: 'success',
        title: 'Item Deleted successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    }).then(() => {
      window.location.reload();
    });

  }catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Item Delete Fail!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    
    
  }
  

  //Search Function
  const filterItem = (event) => {
    const searchValue = event.target.value.toLowerCase();
    
    const itemData = FilterItems.filter(
        (row) =>
            row.displayName.toLowerCase().includes(searchValue) ||
            row.productID.toLowerCase().includes(searchValue)
    );

    setItems(itemData);
};


    //Data table and Display Items
  return(
    <DefaultHandle>
    
    <div>
      <div>
        <input type="text end" className='input' placeholder='Search...' onChange={filterItem} />
      </div>

      <div className='text-end'>
          <Link to="/admin/addnewitem">
            New Item
          </Link>
      </div>

      <DataTable
        columns={column}
        data={items}
        pagination
        selectableRows
        
      > 
      </DataTable>
    </div>
    </DefaultHandle> 
  )
}

 export default Items;