// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DefaultHandle from "../DefaultHandle";
// import { message } from "antd";
// import { useNavigate } from "react-router-dom";
// import "../../styles/item-kit.css";

// function ItemKitsForm() {
//   const navigate = useNavigate();

//   const [inventoryItems, setInventoryItems] = useState([]);
//   const [formData, setFormData] = useState({
//     itemKitId: "",
//     itemKitName: "",
//     itemDescription: "",
//     price: 0,
//     kitQuantity: "",
//     items: [],
//     itemQuantity: [],
//   });

//   // Fetch all items from the inventory
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
//   // Fetch all item kits and generate the next item kit ID
//   useEffect(() => {
//     const fetchItemKits = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/itemkit/all");
//         if (response.data.success) {
//           const lastItemKitId = response.data.data.length > 0 ? response.data.data[response.data.data.length - 1].itemKitId : "kitId000";
//           const nextItemKitId = generateNextItemKitId(lastItemKitId);
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             itemKitId: nextItemKitId,
//           }));
//         } else {
//           console.error("Failed to fetch item kits:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching item kits:", error);
//       }
//     };

//     fetchItemKits();
//   }, []);

//   // Function to generate the next item kit ID based on the last ID fetched
//   const generateNextItemKitId = (lastItemKitId) => {
//     const numericPart = parseInt(lastItemKitId.replace("kitId", ""));
//     const nextNumericPart = numericPart + 1;
//     return `kitId${nextNumericPart.toString().padStart(3, "0")}`;
//   };


//   // Handle search input
//   const [searchItem, setSearchItem] = useState("");

//   // Function to handle quantity change
//   const handleQuantityChange = (e, item) => {
//     setInventoryItems(
//       inventoryItems.map((i) =>
//         i._id === item._id ? { ...i, quantity: e.target.value } : i
//       )
//     );
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       itemQuantity: prevFormData.itemQuantity.map((qty, index) =>
//         index === formData.items.findIndex((i) => i._id === item._id)
//           ? parseInt(e.target.value)
//           : qty
//       ),
//     }));
//   };

//   // Function to add an item to the kit
// const addItemToKit = async (item) => {
//   // Check if the item is already in the kit
//   const itemIndex = formData.items.findIndex((i) => i._id === item._id);
//   if (itemIndex >= 0) {
//     // Remove the item from the kit
//     const newItems = formData.items.filter((_, index) => index!== itemIndex);
//     const newItemQuantities = formData.itemQuantity.filter(
//       (_, index) => index!== itemIndex
//     );
//     const newPrice = formData.price - item.sellingPrice * item.quantity;

//     setFormData((prevFormData) => ({
//      ...prevFormData,
//       items: newItems,
//       itemQuantity: newItemQuantities,
//       price: newPrice,
//     }));
//   } else {
//     // Add the item to the kit
//     const itemTotalPrice = item.sellingPrice * item.quantity;
//     setFormData((prevFormData) => ({
//      ...prevFormData,
//       items: [...prevFormData.items, item],
//       itemQuantity: [...prevFormData.itemQuantity, item.quantity],
//       price: prevFormData.price + itemTotalPrice,
//     }));
//     // Deduct the item quantity from the inventory
//     const updatedInventoryItems = inventoryItems.map((i) =>
//       i._id === item._id? {...i, quantity: i.quantity - item.quantity } : i
//     );
//     setInventoryItems(updatedInventoryItems);
//     // Check if the item quantity is sufficient before adding to the kit
//     if (item.quantity > inventoryItems.find(i => i._id === item._id).quantity) {
//       message.error("Insufficient stock for this item.");
//       return;
//     }
//   }
//   // Clear the search field after adding an item to the kit
//   setSearchItem("");
// };



//   //Function to check if item kit ID already exists
//   const checkIfItemKitIdExists = async (itemKitId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/itemkit/check/${itemKitId}`
//       );
//       return response.data.exists;
//     } catch (error) {
//       console.error("Error checking if item kit ID exists:", error);
//       return false;
//     }
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", formData);

//     // Define required fields and their validation logic
//     const requiredFields = [
//       "itemKitId",
//       "itemKitName",
//       "itemDescription",
//       "price",
//       "kitQuantity",
//       "items", // Added to the list of required fields
//     ];

//     // Validate that all required fields are filled
//     const allFieldsFilled = requiredFields.every((field) => formData[field]);

//     // Validate that 'items' is not empty and each item has 'productID' and 'quantity'
//     const itemsValid =
//       formData.items.length > 0 &&
//       formData.items.every((item) => item.productID && item.quantity);

//     // Validate that 'itemQuantity' is not empty and matches the length of 'items'
//     const itemQuantityValid =
//       formData.itemQuantity.length > 0 &&
//       formData.itemQuantity.length === formData.items.length;

//     // Validate form data
//     if (!allFieldsFilled || !itemsValid || !itemQuantityValid) {
//       message.error(
//         "Please fill in all required fields and ensure items and quantities are correctly specified."
//       );
//       return; // Exit the function if validation fails
//     }

//     // Validate that price, kitQuantity, and itemQuantity are positive numbers
//     const priceValid = Number(formData.price) >= 0;
//     const kitQuantityValid = Number(formData.kitQuantity) >= 0;
//     const itemsQuantityValid = formData.items.every(
//       (item) => Number(item.quantity) >= 0
//     );

//     if (!priceValid || !kitQuantityValid || !itemsQuantityValid) {
//       message.error(
//         "Price, kit quantity, and item quantity must be positive numbers."
//       );
//       return; // Exit the function if validation fails
//     }

//     const itemKitIdExists = await checkIfItemKitIdExists(formData.itemKitId);
//     if (itemKitIdExists) {
//       // If item kit ID already exists
//       message.error(
//         "An item kit with this ID already exists. Please choose a different ID."
//       );
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/itemkit/create",
//         formData
//       );
//       console.log("Item kit submitted successfully:", response.data);
//       message.success("Item kit create successful!");

//       // Update inventory items' quantities based on the items included in the kit
//       const updatedInventoryItems = response.data.updatedInventoryItems;
//       setInventoryItems(updatedInventoryItems);

//       navigate("/admin/inventory/item-kits");
//     } catch (error) {
//       console.error("Failed to submit item kit:", error.response.data);
//       message.error("Error ocurred when creating item kit..");
//     }
//   };

//   // Function to remove an item from the kit
//   const removeItemFromKit = (item) => {
//     const updatedItems = formData.items.filter((i) => i._id !== item._id);
//     const updatedQuantities = formData.itemQuantity.filter(
//       (_, index) =>
//         index !== formData.items.findIndex((i) => i._id === item._id)
//     );
//     const updatedPrice = formData.price - item.sellingPrice * item.quantity;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       items: updatedItems,
//       itemQuantity: updatedQuantities,
//       price: updatedPrice,
//     }));
//   };

//   return (
//     <div className="item_kit">
//       <DefaultHandle>
//         <div className="container">
//           <div className="item_kit">
//             <div className="item_kits form">
//               <form onSubmit={handleSubmit}>
//                 <p style={{ color: "red" }}>All the fields are required.</p>
//                 <label htmlFor="itemKitId">Item Kit ID:</label>
//                 <input
//                   type="text"
//                   id="itemKitId"
//                   name="itemKitId"
//                   className="common-field"
//                   value={formData.itemKitId}
//                   onChange={(e) =>
//                     setFormData({ ...formData, itemKitId: e.target.value })
//                   }
//                 />

//                 <label htmlFor="itemKitName">Item Kit Name:</label>
//                 <input
//                   type="text"
//                   id="itemKitName"
//                   name="itemKitName"
//                   value={formData.itemKitName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, itemKitName: e.target.value })
//                   }
//                 />

//                 <label htmlFor="itemDescription">Item Description:</label>
//                 <input
//                   type="text"
//                   id="itemDescription"
//                   name="itemDescription"
//                   value={formData.itemDescription}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       itemDescription: e.target.value,
//                     })
//                   }
//                 />

//                 <label htmlFor="price">Price:</label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   readOnly
//                 />

//                 <label htmlFor="kitQuantity">Item Kit Quantity:</label>
//                 <input
//                   type="number"
//                   id="kitQuantity"
//                   name="kitQuantity"
//                   value={formData.kitQuantity}
//                   onChange={(e) => {
//                     if (e.target.value < 0) {
//                       message.error("Kit quantity must be a positive number.");
//                       return;
//                     }
//                     setFormData({ ...formData, kitQuantity: e.target.value });
//                   }}
//                 />
//                 <button type="submit" className="form_btn">
//                   Create Item Kit
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="item_kits table">
//             <div className="search-field">
//               <input
//                 type="text"
//                 placeholder="Search item"
//                 value={searchItem}
//                 onChange={(e) => setSearchItem(e.target.value)}
//               />
//             </div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Item</th>
//                   <th>Quantity</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {inventoryItems
//                   .filter((item) =>
//                     item.itemName
//                       .toLowerCase()
//                       .includes(searchItem.toLowerCase())
//                   )
//                   .map((item) => (
//                     <tr key={item._id}>
//                       <td>{item.itemName}</td>
//                       <td>
//                         <input
//                           type="number"
//                           value={item.quantity}
//                           onChange={(e) => {
//                             if (e.target.value < 0) {
//                               message.error(
//                                 "Item quantity must be a positive number."
//                               );
//                               return;
//                             }
//                             handleQuantityChange(e, item);
//                           }}
//                         />
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => addItemToKit(item)}
                         
//                           className="table_btn"
//                         >
//                           Add to Kit
//                         </button>
//                         <button
//                           onClick={() => removeItemFromKit(item)} 
                      
//                           className="table_btn"
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </DefaultHandle>
//     </div>
//   );
// }

// export default ItemKitsForm;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Modal as AntdModal } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/item-kit.css";
import ItemKitModal from "./ItemKitModal"; 
import DefaultHandle from "../DefaultHandle";

function ItemKitsForm() {
  const navigate = useNavigate();

  const [inventoryItems, setInventoryItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    itemKitId: "",
    itemKitName: "",
    itemDescription: "",
    price: 0,
    kitQuantity: "",
    items: [],
    itemQuantity: [],
  });

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/item/");
        if (response.data.success) {
          const itemsWithSelectedQuantity = response.data.data.map(item => ({
            ...item,
            selectedQuantity: ""
          }));
          setInventoryItems(itemsWithSelectedQuantity);
        } else {
          console.error("Failed to fetch inventory items:", response.data);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  useEffect(() => {
    const fetchItemKits = async () => {
      try {
        const response = await axios.get("http://localhost:8000/itemkit/all");
        if (response.data.success) {
          const lastItemKitId = response.data.data.length > 0 ? response.data.data[response.data.data.length - 1].itemKitId : "kitId000";
          const nextItemKitId = generateNextItemKitId(lastItemKitId);
          setFormData((prevFormData) => ({
            ...prevFormData,
            itemKitId: nextItemKitId,
          }));
        } else {
          console.error("Failed to fetch item kits:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item kits:", error);
      }
    };

    fetchItemKits();
  }, []);

  const generateNextItemKitId = (lastItemKitId) => {
    const numericPart = parseInt(lastItemKitId.replace("kitId", ""));
    const nextNumericPart = numericPart + 1;
    return `kitId${nextNumericPart.toString().padStart(3, "0")}`;
  };

  const [searchItem, setSearchItem] = useState("");

  const handleQuantityChange = (e, item) => {
    const newQuantity = e.target.value;
    if (isNaN(newQuantity) || newQuantity < 0) {
      message.error("Item quantity must be a positive number.");
      return;
    }

    setInventoryItems(
      inventoryItems.map((i) =>
        i._id === item._id ? { ...i, selectedQuantity: newQuantity } : i
      )
    );
  };

  const addItemToKit = (item) => {
    const selectedQuantity = parseInt(item.selectedQuantity);
    if (isNaN(selectedQuantity) || selectedQuantity <= 0) {
      message.error("Please enter a valid quantity.");
      return;
    }

    if (selectedQuantity > item.quantity) {
      message.error("Insufficient stock for this item.");
      return;
    }

    const itemIndex = formData.items.findIndex((i) => i._id === item._id);
    if (itemIndex >= 0) {
      const newItems = [...formData.items];
      const newItemQuantities = [...formData.itemQuantity];
      const oldSelectedQuantity = newItemQuantities[itemIndex];
      const newSelectedQuantity = selectedQuantity;

      newItemQuantities[itemIndex] = newSelectedQuantity;
      const newPrice =
        formData.price +
        item.sellingPrice * (newSelectedQuantity - oldSelectedQuantity);

      setFormData((prevFormData) => ({
        ...prevFormData,
        items: newItems,
        itemQuantity: newItemQuantities,
        price: newPrice,
      }));
    } else {
      const itemTotalPrice = item.sellingPrice * selectedQuantity;
      setFormData((prevFormData) => ({
        ...prevFormData,
        items: [...prevFormData.items, item],
        itemQuantity: [...prevFormData.itemQuantity, selectedQuantity],
        price: prevFormData.price + itemTotalPrice,
      }));
    }

    setInventoryItems(
      inventoryItems.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity - selectedQuantity, selectedQuantity: "" } : i
      )
    );

    setSearchItem("");
  };

  const checkIfItemKitIdExists = async (itemKitId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/itemkit/check/${itemKitId}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking if item kit ID exists:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    const requiredFields = [
      "itemKitId",
      "itemKitName",
      "itemDescription",
      "price",
      "kitQuantity",
      "items",
    ];

    const allFieldsFilled = requiredFields.every((field) => formData[field]);

    const itemsValid =
      formData.items.length > 0 &&
      formData.items.every((item) => item.productID && item.quantity);

    const itemQuantityValid =
      formData.itemQuantity.length > 0 &&
      formData.itemQuantity.length === formData.items.length;

    if (!allFieldsFilled || !itemsValid || !itemQuantityValid) {
      message.error(
        "Please fill in all required fields and ensure items and quantities are correctly specified."
      );
      return;
    }

    const priceValid = Number(formData.price) >= 0;
    const kitQuantityValid = Number(formData.kitQuantity) >= 0;
    const itemsQuantityValid = formData.items.every(
      (item) => Number(item.quantity) >= 0
    );

    if (!priceValid || !kitQuantityValid || !itemsQuantityValid) {
      message.error(
        "Price, kit quantity, and item quantity must be positive numbers."
      );
      return;
    }

    const itemKitIdExists = await checkIfItemKitIdExists(formData.itemKitId);
    if (itemKitIdExists) {
      message.error(
        "An item kit with this ID already exists. Please choose a different ID."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/itemkit/create",
        formData
      );
      console.log("Item kit submitted successfully:", response.data);
      message.success("Item kit created successfully!");

      const updatedInventoryItems = response.data.updatedInventoryItems;
      setInventoryItems(updatedInventoryItems);
      
      navigate("/admin/inventory/item-kits");
    } catch (error) {
      console.error("Failed to submit item kit:", error.response.data);
      message.error("Error occurred when creating item kit.");
    }
  };

  const removeItemFromKit = (item) => {
    AntdModal.confirm({
      title: 'Confirm Removal',
      content: `Are you sure you want to remove ${item.itemName} from the kit?`,
      onOk: () => {
        const itemIndex = formData.items.findIndex((i) => i._id === item._id);
        if (itemIndex >= 0) {
          const updatedItems = formData.items.filter((i) => i._id !== item._id);
          const updatedQuantities = formData.itemQuantity.filter(
            (_, index) => index !== itemIndex
          );
          const updatedPrice = formData.price - item.sellingPrice * parseInt(item.selectedQuantity || 0);
          setFormData((prevFormData) => ({
            ...prevFormData,
            items: updatedItems,
            itemQuantity: updatedQuantities,
            price: updatedPrice,
          }));

          setInventoryItems(
            inventoryItems.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + parseInt(item.selectedQuantity || 0), selectedQuantity: "" }
                : i
            )
          );
        }
      },
      onCancel() {
        console.log('Cancelled');
      },
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="item_kit">
      <DefaultHandle>
      <div className="container">
        <div className="item_kits form">
          <form onSubmit={handleSubmit}>
            <p style={{ color: "red" }}>All the fields are required.</p>
            <label htmlFor="itemKitId">Item Kit ID:</label>
            <input
              type="text"
              id="itemKitId"
              name="itemKitId"
              className="common-field"
              value={formData.itemKitId}
              onChange={(e) =>
                setFormData({ ...formData, itemKitId: e.target.value })
              }
            />

            <label htmlFor="itemKitName">Item Kit Name:</label>
            <input
              type="text"
              id="itemKitName"
              name="itemKitName"
              value={formData.itemKitName}
              onChange={(e) =>
                setFormData({ ...formData, itemKitName: e.target.value })
              }
            />

            <label htmlFor="itemDescription">Item Description:</label>
            <input
              type="text"
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  itemDescription: e.target.value,
                })
              }
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              readOnly
            />

            <label htmlFor="kitQuantity">Item Kit Quantity:</label>
            <input
              type="number"
              id="kitQuantity"
              name="kitQuantity"
              value={formData.kitQuantity}
              onChange={(e) => {
                if (e.target.value < 0) {
                  message.error("Kit quantity must be a positive number.");
                  return;
                }
                setFormData({ ...formData, kitQuantity: e.target.value });
              }}
            />
            <button type="button" onClick={toggleModal} className="see_btn">
              View Added Items
            </button>
            <button type="submit" className="form_btn">
              Create Item Kit
            </button>
          </form>
        </div>

        <div className="item_kits table">
          <div className="search-field">
            <input
              type="text"
              placeholder="Search item"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Available Quantity</th>
                <th>Selected Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems
                .filter((item) =>
                  item.itemName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
                )
                .map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <input
                        type="number"
                        value={item.selectedQuantity}
                        onChange={(e) => handleQuantityChange(e, item)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => addItemToKit(item)}
                        className="table_btn"
                      >
                        Add to Kit
                      </button>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      </DefaultHandle>
      <ItemKitModal show={showModal} handleClose={toggleModal}>
        <div className="item_kit_items">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{formData.itemQuantity[index]}</td>
                <td>
                  <button
                    onClick={() => removeItemFromKit(item)}
                    className="table_btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </ItemKitModal>
    </div>
  );
}

export default ItemKitsForm;




























