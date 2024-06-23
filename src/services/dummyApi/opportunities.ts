// src/services/dummyApi/opportunities.ts

import { Opportunity, OpportunityFilters } from '../../types/opportunity';
import { dummyOpportunities } from '../../data/dummyOpportunities';

let appliedOpportunities: { userId: string; opportunityId: number }[] = [];

export const getOpportunities = async (filters?: OpportunityFilters): Promise<{ opportunities: Opportunity[]; total: number }> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  let filteredOpportunities = dummyOpportunities;

  if (filters) {
    if (filters.location) {
      filteredOpportunities = filteredOpportunities.filter(opp =>
        opp.location_names.some(loc => loc.toLowerCase().includes(filters.location!.toLowerCase()))
      );
    }
    if (filters.stipend) {
      filteredOpportunities = filteredOpportunities.filter(opp =>
        opp.stipend.salaryValue1 >= filters.stipend!
      );
    }
    if (filters.startDate) {
      filteredOpportunities = filteredOpportunities.filter(opp =>
        new Date(opp.start_date) >= new Date(filters.startDate!)
      );
    }
  }

  const page = filters?.page || 1;
  const limit = filters?.limit || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    opportunities: filteredOpportunities.slice(start, end),
    total: filteredOpportunities.length,
  };
};

export const getOpportunityById = async (id: number): Promise<Opportunity> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const opportunity = dummyOpportunities.find(opp => opp.id === id);
  if (!opportunity) {
    throw new Error('Opportunity not found');
  }
  return opportunity;
};

export const applyToOpportunity = async (userId: string, opportunityId: number): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const alreadyApplied = appliedOpportunities.some(
    app => app.userId === userId && app.opportunityId === opportunityId
  );
  if (alreadyApplied) {
    throw new Error('Already applied to this opportunity');
  }
  appliedOpportunities.push({ userId, opportunityId });
};

export const getAppliedOpportunities = async (userId: string): Promise<Opportunity[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const appliedIds = appliedOpportunities
    .filter(app => app.userId === userId)
    .map(app => app.opportunityId);
  return dummyOpportunities.filter(opp => appliedIds.includes(opp.id));
};