import React, { useState } from "react";

const NewProductModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreate = () => {
    // Pass both name and price to onCreate
    onCreate({ name, price });

    // Reset the state
    setName("");
    setPrice(0);

    // Close the modal
    onClose();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-content">
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={onClose}
        >
          Close
        </button>
        <div className="box">
          <h2 className="subtitle">Create New Product</h2>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Product Price</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <button onClick={handleCreate} className="button is-primary">
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;
