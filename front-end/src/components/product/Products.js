import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import axiosInstance from "../../services/axiosInstance";
import NewProductModal from "./NewProductModal";
import { useAuth } from "../../hooks/auth";

const Products = () => {
  const { shopId } = useParams();
  let auth = useAuth();
  const navigate = useNavigate();
  const [shopName, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    fetchShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  const fetchShops = async () => {
    try {
      const { data } = await axiosInstance.get(`/shop/${shopId}`);
      setProducts(data.products);
      setName(data.name);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCreateProduct = async ({ name, price }) => {
    try {
      await axiosInstance.post("/product", {
        name,
        price,
        shop_id: shopId,
      });
      await fetchShops();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async ({ name, price }, id) => {
    try {
      await axiosInstance.put(`/product/${id}`, {
        name,
        price,
      });
      await fetchShops();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleLogout = () => {
    auth.signout(() => {
      navigate("/");
    });
  };

  return (
    <div className="products">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            color: "#007bff",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </span>
        <span style={{ fontWeight: "bold", fontSize: "32px" }}>
          All products of {shopName}
        </span>
        <button onClick={handleLogout} className="signout-button">
          Logout
        </button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            initialName={product.name}
            initialPrice={product.price}
            onDelete={handleDelete}
            updateProduct={updateProduct}
          />
        ))}
      </div>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="button is-primary"
        >
          Create New Product
        </button>
        <NewProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProduct}
        />
      </div>
    </div>
  );
};

export default Products;
