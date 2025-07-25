import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// Add error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export interface User {
  _id: string;
  name: string;
  totalPoints: number;
  rank: number;
}

export interface ClaimResponse {
  userId: string;
  points: number;
  total: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get('/api/users');
  return res.data;
};

export const addUser = async (name: string): Promise<User> => {
  const res = await api.post('/api/users', { name });
  return res.data;
};

export const claimPoints = async (userId: string): Promise<ClaimResponse> => {
  const res = await api.post('/api/claim', { userId });
  return res.data;
};
