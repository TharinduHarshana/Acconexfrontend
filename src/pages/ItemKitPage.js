import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, message, Space } from "antd";
import DefaultHandle from "../components/DefaultHandle";
 import "../styles/accessmodal.css"
import swal from 'sweetalert';
import {DeleteFilled } from '@ant-design/icons';

const ItemKit = () => {
  const [itemKit, setItemKit] = useState([]);
  const [filterKit, setFilterKit] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAccessDeniedVisible, setIsAccessDeniedVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItemKit = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://acconex-backend.vercel.app/itemkit/all", {
          withCredentials: true,
        });
        setItemKit(response.data.data);
        setFilterKit(response.data.data); // Initialize filterKit with fetched data
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setIsAccessDeniedVisible(true);
        } else {
          console.error("Error fetching item kit:", error);
          swal({
            title: "Error",
            text: "An error occurred while fetching item kits.",
            icon: "error",
            button: "OK",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    loadItemKit();
  }, [navigate]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://acconex-backend.vercel.app/itemkit/delete/${_id}`,{
        withCredentials:true,
      });
      setItemKit(itemKit.filter((itemKit) => itemKit._id !== _id));
      setFilterKit(filterKit.filter((itemKit) => itemKit._id !== _id)); 
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
      name: "Quantity",
      selector: (row) => row.kitQuantity,
      sortable: true,
    },
    {
      name: "Price (LKR)",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link onClick={() => showDeleteConfirmation(row._id)}><DeleteFilled/></Link>
        </div>
      ),
    },
  ];

  const closeModal = () => {
    setIsAccessDeniedVisible(false);
    navigate("/admin/dashboard");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
            type="text"
            placeholder="Search item kit..."
            onChange={filterKits}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              marginBottom: "12px",
              width: "300px",
              padding: "5px",
              border: isHovered ? "1px solid black" : "1px solid #ccc",
              borderRadius: "5px",
              transition: "border-color 0.3s",
            }}
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
          <Link to={"/admin/inventory/kits/add"} style={{ fontSize: "14px" }}>
            New Item Kit
          </Link>
        </div>

        <div
          style={{
            fontSize: "14px",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "20px",
            border: "1px solid #c9c5c2",
            borderRadius: "10px",
            padding: "5px 10px",
            marginLeft: "5px",
            textAlign: "center",
            width: "100px",
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
      <Modal
        title="Access Denied!"
        visible={isAccessDeniedVisible}
        onCancel={closeModal}
        footer={[
          <button onClick={closeModal} key="back">
            OK
          </button>,
        ]}
      >
        <p>You do not have permission to view this page.</p>
      </Modal>
    </DefaultHandle>
  );
};

export default ItemKit;
