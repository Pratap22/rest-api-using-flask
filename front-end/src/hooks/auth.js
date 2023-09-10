import React, { createContext, useContext, useState } from "react";
import axiosInstance, { updateAccessToken } from "../services/axiosInstance";

const AuthContext = createContext();

const apiProvider = {
  signin: async (username, password) => {
    try {
      const { data } = await axiosInstance.post("/login", {
        username,
        password,
      });
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      updateAccessToken(data.access_token);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  register: async (username, password) => {
    try {
      const { data } = await axiosInstance.post("/register", {
        username,
        password,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  signout: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        updateAccessToken(accessToken);
      }

      const { data } = await axiosInstance.delete("/logout");
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  },
};

function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("accessToken") ? true : false
  );

  const signin = async (username, password) => {
    try {
      const data = await apiProvider.signin(username, password);
      setLoggedIn(true);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      return await apiProvider.register(username, password);
    } catch (error) {
      throw error;
    }
  };

  const signout = async (callback) => {
    try {
      await apiProvider.signout();
      setLoggedIn(false);
    } catch (error) {
      throw error;
    } finally {
      callback();
    }
  };

  const value = { isLoggedIn, signin, signout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
