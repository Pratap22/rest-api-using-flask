import React, { useState } from "react";

const NewShopModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");

  const handleCreate = () => {
    onCreate(name);
    setName("");
    onClose();
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-content">
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={onClose}
        >Close</button>
        <div className="box">
          <h2 className="subtitle">Create New Shop</h2>
          <div className="field">
            <label className="label">Shop Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter shop name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button onClick={handleCreate} className="button is-primary">
            Create Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewShopModal;
