'use client';

import axios from 'axios';
import { useTokenStore, getAccessToken, clearTokens, setTokens, getRefreshToken } from '@/store/tokenStore';
import { queryClient } from '@/lib/react-query';
import { refreshTokenApi } from '@/lib/api/auth';

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 401) {
      const accessToken = getAccessToken();

      if (!accessToken) {
        clearTokens();
        queryClient.removeQueries({ queryKey: ['auth', 'me'] });
      } else {
        try {
          const rt = getRefreshToken();
          if (!rt) {
            clearTokens();
            queryClient.removeQueries({ queryKey: ['auth', 'me'] });
            return Promise.reject(err);
          }

          const data = await refreshTokenApi(rt);
          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            atExpSec: data.accessTokenExpiresIn,
            rtExpSec: data.refreshTokenExpiresIn,
          });

          err.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(err.config);
        } catch (refreshErr) {
          clearTokens();
          queryClient.removeQueries({ queryKey: ['auth', 'me'] });
          return Promise.reject(refreshErr);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default api;
