import { create } from 'zustand';

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

export const useTokenStore = create<TokenState>((set) => ({
  tokens: null,
  setTokens: (t) => set({ tokens: t }),
  clearTokens: () => set({ tokens: null }),
}));

export const setTokens = (t: Tokens) => useTokenStore.getState().setTokens(t);
export const clearTokens = () => useTokenStore.getState().clearTokens();
