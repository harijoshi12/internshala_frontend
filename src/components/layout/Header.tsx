// src/components/layout/Header.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Internship Portal
      </Link>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <FaUserCircle className="h-8 w-8 text-gray-600" />
            <span>{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
