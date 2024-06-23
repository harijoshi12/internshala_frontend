// src/components/Opportunities/OpportunityCard.tsx

import React, { useState } from "react";
import { Opportunity } from "../../types";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

import { applyForOpportunity } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(true);
      try {
        await applyForOpportunity(opportunity._id);
        toast.success("Application successful!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to apply for the opportunity."
        );
        console.error("Apply error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex border p-4 rounded mb-4">
      <div className="w-1/5">
        <img
          src={opportunity.company_logo}
          alt={opportunity.company_name}
          className="w-full h-auto"
        />
      </div>
      <div className="w-4/5 pl-4">
        <h3 className="text-lg font-bold">
          Company: {opportunity.company_name}
        </h3>
        <p>Title: {opportunity.title}</p>
        <p>Profile: {opportunity.profile_name}</p>
        <p>Locations: {opportunity.location_names.join(", ")}</p>
        <p>Employment Type: {opportunity.employment_type}</p>
        <p>Stipend: {opportunity.stipend.salary}</p>
        <p>Duration: {opportunity.duration}</p>
        <p>Posted On: {opportunity.posted_on}</p>
        <p>Start Date: {opportunity.start_date}</p>
        <p>Expires On: {opportunity.expires_at}</p>
        <p>Employer: {opportunity.employer_name}</p>
        <Button
          onClick={handleApply}
          className="w-full mt-4"
          disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : "Apply"}
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;
