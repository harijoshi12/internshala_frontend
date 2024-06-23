export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  appliedOpportunities: number[]; // Array of opportunity IDs
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}