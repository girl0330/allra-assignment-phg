// src/api/client.ts
'use client';

import axios from 'axios';
import {useTokenStore, getAccessToken, clearTokens, setTokens, getRefreshToken} from '@/store/tokenStore';
import {queryClient} from '@/lib/react-query';
import {refreshTokenApi} from '@/lib/api/auth';

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use((config) => {
    const token = getAccessToken(); // persist된 토큰을 항상 읽음
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

            // accessToken이 없을때 초기화
            if (!accessToken) {
                clearTokens();
                queryClient.removeQueries({queryKey: ['auth', 'me']});

            } else {

                try {
                    const rt = getRefreshToken();
                    if (!rt) {
                        clearTokens();
                        queryClient.removeQueries({queryKey: ['auth', 'me']});
                        return Promise.reject(err);
                    }

                    // refreshToken이 있으면 갱신
                    const data = await refreshTokenApi(rt);
                    // 토큰 저장소 업데이트
                    setTokens({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        atExpSec: data.accessTokenExpiresIn,
                        rtExpSec: data.refreshTokenExpiresIn,
                    });

                    // 실패했던 원래 요청 재시도
                    err.config.headers.Authorization = `Bearer ${data.accessToken}`;
                    return api(err.config);
                } catch (refreshErr) {
                    clearTokens();
                    queryClient.removeQueries({queryKey: ['auth', 'me']});
                    return Promise.reject(refreshErr);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default api;
