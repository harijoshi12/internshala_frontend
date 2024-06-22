// src/services/api.ts

import axios from 'axios';
import { Opportunity, OpportunityFilters } from '../types/opportunity';
import { User, LoginCredentials, RegisterCredentials } from '../types/user';

const BASE_URL = 'http://api-base-url.com/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API functions
export const register = (credentials: RegisterCredentials) =>
  api.post<{ user: User; token: string }>('/auth/register', credentials);

export const login = (credentials: LoginCredentials) =>
  api.post<{ user: User; token: string }>('/auth/login', credentials);

export const getCurrentUser = () =>
  api.post<User>('/auth/user');

// Opportunity API functions
export const getOpportunities = (filters?: OpportunityFilters) =>
  api.get<{ opportunities: Opportunity[]; total: number }>('/opportunities', { params: filters });

export const getOpportunityById = (id: number) =>
  api.get<Opportunity>(`/opportunities/${id}`);

export const applyToOpportunity = (id: number) =>
  api.post(`/opportunities/apply/${id}`);

export const getAppliedOpportunities = () =>
  api.get<Opportunity[]>('/opportunities/applied');

export default api;