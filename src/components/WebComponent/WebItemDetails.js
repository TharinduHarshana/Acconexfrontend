import React from 'react';
import { Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemDetails = ({ open, onClose, item, handleAddToCart }) => {
  return (
    <Modal
    title={item ? <div style={{ textAlign: 'center', fontSize:'25px' }}>{item.itemName}</div> : ''}
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      {item ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={item.imageLink} alt={item.itemName} className="img-thumbnail" />
              <h5 className="text-danger">
                <strong>Price: </strong> Rs. {item.sellingPrice}.00
              </h5>
            </div>
            <div className="col-md-6">
              <p style={{ whiteSpace: 'pre-wrap' }}>{item.description}</p>
              <button className="btn btn-success ml-1" onClick={() => handleAddToCart(item)}>
                <ShoppingCartOutlined /> Add to Cart
              </button>
              <button className="btn btn-danger ml-1" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No item details available</p>
      )}
    </Modal>
  );
};

export default ItemDetails;
