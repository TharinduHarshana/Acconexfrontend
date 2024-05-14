import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import DefaultHandle from "../components/DefaultHandle";
import { message, Modal, Space } from "antd";

const ItemKit = () => {
  const [itemKit, setItemKit] = useState([]);
  const [filterKit, setFilterKit] = useState([]);

  useEffect(() => {
    const loadItemKit = async () => {
      try {
        const response = await axios.get("http://localhost:8000/itemkit/all", {
          withCredentials: true,
        });
        setItemKit(response.data.data);
        setFilterKit(response.data.data); // Initialize filterKit with fetched data
      } catch (error) {
        console.error("Error Fetching item kit: ", error);
      }
    };
    loadItemKit();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/itemkit/delete/${_id}`);
      setItemKit(itemKit.filter((itemKit) => itemKit._id !== _id));
      setFilterKit(filterKit.filter((itemKit) => itemKit._id !== _id)); // Update filterKit as well
      message.success("Item kit deleted successfully!");
    } catch (error) {
      console.error("Error deleting item kit:", error);
      message.error("An error occurred while deleting the item kit.");
    }
  };

  const showDeleteConfirmation = (_id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this item kit?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(_id);
      },
    });
  };

  const filterKits = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const kitData = itemKit.filter(
      (row) =>
        row.itemKitName.toLowerCase().includes(searchValue) ||
        row.itemKitId.toLowerCase().includes(searchValue)
    );
    setFilterKit(kitData);
  };

  const columns = [
    {
      name: "ItemKit Id",
      selector: (row) => row.itemKitId,
      sortable: true,
    },
    {
      name: "ItemKit Name",
      selector: (row) => row.itemKitName,
      sortable: true,
    },
    {
      name: "ItemKit Description",
      selector: (row) => row.itemDescription,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link to={`/admin/inventory/kits/update/${row._id}`}>Edit</Link>
          <span style={{ margin: "0 8px" }}>|</span>
          <Link onClick={() => showDeleteConfirmation(row._id)}>Delete</Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <DefaultHandle>
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <input
              style={{ marginBottom: "12px", width: "200px" }}
              type="text"
              className="input"
              placeholder="Search item kit..."
              onChange={filterKits}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <Space size={12}></Space>
            <Link to={"/admin/inventory/kits/add"} style={{ fontSize: "16px" }}>
              New Item Kit
            </Link>
          </div>

          <div
            style={{
              fontSize: "14px",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)", 
              fontWeight: "bold",
              marginBottom: "20px",
              border: "1px solid #c9c5c2",
              borderRadius: "10px", // Adjust the value as needed
              padding: "5px ",
              marginLeft:"5px",
              textAlign:"center",
              width:"100px"
            }}
          >
            Total Kit {itemKit.length}
          </div>

          <DataTable
            columns={columns}
            data={filterKit}
            selectableRows
            fixedHeader
            pagination
          />
        </div>
      </DefaultHandle>
    </>
  );
};

export default ItemKit;