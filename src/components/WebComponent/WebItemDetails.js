import React from 'react';
import { Modal, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemDetails = ({ open, onClose, item, handleAddToCart }) => {
  // Function to parse the plain description string into an object
  const parseDescription = (description) => {
    const lines = description.split('\n');
    const descriptionObject = {};
    lines.forEach(line => {
      const [key, value] = line.split(':').map(part => part.trim());
      if (key && value) {
        descriptionObject[key] = value;
      }
    });
    return descriptionObject;
  };

  const description = item && item.description ? parseDescription(item.description) : {};

  const addToCart = (item) => {
    if (item.quantity > 0) {
      handleAddToCart(item);
    } else {
      message.error('This item cannot be added to the cart!');
    }
  };

  return (
    <Modal
      title={<div style={{ textAlign: 'center', fontSize:'25px' }}>{item ? item.itemName : ''}</div>}
      centered
      visible={open} // changed from open to visible as per Ant Design Modal prop
      onOk={onClose}
      onCancel={onClose}
      width={1500}
      footer={null}
    >
      {item ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={item.imageLink} alt={item.itemName} className="img-thumbnail" />
              <h5 className="text-danger mt-3"><strong>Price: </strong> Rs. {item.sellingPrice}.00</h5>
            </div>
            <div className="col-md-6">
              <div className="mt-3 p-3 border rounded bg-light">
                <h6>Description:</h6>
                <table className="table table-bordered">
                  <tbody>
                    {Object.entries(description).map(([key, value], index) => (
                      <tr key={index}>
                        <th>{key}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3">
                <button className="btn btn-success mr-2" onClick={() => addToCart(item)}>
                  <ShoppingCartOutlined /> Add to Cart
                </button>
                <button className="btn btn-danger" onClick={onClose}>
                  Cancel
                </button>
              </div>
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
