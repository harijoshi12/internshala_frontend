// src/pages/Opportunities.tsx

import React, { useState, useEffect } from "react";
import Pagination from "../components/common/Pagination";
import { getOpportunities } from "../services/api";
import { Opportunity } from "../types";
import Sidebar from "../components/opportunities/Sidebar";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import axios from "axios";

/**
 * Opportunities component to display a list of opportunities with pagination and filtering.
 */
const Opportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]); // State to store opportunities
  const [filterStatus, setFilterStatus] = useState<string>("all"); // State to store the current filter status
  const [currentPage, setCurrentPage] = useState<number>(1); // State to store the current page number
  const [totalPages, setTotalPages] = useState<number>(1); // State to store the total number of pages
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading spinner
  const [limit, setLimit] = useState<number>(3); // State for limit of opportunities per page

  /**
   * Fetch opportunities from the API based on the current page, limit, and filter status.
   */
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const response = await getOpportunities(
          currentPage,
          limit,
          filterStatus === "applied"
        );
        console.log("res in oppr page: ", response);
        if (response && response.success) {
          setOpportunities(response.data);
          setTotalPages(response.pagination.totalPages);
        } else {
          console.error("Failed to fetch opportunities", response?.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Failed to fetch opportunities",
            error.response?.data || error.message
          );
        } else {
          console.error(
            "Unexpected error during fetching opportunities",
            error
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [currentPage, limit, filterStatus]); // Add filterStatus to dependency array

  return (
    <div className="flex">
      {/* Sidebar component for filtering opportunities */}
      <Sidebar filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      <div className="w-3/4 p-4">
        {loading ? (
          <LoadingSpinner size="large" />
        ) : (
          <>
            {/* Map through the opportunities and render OpportunityCard components */}
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
              />
            ))}
            {/* Pagination component for navigating through pages */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
