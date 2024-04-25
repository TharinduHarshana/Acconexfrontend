import React, { useState, useEffect } from "react";
import { message } from "antd";
import DefaultHandle from "../DefaultHandle";
import Select, { components } from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/item-kits-form.css";

function UpdateKitsForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const MultiValue = (props) => {
    return (
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );
  };

  const [itemKit, setItemKit] = useState({
    itemKitId: "",
    itemKitName: "",
    itemDescription: "",
    price: "",
    quantity: "",
    selectedItems: [],
  });

  const [inventoryItems, setInventoryItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchItemKitData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/itemkit/${id}`);
        if (response.data.success) {
          const itemKitData = response.data.data;
          let selectedItems = [];

          if (itemKitData.items && itemKitData.items.length > 0) {
            selectedItems = inventoryItems.filter((item) =>
              itemKitData.items.includes(item._id)
            );
          } else if (itemKitData.item) {
            const item = inventoryItems.find(
              (item) => item._id === itemKitData.item
            );
            if (item) {
              selectedItems = [item];
            }
          }

          setItemKit({
            ...itemKit,
            itemKitId: itemKitData.itemKitId,
            itemKitName: itemKitData.itemKitName,
            itemDescription: itemKitData.itemDescription,
            price: itemKitData.price,
            quantity: itemKitData.quantity,
            selectedItems: selectedItems.map((item) => ({
              value: item._id,
              label: item.itemName,
            })),
          });
          setLoading(false); // Set loading to false after successfully fetching data
        } else {
          console.error("Failed to fetch item kit data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item kit data:", error);
      }
    };

    fetchItemKitData();
  }, [id, inventoryItems]); // Include inventoryItems dependency

  useEffect(() => {
    const selectedItemsTotalPrice = itemKit.selectedItems.reduce(
      (total, item) => {
        const selectedItem = inventoryItems.find(
          (inventoryItem) => inventoryItem._id === item.value
        );
        return total + selectedItem.sellingPrice;
      },
      0
    );
    setTotalPrice(selectedItemsTotalPrice);
  }, [itemKit.selectedItems, inventoryItems]);

  const handleChange = (e) => {
    if (e.target.name === "quantity" && parseInt(e.target.value, 10) < 0) {
      setItemKit({ ...itemKit, [e.target.name]: 0 });
    } else if (e.target.name === "price" && parseFloat(e.target.value) < 0) {
      setItemKit({ ...itemKit, [e.target.name]: 0 });
    } else {
      setItemKit({ ...itemKit, [e.target.name]: e.target.value });
    }
  };

  const handleItemSelectChange = (selectedItems) => {
    const formattedSelectedItems = selectedItems.map((item) => ({
      value: item.value,
      label: item.label,
    }));

    const newTotalPrice = selectedItems.reduce((total, item) => {
      const selectedItem = inventoryItems.find(
        (inventoryItem) => inventoryItem._id === item.value
      );
      return total + selectedItem.sellingPrice;
    }, 0);

    setItemKit({
      ...itemKit,
      selectedItems: formattedSelectedItems,
      price: newTotalPrice,
    });
  };

  // Function to check if an item kit ID already exists in the database
  const checkItemKitIdExists = async (itemKitId) => {
    try {
       // Fetch item kit data from the backend API
       const response = await axios.get(`http://localhost:8000/itemkit/check/${itemKitId}`);
       const { exists } = response.data;
   
       // If the item kit ID exists in the database
       if (exists) {
         // Fetch the item kit data by ID
         const itemKitData = await axios.get(`http://localhost:8000/itemkit/${id}`);
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
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Selected items length:", itemKit.selectedItems.length);
    const itemIds = itemKit.selectedItems.map((item) => item.value);

    try {
      // Pass the current item kit's ID to exclude it from the conflict check
      const itemKitIdExists = await checkItemKitIdExists(itemKit.itemKitId);
      if (itemKitIdExists) {
        message.error("Item kit with this ID already exists! Try another Id..");
        return;
      }

      await axios.patch(`http://localhost:8000/itemkit/update/${id}`, {
        ...itemKit,
        items: itemIds,
      });
      console.log("Item Kit updated successfully:", itemKit);
      message.success("Item Kit Updated successfully!");
      navigate("/admin/inventory/item-kits");
    } catch (error) {
      console.error("Error updating item kit:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator until data is fetched
  }

  return (
    <>
      <DefaultHandle>
        <div className="item-kits-form">
          <h2>Item Kit Update</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="itemKitId">Item Kit ID:</label>
            <input
              type="text"
              id="itemKitId"
              name="itemKitId"
              value={itemKit.itemKitId}
              onChange={handleChange}
              color="red"
            />

            <label htmlFor="itemKitName">Item Kit Name:</label>
            <input
              type="text"
              id="itemKitName"
              name="itemKitName"
              value={itemKit.itemKitName}
              onChange={handleChange}
              color="red"
            />

            <label htmlFor="itemDescription">Item Description:</label>
            <input
              type="text"
              id="itemDescription"
              name="itemDescription"
              value={itemKit.itemDescription}
              onChange={handleChange}
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={itemKit.price}
              onChange={handleChange}
            />

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={itemKit.quantity}
              onChange={handleChange}
            />
            <label htmlFor="selectedItems">Selected Items:</label>
            <Select
              name="selectedItems"
              id="selectedItems"
              color="red"
              isMulti
              className={`select-container ${
                !itemKit.selectedItems.length && "error"
              }`}
              components={{ MultiValue }}
              options={inventoryItems.map((item) => ({
                value: item._id,
                label: item.itemName,
              }))}
              value={itemKit.selectedItems}
              onChange={handleItemSelectChange}
            />

            <button type="submit">Update Item Kit</button>
          </form>
        </div>
      </DefaultHandle>
    </>
  );
}

export default UpdateKitsForm;
