import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = async (credentials) => {
  try {
    console.log("Sending API request to login with:", credentials);
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/auth/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};