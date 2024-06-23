// src/AppRoutes.tsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Opportunities from "./pages/Opportunities";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Opportunities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
