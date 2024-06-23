// src/components/opportunities/Sidebar.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Define the props for the Sidebar component
interface SidebarProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

/**
 * Sidebar component for filtering opportunities by status.
 */
const Sidebar: React.FC<SidebarProps> = ({ filterStatus, setFilterStatus }) => {
  const { user } = useAuth(); // Get the current user from the authentication context
  const navigate = useNavigate(); // Hook to navigate programmatically

  /**
   * Handle filter button click.
   * @param status - The filter status to set.
   */
  const handleFilterClick = (status: string) => {
    if (status === "applied" && !user) {
      navigate("/login"); // Redirect to login page if user is not logged in
    } else {
      setFilterStatus(status); // Set the filter status
    }
  };

  return (
    <div className="w-1/4 p-4 border-r border-gray-200">
      <h2 className="text-xl font-bold mb-4">Filter by Status</h2>
      <div className="space-y-2">
        <button
          className={`w-full text-left p-2 rounded ${
            filterStatus === "all" ? "bg-blue-100" : ""
          }`}
          onClick={() => handleFilterClick("all")}>
          All Opportunities
        </button>
        <button
          className={`w-full text-left p-2 rounded ${
            filterStatus === "applied" ? "bg-blue-100" : ""
          }`}
          onClick={() => handleFilterClick("applied")}>
          Applied Opportunities
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
