// src/pages/Opportunities.tsx

import React, { useState, useEffect } from "react";
import Pagination from "../components/common/Pagination";
import { getOpportunities } from "../services/api";
import { Opportunity } from "../types";
import Sidebar from "../components/opportunities/Sidebar";
import OpportunityCard from "../components/opportunities/OpportunityCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import axios from "axios";

const Opportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("new");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const response = await getOpportunities(currentPage);
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
  }, [currentPage]);

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const isApplied = opportunity.userApplication.some(
      (application) => application.status === "applied"
    );

    if (filterStatus === "new") {
      return !isApplied;
    } else if (filterStatus === "applied") {
      return isApplied;
    }
    return true;
  });

  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  return (
    <div className="flex">
      <Sidebar filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      <div className="w-3/4 p-4">
        {loading ? (
          <LoadingSpinner size="large" />
        ) : (
          <>
            {paginatedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
              />
            ))}
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
