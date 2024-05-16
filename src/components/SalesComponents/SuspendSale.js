import React, { useEffect, useState } from 'react';
import '../../styles/customer.css';
import DefaultHandleSales from './DefaultHandleSales';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function SuspendSale (){

  const [suspendsale,setSupendsale] =useState([]);

  const fetchSuspendSale = async() =>{
    try{
      const response = await axios.get("http://localhost:8000/suspendsale/");
      setSupendsale(response.data.data);

    }catch(error){
      console.log("Error Fetching Data",error);
    }
  }


useEffect(()=>{
  fetchSuspendSale();
},[]);

return(
<DefaultHandleSales>
    <div className="container">
      <div className='tableContainer'>
        <DataTable
        columns={[
          {name:"Suspend_Id",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"Cashire Name",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"Date",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"customer ID",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"SCustomer Name",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"Item ID",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"Item Name",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"Qnt",selector:(row)=>row.suspendsaleid,sortable:true},
          {name:"total Amount",selector:(row)=>row.suspendsaleid,sortable:true},
        ]}/>

      </div>
    </div>
    </DefaultHandleSales>
    );
}


export default SuspendSale;
