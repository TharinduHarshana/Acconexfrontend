import React, { useState, useEffect } from "react";
import { message } from "antd";
import DefaultHandle from "../DefaultHandle";
import Select, { components } from "react-select";
import axios from "axios";
import "../../styles/item-kits-form.css";
import { useNavigate } from "react-router-dom";

function ItemKitsForm() {
  const navigate = useNavigate();
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
  const [totalPrice, setTotalPrice] = useState(0);
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

  useEffect(() => {
    // Calculate total price when selected items change
    const selectedItemsTotalPrice = formData.selectedItems.reduce(
      (total, item) => {
        const selectedItem = inventoryItems.find(
          (inventoryItem) => inventoryItem._id === item.value
        );
        return total + selectedItem.sellingPrice;
      },
      0
    );
    setTotalPrice(selectedItemsTotalPrice);
  }, [formData.selectedItems, inventoryItems]);

  const handleChange = (e) => {
    if (e.target.name === "quantity" && parseInt(e.target.value, 10) < 0) {
      // Set the quantity to 0
      setFormData({ ...formData, [e.target.name]: 0 });
    } else if (e.target.name === "price" && parseFloat(e.target.value) < 0) {
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

    // Calculate the new total price by adding the price of the newly selected items
    const newTotalPrice = selectedItems.reduce((total, item) => {
      const selectedItem = inventoryItems.find(
        (inventoryItem) => inventoryItem._id === item.value
      );
      return total + selectedItem.sellingPrice;
    }, totalPrice); // Start with the existing totalPrice

    setFormData({
      ...formData,
      selectedItems: formattedSelectedItems,
      price: newTotalPrice, // Update the price with the new total price
    });
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
    console.log("Form data before validation:", formData);
    console.log("Selected items length:", formData.selectedItems.length);

    if (
      !formData.itemKitId ||
      !formData.itemKitName ||
      !formData.itemDescription ||
      !formData.price ||
      !formData.quantity ||
      !formData.selectedItems.length
    ) {
      message.error("Please fill out all fields before submitting the form.");
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
      message.success("Item kit create successful!");
      navigate("/admin/inventory/item-kits") ;
     
    } catch (error) {
      console.error("Error creating item kit:", error);
      setErrorMessage("Failed to create item kit. Please try again.");
    }
  };

  return (
    <>
      <DefaultHandle>
        <div className="item-kits-form">
          <h2>Item Kit</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="itemKitId">Item Kit ID:</label>
            <input
              type="text"
              id="itemKitId"
              name="itemKitId"
              value={formData.itemKitId}
              onChange={handleChange}
              color="red"
            />

            <label htmlFor="itemKitName">Item Kit Name:</label>
            <input
              type="text"
              id="itemKitName"
              name="itemKitName"
              value={formData.itemKitName}
              onChange={handleChange}
              color="red"
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
              color="red"
              isMulti
              className={`select-container ${
                !formData.selectedItems.length && "error"
              }`}
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
