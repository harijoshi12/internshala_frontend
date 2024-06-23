// src/components/Opportunities/OpportunityCard.tsx

import React, { useState } from "react";
import { Opportunity } from "../../types";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import { applyForOpportunity } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

// Define the props for the OpportunityCard component
interface OpportunityCardProps {
  opportunity: Opportunity;
}

/**
 * OpportunityCard component to display individual opportunity details.
 */
const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { user } = useAuth(); // Get the current user from the authentication context
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [isApplied, setIsApplied] = useState(
    opportunity.userApplication.some(
      (application) => application.status === "applied"
    )
  ); // State to check if the opportunity is already applied

  /**
   * Handle the apply button click.
   */
  const handleApply = async () => {
    if (!user) {
      navigate("/login"); // Redirect to login page if user is not logged in
    } else {
      setLoading(true);
      try {
        await applyForOpportunity(opportunity._id); // Call the API to apply for the opportunity
        toast.success("Application successful!"); // Show success toast notification
        setIsApplied(true); // Update the state to reflect the applied status
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to apply for the opportunity."
        ); // Show error toast notification
        console.error("Apply error:", error);
      } finally {
        setLoading(false); // Hide the loading spinner
      }
    }
  };

  /**
   * Get the initial letter of the company name.
   * @param name - The company name.
   * @returns The initial letter of the company name.
   */
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex border p-4 rounded mb-4">
      <div className="w-1/5 flex flex-col items-center justify-center bg-gray-200 p-4 rounded">
        <div className="text-4xl font-bold">
          {getInitial(opportunity.company_name)}
        </div>
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
          disabled={loading || isApplied}>
          {loading ? (
            <LoadingSpinner size="small" />
          ) : isApplied ? (
            "Applied"
          ) : (
            "Apply"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;
