'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Tokens = {
  accessToken: string;
  refreshToken: string;
  atExpSec: number;
  rtExpSec: number;
};

type TokenState = {
  tokens: Tokens | null;
  setTokens: (t: Tokens) => void;
  clearTokens: () => void;
};

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      tokens: null,
      setTokens: (t) => set({ tokens: t }),
      clearTokens: () => set({ tokens: null }),
    }),
    {
      name: 'auth:tokens',
      partialize: (s) => ({ tokens: s.tokens }),
    }
  )
);

// 전역 helper
export const setTokens = (t: Tokens) => useTokenStore.getState().setTokens(t);
export const clearTokens = () => useTokenStore.getState().clearTokens();

// 편의 getter
export const getAccessToken = () => useTokenStore.getState().tokens?.accessToken ?? null;
export const getRefreshToken = () => useTokenStore.getState().tokens?.refreshToken ?? '';
