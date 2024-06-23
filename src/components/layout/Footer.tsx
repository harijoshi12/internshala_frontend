// src/components/layout/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} Internship Portal. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
