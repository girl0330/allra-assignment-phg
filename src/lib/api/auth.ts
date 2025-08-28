import { AxiosError } from 'axios';
import api from './client';
import { FormData } from '@/features/auth/schema/registerSchema';

export type LoginReq = { businessNumber: string; password: string };
export type LoginRes = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
};

export type UserInfoRes = {
  id: number;
  businessNumber: string;
  userName?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
};

export type MeResponse = {
  businessNumber: string;
  companyName: string;
};

// 사업자등록번호 인증하기
export async function verifyBusinessNumber(businessNumber: string) {
  const res = await api.post('/api/auth/verify-business-number', { businessNumber });
  return res.data;
}

// 회원가입
export async function registerUser(data: FormData) {
  const res = await api.post('/api/auth/register', data);
  return res.data;
}

// 로그인
export async function login(payload: LoginReq): Promise<LoginRes> {
  const { data } = await api.post<LoginRes>('/api/auth/login', payload);
  return data;
}

// 사용자 정보 조회
export async function userInfo(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>('/api/auth/me');
  return data;
}

// 엑세스 토큰 갱신
export async function refreshTokenApi(refreshToken: string) {
  const { data } = await api.post('/api/auth/refresh-token', { refreshToken });
  return data as {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
  };
}
