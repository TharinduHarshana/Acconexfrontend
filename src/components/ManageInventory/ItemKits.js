import React, { useState, useEffect } from "react";
import axios from "axios";
import { message,Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/item-kit.css";
import { DeleteTwoTone } from "@ant-design/icons";
import DefaultHandle from "../DefaultHandle";

function ItemKitsForm() {
  const navigate = useNavigate();

  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    itemKitId: "",
    itemKitName: "",
    itemDescription: "",
    price: 0,
    kitQuantity: "",
    items: [],
  });

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://acconex-backend.vercel.app/item/");
        if (response.data.success) {
          const itemsWithSelectedQuantity = response.data.data.map((item) => ({
            ...item,
            selectedQuantity: 0, 
          }));
          setInventoryItems(itemsWithSelectedQuantity);
        } else {
          console.error("Failed to fetch inventory items:", response.data);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
      finally {
        setLoading(false); 
      }
    };

    fetchInventoryItems();
  }, []);

  useEffect(() => {
    const fetchItemKits = async () => {
      try {
        const response = await axios.get("https://acconex-backend.vercel.app/itemkit/all", {
          withCredentials: true,
        });
        if (response.data.success) {
          const lastItemKitId =
            response.data.data.length > 0
              ? response.data.data[response.data.data.length - 1].itemKitId
              : "kitId000";
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

  const handleQuantityChange = (e, item) => {
    const newQuantity = parseInt(e.target.value);
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
  const showItemsModal = () => {
    if (formData.items.length === 0) {
      message.warning("No items added to this kit yet.");
      return;
    }
    setIsModalVisible(true);
  };
  
  const handleOk = () => {
    setIsModalVisible(false);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
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

    const existingItem = formData.items.find((i) => i._id === item._id);

    if (existingItem) {
      const updatedItems = formData.items.map((i) =>
        i._id === item._id
          ? { ...i, quantity: existingItem.quantity + selectedQuantity }
          : i
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        items: updatedItems,
        price: prevFormData.price + selectedQuantity * item.sellingPrice,
      }));
    } else {
      const newItem = { ...item, quantity: selectedQuantity };
      setFormData((prevFormData) => ({
        ...prevFormData,
        items: [...prevFormData.items, newItem],
        price: prevFormData.price + selectedQuantity * item.sellingPrice,
      }));
    }

    setInventoryItems(
      inventoryItems.map((i) =>
        i._id === item._id
          ? {
              ...i,
              quantity: i.quantity - selectedQuantity,
              selectedQuantity: 0,
            }
          : i
      )
    );
    setSearchTerm("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "itemKitId",
      "itemKitName",
      "itemDescription",
      "price",
      "kitQuantity",
      "items",
    ];

    const allFieldsFilled = requiredFields.every((field) => formData[field]);

    if (!allFieldsFilled || formData.items.length === 0) {
      message.error(
        "Please fill in all required fields and add at least one item to the kit."
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://acconexfrontend.vercel.app/itemkit/create",
        formData
      );
      message.success("Item kit created successfully!");

      const updatedInventoryItems = response.data.updatedInventoryItems;
      setInventoryItems(updatedInventoryItems);

      navigate("/admin/inventory/item-kits");
    } catch (error) {
      console.error("Failed to submit item kit:", error.response.data);
      message.error("Error occurred when creating item kit.");
    }
  };
   // Remove the item from the kit

  const removeItemFromKit = (itemId) => {
    Modal.confirm({
      title: "Confirm Removal",
      content: "Are you sure you want to remove this item from the kit?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const removedItem = formData.items.find((item) => item._id === itemId);
  
        
        const updatedItems = formData.items.filter((item) => item._id !== itemId);
  
        
        setFormData((prevFormData) => ({
          ...prevFormData,
          items: updatedItems,
          price:
            prevFormData.price - removedItem.quantity * removedItem.sellingPrice,
        }));
  
        // Update the inventory items to reflect the removal of the item from the kit
        setInventoryItems(
          inventoryItems.map((i) =>
            i._id === removedItem._id
              ? {
                  ...i,
                  quantity: i.quantity + removedItem.quantity, 
                }
              : i
          )
        );
      },
    });
  };
  


  const filteredItems = inventoryItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const NoItemsMessage = () => (
    <div style={{ color: 'red', fontWeight: 'bold' }}>
      No items found
    </div>
  );

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

              <label htmlFor="price">Total Kit Price(LKR):</label>
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

              <button type="submit" className="form_btn">
                Create Item Kit
              </button>
            </form>
          </div>

          <div className="item_kits table">
            <input
              className="search_input"
              type="text"
              placeholder="Search items by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "rgb(1, 1, 41)",
                color: "white",
                borderRadius: "3px",
                padding: "3px 7px",
                borderColor: "black",
                fontSize: "11px",
                marginRight:"10px",
                marginLeft: "5px",
                height:"30px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(1, 1, 41)";
                e.currentTarget.style.color = "white";
              }}
              onClick={showItemsModal}
            >
              See items in this Kit
            </button>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #ddd",
              }}
            >
              {filteredItems.length === 0 ? (
                <NoItemsMessage />
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity in Stock</th>
                      <th>Quantity to Add</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            value={item.selectedQuantity}
                            onChange={(e) => handleQuantityChange(e, item)}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => addItemToKit(item)}
                            style={{
                              backgroundColor: "rgb(1, 1, 41)",
                              color: "white",
                              borderRadius: "3px",
                              padding: "3px 7px",
                              borderColor: "black",
                              cursor: "pointer",
                              fontSize: "12px",
                              marginLeft: "5px",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                              e.currentTarget.style.color = "black";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = "rgb(1, 1, 41)";
                              e.currentTarget.style.color = "white";
                            }}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {/* Modal for displaying items in the kit */}
        <Modal
          title="Items in Kit"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
 
          ]}
        >
          <div className="item_kits form table">
          <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ddd",
              }}
            >
            {formData.items.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>
                  <DeleteTwoTone
                    onClick={() => removeItemFromKit(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in the kit yet.</p> 
      )}
            
            </div>
          </div>
        </Modal>
        </div>
      </DefaultHandle>
    </div>
  );
}

export default ItemKitsForm;
