import{useNavigate} from 'react-router-dom';

const Items =() =>{
    const navigate = useNavigate();

    const column =[
        {
        name:'Product ID',
        selector: row=>row.productID,
        sortable:true,
        },

        {
        name:'Name',
        selector:row=>row.displayName,
        sortable:true,
        },
        {
        name:'Cost Price',
        selector:row=>row.costPrice,
        sortable:true,
        },
        {
        name:'Selling Price',
        selector:row=>row.sellingPrice,
        sortable:true,
        },
        {
        name:'Category',
        selector:row=>row.category,
        sortable:true,
        },
        {
        name:'Quantity',
        selector:row=>row.quantity,
        sortable:true,
        },
        {
            name:'Actions',
            cell:(row)=>(
                <div edbtn>
                    
                </div>
            )
        }
    ]
}