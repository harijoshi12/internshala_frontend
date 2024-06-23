// src/components/opportunities/Sidebar.tsx

import React from "react";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filterStatus, setFilterStatus }) => {
  const { user } = useAuth();

  return (
    <div className="w-1/4 p-4 border-r border-gray-200">
      <h2 className="text-xl font-bold mb-4">Filter by Status</h2>
      <div className="space-y-2">
        <button
          className={`w-full text-left p-2 rounded ${
            filterStatus === "all" ? "bg-blue-100" : ""
          }`}
          onClick={() => setFilterStatus("all")}>
          All Opportunities
        </button>
        <button
          className={`w-full text-left p-2 rounded ${
            filterStatus === "applied" ? "bg-blue-100" : ""
          }`}
          onClick={() => setFilterStatus("applied")}
          disabled={!user}>
          Applied Opportunities
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
