import React, { useState, useEffect } from "react";
import { message } from "antd";
import DefaultHandle from "../DefaultHandle";
import Select, { components } from "react-select";
import axios from "axios";
import "../../styles/item-kits-form.css";
import { useNavigate } from "react-router-dom";

function ItemKitsForm() {
  // Hook for navigation
  const navigate = useNavigate();
  // Custom component for displaying selected items in the dropdown
  const MultiValue = (props) => {
    // Defining custom MultiValue component
    return (
      // Rendering MultiValue component from react-select library
      <components.MultiValue {...props}>
        <span>{props.data.label}</span>
      </components.MultiValue>
    );
  };
  // State for form data
  const [formData, setFormData] = useState({
    itemKitId: "",
    itemKitName: "",
    itemDescription: "",
    price: "",
    quantity: "",
    selectedItems: [],
  });

  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([]);
  // State for total price of selected items
  const [totalPrice, setTotalPrice] = useState(0);
  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Effect hook to fetch inventory items on component mount
  useEffect(() => {
    // Defining asynchronous function to fetch inventory items
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/item/");
        if (response.data.success) {
          // Setting inventory items state with the fetched data
          setInventoryItems(response.data.data);
        } else {
          console.error("Failed to fetch inventory items:", response.data);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };
    // Calling the function to fetch inventory items
    fetchInventoryItems();
  }, []); // Dependency array is empty, so this effect runs only once after the initial render
  // Calculate total price when selected items change
  useEffect(() => {
    // Calculating total price of selected items
    const selectedItemsTotalPrice = formData.selectedItems.reduce(
      (total, item) => {
        // Calculating total price of selected items
        const selectedItem = inventoryItems.find(
          (inventoryItem) => inventoryItem._id === item.value
        );
        // Adding the selling price of the selected item to the total
        return total + selectedItem.sellingPrice;
      },
      0
    );
    setTotalPrice(selectedItemsTotalPrice); // Updating the total price state
  }, [formData.selectedItems, inventoryItems]); // Running this effect whenever selected items or inventory items change

  // Handling change event for input fields
  const handleChange = (e) => {
    // Checking if the changed field is quantity and value is less than 0
    if (e.target.name === "quantity" && parseInt(e.target.value, 10) < 0) {
      // Set the quantity to 0
      setFormData({ ...formData, [e.target.name]: 0 });
      // Checking if the changed field is price and value is less than 0
    } else if (e.target.name === "price" && parseFloat(e.target.value) < 0) {
      // Updating form data with price set to 0
      setFormData({ ...formData, [e.target.name]: 0 });
    } else {
      // Updating form data with the changed value
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  // Handling change event for selected items in the dropdown
  const handleItemSelectChange = (selectedItems) => {
    const formattedSelectedItems = selectedItems.map((item) => ({
      value: item.value,
      label: item.label,
    }));

    // Calculate the new total price by adding the price of the newly selected items
    const newTotalPrice = selectedItems.reduce((total, item) => {
      // Calculating new total price
      const selectedItem = inventoryItems.find(
        // Finding the selected item in the inventory items
        (inventoryItem) => inventoryItem._id === item.value
      );
      return total + selectedItem.sellingPrice; // Adding the selling price of the selected item to the total
    }, totalPrice); // Start with the existing totalPrice
    // Updating form data
    setFormData({
      ...formData,
      selectedItems: formattedSelectedItems, // Updating selected items with the formatted selected items
      price: newTotalPrice, // Update the price with the new total price
    });
  };
  // Function to check if item kit ID already exists
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
  // Handling form submission
  const handleSubmit = async (e) => {
    // Preventing default form submission behavior
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
      // If item kit ID already exists
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
          items: formData.selectedItems.map((item) => item.value), // Extracting item IDs from selected items
        }
      );
      console.log("Item kit created:", response.data.data);
      // Resetting form data after successful submission
      setFormData({
        itemKitId: "",
        itemKitName: "",
        itemDescription: "",
        price: "",
        quantity: "",
        selectedItems: [],
      });
      setErrorMessage(""); // Clear error message on successful submission
      message.success("Item kit create successful!"); // Showing success message
      // Navigating to item kits page after successful submission
      navigate("/admin/inventory/item-kits");
    } catch (error) {
      console.error("Error creating item kit:", error);
      setErrorMessage("Failed to create item kit. Please try again.");
    }
  };

  return (
    <>
      <DefaultHandle>
        <div className="item-kits-form">
          <h2></h2>
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
// Exporting ItemKitsForm component
export default ItemKitsForm;
