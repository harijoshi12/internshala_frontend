import React from "react";
import Modal from "../common/Modal";
import { Opportunity } from "../../types/opportunity";
import Button from "../common/Button";

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity;
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({
  isOpen,
  onClose,
  opportunity,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4">
        {opportunity.profile_name}
      </h2>
      <p className="text-gray-600 mb-2">Company: {opportunity.company_name}</p>
      <p className="text-gray-600 mb-2">
        Stipend: {opportunity.stipend.salary}
      </p>
      <p className="text-gray-600 mb-2">
        Location: {opportunity.location_names.join(", ")}
      </p>
      <p className="text-gray-600 mb-2">Duration: {opportunity.duration}</p>
      <p className="text-gray-600 mb-2">Start Date: {opportunity.start_date}</p>
      <p className="text-gray-600 mb-4">
        Application Deadline: {opportunity.application_deadline}
      </p>
      <div className="mt-6">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default OpportunityModal;
