import type { FormData } from '@/features/auth/schema/registerSchema';
import { setTokens } from '@/store/tokenStore';
import {verifyBusinessNumber, registerUser, login, type LoginReq, userInfo} from '@/lib/api/auth';
import { useMutation, useQueryClient} from '@tanstack/react-query';

// 회원가입
export function useRegisterUser() {
  return useMutation({
    mutationFn: (payload: FormData) => registerUser(payload),
    retry: 0,
    networkMode: 'always',
  });
}

// 사업자번호 조회
export function useVerifyBizNo() {
  return useMutation({
    mutationFn: (businessNumber: string) => verifyBusinessNumber(businessNumber),
    retry: 0,
  });
}

// 로그인
export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (LoginReq: LoginReq) => {
      const res = await login(LoginReq);

      // 토큰 저장 (인터셉터에서 이후 요청 자동 부착)
      setTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        atExpSec: res.accessTokenExpiresIn,
        rtExpSec: res.refreshTokenExpiresIn,
      });

      return res;
    },
    onSuccess: async () => {
      // 로그인 성공 후 내정보 조회
      await userInfo();
    },
  });
}
