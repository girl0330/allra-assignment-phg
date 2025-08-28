import { useTokenStore } from '@/store/tokenStore';
import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 요청 인터셉터: 매 요청마다 토큰 붙여줌
api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().tokens?.accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
