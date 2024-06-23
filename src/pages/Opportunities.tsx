import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getOpportunities } from "../services/api";
import OpportunityList from "../components/opportunities/OpportunityList";
import FilterSidebar from "../components/opportunities/FilterSidebar";
import { Opportunity, OpportunityFilters } from "../types/opportunity";

const Opportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filters, setFilters] = useState<OpportunityFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    fetchOpportunities();
  }, [filters, currentPage]);

  const fetchOpportunities = async () => {
    try {
      const response = await getOpportunities({
        ...filters,
        page: currentPage,
        limit: 20,
      });
      setOpportunities(response.data.opportunities);
      setTotalPages(Math.ceil(response.data.total / 20));
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  const handleFilterChange = (newFilters: OpportunityFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <FilterSidebar onFilterChange={handleFilterChange} isLoggedIn={!!user} />
      <div className="flex-1">
        <OpportunityList
          opportunities={opportunities}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoggedIn={!!user}
        />
      </div>
    </div>
  );
};

export default Opportunities;
