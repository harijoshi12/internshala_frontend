// src/components/opportunities/OpportunityList.tsx

import React from "react";
import OpportunityCard from "./OpportunityCard";
import Pagination from "../common/Pagination";
import { Opportunity } from "../../types/opportunity";

interface OpportunityListProps {
  opportunities: Opportunity[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoggedIn: boolean;
}

const OpportunityList: React.FC<OpportunityListProps> = ({
  opportunities,
  currentPage,
  totalPages,
  onPageChange,
  isLoggedIn,
}) => {
  return (
    <div className="space-y-4">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isLoggedIn={isLoggedIn}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default OpportunityList;
