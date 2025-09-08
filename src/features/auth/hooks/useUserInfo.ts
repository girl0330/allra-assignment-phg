'use client';

import { useQuery } from '@tanstack/react-query';
import { userInfo, type UserInfoRes, type MeResponse } from '@/lib/api/auth';

export function useUserInfo() {
  return useQuery<MeResponse>({
    queryKey: ['auth','me'],
    queryFn: userInfo,
    staleTime: 5 * 60 * 1000,
  });
}
