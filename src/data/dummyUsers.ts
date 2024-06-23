// src/data/dummyUsers.ts

import { User } from '../types/user';

export const dummyUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2024-01-10T12:00:00.000Z',
    role: 'user',
    isActive: true,
    appliedOpportunities: [65532, 65531]
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: '2023-02-15T00:00:00.000Z',
    lastLogin: '2024-01-09T14:30:00.000Z',
    role: 'user',
    isActive: true,
    appliedOpportunities: [65524]
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    createdAt: '2023-03-20T00:00:00.000Z',
    updatedAt: '2023-03-20T00:00:00.000Z',
    lastLogin: '2024-01-08T09:15:00.000Z',
    role: 'admin',
    isActive: true,
    appliedOpportunities: []
  },
  {
    id: '4',
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob@example.com',
    createdAt: '2023-04-05T00:00:00.000Z',
    updatedAt: '2023-04-05T00:00:00.000Z',
    lastLogin: '2024-01-07T16:45:00.000Z',
    role: 'user',
    isActive: false,
    appliedOpportunities: [65517, 65515]
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma@example.com',
    createdAt: '2023-05-10T00:00:00.000Z',
    updatedAt: '2023-05-10T00:00:00.000Z',
    lastLogin: '2024-01-06T11:20:00.000Z',
    role: 'user',
    isActive: true,
    appliedOpportunities: [65504]
  }
];