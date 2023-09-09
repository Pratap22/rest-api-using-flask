import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import PrivateRoute from "./routes/PrivateRoute";
import Shops from "./components/shop/Shops";
import LoginPage from "./components/auth/Login";
import Register from "./components/auth/Register";
import Products from "./components/product/Products";
import Home from "./components";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <Shops />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop/:shopId"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
