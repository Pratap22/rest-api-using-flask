import React, { useState } from "react";

const ProductCard = ({
  id,
  initialName,
  initialPrice,
  onDelete,
  updateProduct,
}) => {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProduct({ name, price }, id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(initialName);
    setPrice(initialPrice);
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{name}</h3>
          <p>Price: {price}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
