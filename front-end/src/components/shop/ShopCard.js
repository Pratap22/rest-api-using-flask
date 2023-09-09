import React from 'react';

const ShopCard = ({ id, name, onDelete, onClick }) => {
  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className="shop-card" onClick={handleClick}>
      <h3>{name}</h3>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default ShopCard;
