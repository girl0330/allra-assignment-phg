import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
