// import React, { useState, useEffect } from "react";
// import DefaultHandle from "../DefaultHandle";
// import Select, { components } from "react-select";
// import axios from "axios";
// import "../../styles/item-kits-form.css";

// function ItemKitsForm() {
//   const MultiValue = (props) => {
//     return (
//       <components.MultiValue {...props}>
//         <span>{props.data.label}</span>
//       </components.MultiValue>
//     );
//   };

//   const [formData, setFormData] = useState({
//     itemKitId: "",
//     itemKitName: "",
//     itemDescription: "",
//     price: "",
//     quantity: "",
//     selectedItems: [],
//   });

//   const [inventoryItems, setInventoryItems] = useState([]);

//   useEffect(() => {
//     const fetchInventoryItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/item/");
//         if (response.data.success) {
//           setInventoryItems(response.data.data);
//         } else {
//           console.error("Failed to fetch inventory items:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching inventory items:", error);
//       }
//     };

//     fetchInventoryItems();
//   }, []);

//   const handleChange = (e) => {
//     // Check if the field is the price field and if the value is less than 0
//     if (e.target.name === "price" && parseFloat(e.target.value) < 0) {
//        // Set the price to 0 or another default positive value
//        setFormData({ ...formData, [e.target.name]: 0 });
//     } else {
//        // For other fields, update the state as usual
//        setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//    };
   

//   const handleItemSelectChange = (selectedItems) => {
//     const formattedSelectedItems = selectedItems.map((item) => ({
//       value: item.value,
//       label: item.label,
//     }));

//     setFormData({
//       ...formData,
//       selectedItems: formattedSelectedItems,
//     });
//   };
//   const checkIfItemKitIdExists = async (itemKitId) => {
//     try {
//        const response = await axios.get(`http://localhost:8000/itemkit/check/${itemKitId}`);
//        return response.data.exists; // Assuming the API returns an object with a boolean `exists` property
//     } catch (error) {
//        console.error("Error checking if item kit ID exists:", error);
//        return false; // Default to false in case of an error
//     }
//    };
// // Check if the itemKitId already exists
// const itemKitIdExists = await checkIfItemKitIdExists(formData.itemKitId);
// if (itemKitIdExists) {
//    alert("An item kit with this ID already exists. Please choose a different ID.");
//    return;
// }   

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (
//       !formData.itemKitId ||
//       !formData.itemKitName ||
//       !formData.itemDescription ||
//       !formData.price ||
//       !formData.quantity ||
//       !formData.selectedItems.length
//     ) {
//       alert("Please fill out all fields before submitting the form.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/itemkit/create",
//         {
//           itemKitId: formData.itemKitId,
//           itemKitName: formData.itemKitName,
//           itemDescription: formData.itemDescription,
//           price: formData.price,
//           quantity: formData.quantity,
//           items: formData.selectedItems.map((item) => item.value),
//         }
//       );
//       console.log("Item kit created:", response.data.data);
//       // Reset form data including selectedItems
//       setFormData({
//         itemKitId: "",
//         itemKitName: "",
//         itemDescription: "",
//         price: "",
//         quantity: "",
//         selectedItems: [],
//       });
//     } catch (error) {
//       console.error("Error creating item kit:", error);
//       console.log("Response from server:", error.response);
//     }
//   };

//   return (
//     <>
//     <DefaultHandle>
//     <div className="item-kits-form">
//       <h2>Create Item Kit</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="itemKitId">Item Kit ID:</label>
//         <input
//           type="text"
//           id="itemKitId"
//           name="itemKitId"
//           value={formData.itemKitId}
//           onChange={handleChange}
//         />

//         <label htmlFor="itemKitName">Item Kit Name:</label>
//         <input
//           type="text"
//           id="itemKitName"
//           name="itemKitName"
//           value={formData.itemKitName}
//           onChange={handleChange}
//         />

//         <label htmlFor="itemDescription">Item Description:</label>
//         <input
//           type="text"
//           id="itemDescription"
//           name="itemDescription"
//           value={formData.itemDescription}
//           onChange={handleChange}
//         />

//         <label htmlFor="price">Price:</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//         />

//         <label htmlFor="quantity">Quantity:</label>
//         <input
//           type="number"
//           id="quantity"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//         />

//         <label htmlFor="selectedItems">Selected Items:</label>
//         <Select
//           name="selectedItems"
//           id="selectedItems"
//           isMulti
//           className={`select-container ${
//             !formData.selectedItems.length && "error"
//           }`}
//           components={{ MultiValue }}
//           options={inventoryItems.map((item) => ({
//             value: item._id,
//             label: item.itemName,
//           }))}
//           value={formData.selectedItems}
//           onChange={handleItemSelectChange}
//         />
//         <button type="submit">Create Item Kit</button>
//       </form>
//     </div>
//     </DefaultHandle>
//     </>
//   );
// }

// export default ItemKitsForm;
import React, { useState, useEffect } from "react";
import { message } from 'antd';
import DefaultHandle from "../DefaultHandle";
import Select, { components } from "react-select";
import axios from "axios";
import "../../styles/item-kits-form.css";

function ItemKitsForm() {
 const MultiValue = (props) => {
    return (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );
 };

 const [formData, setFormData] = useState({
    itemKitId: "",
    itemKitName: "",
    itemDescription: "",
    price: "",
    quantity: "",
    selectedItems: [],
 });

 const [inventoryItems, setInventoryItems] = useState([]);
 const [errorMessage, setErrorMessage] = useState("");

 useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/item/");
        if (response.data.success) {
          setInventoryItems(response.data.data);
        } else {
          console.error("Failed to fetch inventory items:", response.data);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
 }, []);

 const handleChange = (e) => {
    if (e.target.name === "price" && parseFloat(e.target.value) < 0) {
      setFormData({ ...formData, [e.target.name]: 0 });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
 };

 const handleItemSelectChange = (selectedItems) => {
    const formattedSelectedItems = selectedItems.map((item) => ({
      value: item.value,
      label: item.label,
    }));

    setFormData({
      ...formData,
      selectedItems: formattedSelectedItems,
    });
 };

 const checkIfItemKitIdExists = async (itemKitId) => {
    try {
      const response = await axios.get(`http://localhost:8000/itemkit/check/${itemKitId}`);
      return response.data.exists;
    } catch (error) {
      console.error("Error checking if item kit ID exists:", error);
      return false;
    }
 };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.itemKitId ||
      !formData.itemKitName ||
      !formData.itemDescription ||
      !formData.price ||
      !formData.quantity ||
      !formData.selectedItems.length
    ) {
      setErrorMessage("Please fill out all fields before submitting the form.");
      return;
    }

    const itemKitIdExists = await checkIfItemKitIdExists(formData.itemKitId);
    if (itemKitIdExists) {
      message.error("An item kit with this ID already exists. Please choose a different ID.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/itemkit/create",
        {
          itemKitId: formData.itemKitId,
          itemKitName: formData.itemKitName,
          itemDescription: formData.itemDescription,
          price: formData.price,
          quantity: formData.quantity,
          items: formData.selectedItems.map((item) => item.value),
        }
        
      );
      console.log("Item kit created:", response.data.data);

      setFormData({
        itemKitId: "",
        itemKitName: "",
        itemDescription: "",
        price: "",
        quantity: "",
        selectedItems: [],
      });
      setErrorMessage(""); // Clear error message on successful submission
      message.success("Item kit create successful!")
    } catch (error) {
      console.error("Error creating item kit:", error);
      setErrorMessage("Failed to create item kit. Please try again.");
    }
 };

 return (
    <>
      <DefaultHandle>
        <div className="item-kits-form">
          <h2>Create Item Kit</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="itemKitId">Item Kit ID:</label>
            <input
              type="text"
              id="itemKitId"
              name="itemKitId"
              value={formData.itemKitId}
              onChange={handleChange}
            />

            <label htmlFor="itemKitName">Item Kit Name:</label>
            <input
              type="text"
              id="itemKitName"
              name="itemKitName"
              value={formData.itemKitName}
              onChange={handleChange}
            />

            <label htmlFor="itemDescription">Item Description:</label>
            <input
              type="text"
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

            <label htmlFor="selectedItems">Selected Items:</label>
            <Select
              name="selectedItems"
              id="selectedItems"
              isMulti
              className={`select-container ${!formData.selectedItems.length && "error"}`}
              components={{ MultiValue }}
              options={inventoryItems.map((item) => ({
                value: item._id,
                label: item.itemName,
              }))}
              value={formData.selectedItems}
              onChange={handleItemSelectChange}
            />
            <button type="submit">Create Item Kit</button>
          </form>
        </div>
      </DefaultHandle>
    </>
 );
}

export default ItemKitsForm;
