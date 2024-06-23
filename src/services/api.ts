// src/services/api.ts

import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse, Opportunity } from '../types';

// Base URL for the API
const BASE_URL = 'https://internship-portal-0ey7.onrender.com/api/v1';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to handle errors
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API error:", error.response?.data || error.message);
  } else {
    console.error("Unexpected error:", error);
  }
  throw error;
};

// Auth endpoints
export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Opportunity endpoints
export const getOpportunities = async (page: number, limit: number, isApplied: boolean = false) => {
  try {
    const response = await api.get<{ success: boolean; data: Opportunity[]; pagination: { totalPages: number } }>(`/opportunities?page=${page}&limit=${limit}&isApplied=${isApplied}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const applyForOpportunity = async (id: string) => {
  try {
    const response = await api.post(`/opportunities/apply/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default api;