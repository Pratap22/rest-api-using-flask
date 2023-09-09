import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const PrivateRoute = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();
  console.log("Herr")
  if (!auth.isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
