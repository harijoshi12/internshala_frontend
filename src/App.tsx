// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Opportunities from "./pages/Opportunities";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

/**
 * The main App component that sets up the routing and context providers for the application.
 */
const App: React.FC = () => {
  return (
    // AuthProvider provides authentication context to the entire application
    <AuthProvider>
      {/* Router sets up the routing for the application */}
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Header component displayed at the top of every page */}
          <Header />
          {/* Main content area that grows to fill the remaining space */}
          <main className="flex-grow">
            {/* Routes define the different pages of the application */}
            <Routes>
              {/* Route for the Opportunities page */}
              <Route path="/" element={<Opportunities />} />
              {/* Route for the Login page */}
              <Route path="/login" element={<Login />} />
              {/* Route for the Register page */}
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          {/* Footer component displayed at the bottom of every page */}
          <Footer />
        </div>
        {/* ToastContainer for displaying toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
