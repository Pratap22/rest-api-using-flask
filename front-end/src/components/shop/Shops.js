import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import ShopCard from "./ShopCard";
import axiosInstance from "../../services/axiosInstance";
import NewShopModal from "./NewShopModal";

const Shops = () => {
  let navigate = useNavigate();
  let auth = useAuth();
  const [shops, setShops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axiosInstance.get("/shop");
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/shop/${id}`);
      setShops(shops.filter((shop) => shop.id !== id));
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  const handleShopClick = (id) => {
    navigate(`/shop/${id}`);
  };

  const handleLogout = () => {
    auth.signout(() => {
      navigate("/");
    });
  };

  const handleCreateShop = async (name) => {
    try {
      const response = await axiosInstance.post("/shop", { name });
      setShops([...shops, response.data]);
    } catch (error) {
      console.error("Error creating shop:", error);
    }
  };

  return (
    <div className="shops">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Home</Link>
        <span style={{ fontWeight: "bold", fontSize: "32px" }}>All Shops</span>
        <button onClick={handleLogout} className="signout-button">
          Logout
        </button>
      </div>

      <div className="shop-list">
        {shops.map((shop) => (
          <ShopCard
            key={shop.id}
            id={shop.id}
            name={shop.name}
            onDelete={handleDelete}
            onClick={handleShopClick}
          />
        ))}
      </div>

      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="button is-primary"
        >
          Create New Shop
        </button>
        <NewShopModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateShop}
        />
      </div>
    </div>
  );
};

export default Shops;
