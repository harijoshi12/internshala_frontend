// src/components/layout/Header.tsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";
import Button from "../common/Button";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Internship Portal
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.firstName}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
