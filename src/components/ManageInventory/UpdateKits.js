import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultHandle from "../DefaultHandle";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/item-kit.css";

function ItemKitsUpdate() {
  // Extracting ID parameter from URL using useParams hook
  const { id } = useParams();
  const navigate = useNavigate();

  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({
    itemKitId: "",
    itemKitName: "",
    itemDescription: "",
    price: 0,
    kitQuantity: "",
    items: [],
    itemQuantity: [],
  });

  // Fetch all items from the inventory
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

  // Handle search input
  const [searchItem, setSearchItem] = useState("");

  // Fetch item kit data by ID when the component mounts
  useEffect(() => {
    const fetchItemKitData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/itemkit/${id}`);
        if (response.data.success) {
          const itemKitData = response.data.data;
          setFormData({
            itemKitId: itemKitData.itemKitId,
            itemKitName: itemKitData.itemKitName,
            itemDescription: itemKitData.itemDescription,
            price: itemKitData.price,
            kitQuantity: itemKitData.kitQuantity,
            items: itemKitData.items,
            itemQuantity: itemKitData.itemQuantity,
          });
        } else {
          console.error("Failed to fetch item kit data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item kit data:", error);
      }
    };

    fetchItemKitData();
  }, [id]);

  // Function to handle quantity change
  const handleQuantityChange = (e, item) => {
    setInventoryItems(
      inventoryItems.map((i) =>
        i._id === item._id ? { ...i, quantity: e.target.value } : i
      )
    );
  };

 // Function to add an item to the kit
const addItemToKit = (item) => {
  // Check if the item is already in the kit
  const itemIndex = formData.items.findIndex((i) => i._id === item._id);
  if (itemIndex >= 0) {
    // Remove the item from the kit
    const newItems = formData.items.filter((_, index) => index!== itemIndex);
    const newItemQuantities = formData.itemQuantity.filter(
      (_, index) => index!== itemIndex
    );
    const newPrice = formData.price - item.sellingPrice * item.quantity;

    setFormData((prevFormData) => ({
     ...prevFormData,
      items: newItems,
      itemQuantity: newItemQuantities, // This should now be an array with the correct length
      price: newPrice,
    }));
  } else {
    // Add the item to the kit
    const itemTotalPrice = item.sellingPrice * item.quantity;
    setFormData((prevFormData) => ({
     ...prevFormData,
      items: [...prevFormData.items, item],
      itemQuantity: [...(prevFormData.itemQuantity || []), item.quantity], // Ensure itemQuantity is treated as an array
      price: prevFormData.price + itemTotalPrice,
    }));
    // Deduct the item quantity from the inventory
    setInventoryItems((prevInventoryItems) =>
      prevInventoryItems.map((i) =>
        i._id === item._id
        ? {...i, quantity: i.quantity - item.quantity }
          : i
      )
    );
  }
  // Clear the search field after adding an item to the kit
  setSearchItem("");
};


  //Function to check if item kit ID already exists
  const checkIfItemKitIdExists = async (itemKitId) => {
    try {
      // Fetch item kit data from the backend API
      const response = await axios.get(
        `http://localhost:8000/itemkit/check/${itemKitId}`
      );
      const { exists } = response.data;

      // If the item kit ID exists in the database
      if (exists) {
        // Fetch the item kit data by ID
        const itemKitData = await axios.get(
          `http://localhost:8000/itemkit/${id}`
        );
        // If the fetched item kit ID is the same as the current item kit's ID, return false (no conflict)
        if (itemKitData.data.data.itemKitId === itemKitId) {
          return false;
        } else {
          // If the fetched item kit ID is different, return true (conflict)
          return true;
        }
      }
      // If the item kit ID doesn't exist in the database, return false (no conflict)
      return exists;
    } catch (error) {
      console.error("Error checking if item kit ID exists:", error);
      return false; // Default to no conflict on error
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    // Checking if item kit ID already exists
    const itemKitIdExists = await checkIfItemKitIdExists(formData.itemKitId);
    if (itemKitIdExists) {
      message.error(
        "An item kit with this ID already exists. Please choose a different ID."
      );
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/itemkit/update/${id}`,
        formData
      );
      console.log("Item kit submitted successfully:", response.data);
      message.success("Item kit update successful!");

      // Update inventory items' quantities based on the items included in the kit
      setInventoryItems((prevInventoryItems) =>
        prevInventoryItems.map((i) =>
          formData.items.some((item) => item._id === i._id)
            ? {
                ...i,
                quantity:
                  i.quantity -
                  formData.items.find((item) => item._id === i._id).quantity,
              }
            : i
        )
      );
      navigate("/admin/inventory/item-kits");
    } catch (error) {
      console.error("Failed to submit item kit:", error.response.data);
      message.error("Error ocurred when creating item kit..");
    }
  };
  // Function to remove an item from the kit
  const removeItemFromKit = (item) => {
    const updatedItems = formData.items.filter((i) => i._id !== item._id);
    const updatedQuantities = formData.itemQuantity.filter(
      (_, index) =>
        index !== formData.items.findIndex((i) => i._id === item._id)
    );
    const updatedPrice = formData.price - item.sellingPrice * item.quantity;
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: updatedItems,
      itemQuantity: updatedQuantities,
      price: updatedPrice,
    }));
  };
  return (
    <>
      <div className="item_kit">
        <DefaultHandle>
          <div className="container">
            <div className="item_kit">
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
                        message.error(
                          "Kit quantity must be a positive number."
                        );
                        return;
                      }
                      setFormData({ ...formData, kitQuantity: e.target.value });
                    }}
                  />
                  <button type="submit" className="btn">
                    Create Item Kit
                  </button>
                </form>
              </div>
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
                    <th>Quantity</th>
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
                        <td>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              if (e.target.value < 0) {
                                message.error(
                                  "Item quantity must be a positive number."
                                );
                                return;
                              }
                              handleQuantityChange(e, item);
                            }}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => addItemToKit(item)}
                            style={{
                              padding: "5px 10px",
                              fontSize: "12px",
                              marginRight: "5px",
                            }}
                            className="table_btn"
                          >
                            Add to Kit
                          </button>
                          <button
                            onClick={() => removeItemFromKit(item)}
                            style={{ padding: "5px 10px", fontSize: "12px" }}
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
          </div>
        </DefaultHandle>
      </div>
    </>
  );
}

export default ItemKitsUpdate;
