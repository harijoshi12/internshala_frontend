// src/components/layout/Header.tsx

import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Button from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Header component for the application.
 * Displays the logo, login/register buttons, or user avatar and email if logged in.
 */
const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Get the current user and logout function from the authentication context
  const navigate = useNavigate(); // Hook to navigate programmatically

  /**
   * Handle logout button click.
   */
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to the login page
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo or application name */}
      <Link
        to="/"
        className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
        <FaBriefcase className="text-2xl" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Internship Portal
        </span>
      </Link>
      <div>
        {user ? (
          // Display user avatar, email, and logout button if user is logged in
          <div className="flex items-center space-x-4">
            <FaUserCircle className="h-8 w-8 text-gray-600" />
            <span>{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          // Display login and register buttons if user is not logged in
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
