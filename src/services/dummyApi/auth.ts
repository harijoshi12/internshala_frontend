// src/services/dummyApi/auth.ts

import { User, LoginCredentials, RegisterCredentials } from '../../types/user';
import { dummyUsers } from '../../data/dummyUsers';

// Simulating a delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const register = async (credentials: RegisterCredentials): Promise<{ user: User; token: string }> => {
  await delay(500);
  const newUser: User = {
    id: (dummyUsers.length + 1).toString(),
    ...credentials,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    role: 'user',
    isActive: true,
    appliedOpportunities: []
  };
  dummyUsers.push(newUser);
  return { user: newUser, token: 'dummy_token_' + newUser.id };
};

export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  await delay(500);
  const user = dummyUsers.find(u => u.email === credentials.email);
  if (user && user.isActive) {
    user.lastLogin = new Date().toISOString();
    return { user, token: 'dummy_token_' + user.id };
  }
  throw new Error('Invalid credentials or inactive user');
};

export const getCurrentUser = async (token: string): Promise<User> => {
  await delay(500);
  const userId = token.split('_')[2];
  const user = dummyUsers.find(u => u.id === userId);
  if (user) {
    return user;
  }
  throw new Error('User not found');
};