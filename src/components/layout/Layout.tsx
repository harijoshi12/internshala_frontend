// src/components/layout/Layout.tsx

import React from "react";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;