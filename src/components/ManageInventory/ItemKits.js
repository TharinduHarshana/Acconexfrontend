import React from "react";
import "../../styles/item-kits-form.css";
import DefaultHandle from "../DefaultHandle";

function ItemKits() {
  return (
    <>
      <DefaultHandle>
        <div className="item-kits-container">
          {" "}
          {/* Add a container around the form */}
          <div className="item-kits-container-header">
            <h3>Inventory kits</h3>
          </div>
          <div className="form-item-kit-container">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" />

            <label htmlFor="saleprice">Sale price:</label>
            <input type="text" id="saleprice" />

            <label htmlFor="materials">Bill of materials:</label>
            <div className="bill-split">
              <label htmlFor="quantiy" ></label>
              <input type="text" id="quantity" placeholder="quantity"/>
              <div>
                <select id="materials" > 
                  <option value="Computer">Computer</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Mobile phone">Mobile phone</option>
                  <option value="CD">CD</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <button style={{ marginRight: "10px" }}>New Line</button>
            </div>
            <button style={{ marginRight: "10px" }}>Create</button>
          </div>
        </div>
      </DefaultHandle>
    </>
  );
}

export default ItemKits;

// import React, { useState } from "react";
// import "../../styles/item-kits-form.css";
// import DefaultHandle from "../DefaultHandle";

// function ItemKits() {
//   const [billOfMaterials, setBillOfMaterials] = useState([{ quantity: "", material: "" }]);

//   const addNewLine = () => {
//     setBillOfMaterials([...billOfMaterials, { quantity: "", material: "" }]);
//   };

//   const handleQuantityChange = (index, value) => {
//     const updatedBillOfMaterials = [...billOfMaterials];
//     updatedBillOfMaterials[index].quantity = value;
//     setBillOfMaterials(updatedBillOfMaterials);
//   };

//   const handleMaterialChange = (index, value) => {
//     const updatedBillOfMaterials = [...billOfMaterials];
//     updatedBillOfMaterials[index].material = value;
//     setBillOfMaterials(updatedBillOfMaterials);
//   };

//   const clearField = (index) => {
//     const updatedBillOfMaterials = [...billOfMaterials];
//     updatedBillOfMaterials[index] = { quantity: "", material: "" };
//     setBillOfMaterials(updatedBillOfMaterials);
//   };

//   return (
//     <>
//       <DefaultHandle>
//         <div className="item-kits-container">
//           <div className="item-kits-container-header">
//             <h3>Inventory kits</h3>
//           </div>
//           <div className="form-item-kit-container">
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" />

//             <label htmlFor="description">Description:</label>
//             <input type="text" id="description" />

//             <label htmlFor="saleprice">Sale price:</label>
//             <input type="text" id="saleprice" />

//             {billOfMaterials.map((item, index) => (
//               <div className="bill-split" key={index}>
//                 <label htmlFor={`quantity${index}`}></label>
//                 <input
//                   type="text"
//                   id={`quantity${index}`}
//                   value={item.quantity}
//                   onChange={(e) => handleQuantityChange(index, e.target.value)}
//                   placeholder="quantity"
//                 />
//                 <div>
//                   <select
//                     id={`materials${index}`}
//                     value={item.material}
//                     onChange={(e) => handleMaterialChange(index, e.target.value)}
//                   >
//                     <option value="Computer">Computer</option>
//                     <option value="Laptop">Laptop</option>
//                     <option value="Mobile phone">Mobile phone</option>
//                     <option value="CD">CD</option>
//                   </select>
//                 </div>
//                 <button onClick={() => clearField(index)}>Clear</button>
//               </div>
//             ))}

//             <div style={{ marginBottom: "10px" }}>
//               <button style={{ marginRight: "10px" }} onClick={addNewLine}>
//                 New Line
//               </button>
//             </div>
//             <button style={{ marginRight: "10px" }}>Create</button>
//           </div>
//         </div>
//       </DefaultHandle>
//     </>
//   );
// }

// export default ItemKits;

