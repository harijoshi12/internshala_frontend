// src/components/opportunities/OpportunityCard.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Opportunity } from "../../types/opportunity";
import Button from "../common/Button";
import OpportunityModal from "./OpportunityModal";

interface OpportunityCardProps {
  opportunity: Opportunity;
  isLoggedIn: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isLoggedIn,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Implement apply logic here
      console.log("Applying to opportunity:", opportunity.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{opportunity.profile_name}</h2>
      <p className="text-gray-600 mb-2">{opportunity.company_name}</p>
      <p className="text-gray-600 mb-2">
        Stipend: {opportunity.stipend.salary}
      </p>
      <p className="text-gray-600 mb-2">
        Location: {opportunity.location_names.join(", ")}
      </p>
      <p className="text-gray-600 mb-2">Duration: {opportunity.duration}</p>
      <p className="text-gray-600 mb-2">Start Date: {opportunity.start_date}</p>
      <div className="mt-4 flex justify-between">
        <Button onClick={() => setIsModalOpen(true)}>View Details</Button>
        <Button onClick={handleApply} disabled={!isLoggedIn}>
          {isLoggedIn ? "Apply" : "Login to Apply"}
        </Button>
      </div>
      <OpportunityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        opportunity={opportunity}
      />
    </div>
  );
};

export default OpportunityCard;
