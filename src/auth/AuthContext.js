import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Handle login
  const login = (token) => {
    localStorage.setItem("token", token); // Save token in localStorage
    setIsAuthenticated(true); // Update state to true
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update state to false
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
