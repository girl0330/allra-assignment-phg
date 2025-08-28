'use client';

import { useRouter } from 'next/navigation';
import { useLogin, useVerifyBizNo } from '@/features/auth/hooks/authApiCall';
import type { UseFormReturn, UseFormSetError } from 'react-hook-form';
import type { LoginForm } from '@/features/auth/schema/loginSchema';

type Params = {
  handleSubmit: UseFormReturn<LoginForm>['handleSubmit'];
  setError: UseFormSetError<LoginForm>;
  callbackUrl: string;
};

export function useLoginSubmit({ handleSubmit, setError, callbackUrl }: Params) {
  const router = useRouter();
  const { mutateAsync: doLogin, isPending } = useLogin();
  const { mutateAsync: verifyBizNo } = useVerifyBizNo();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await doLogin({ businessNumber: data.businessNumber, password: data.password });
      router.replace(callbackUrl);
    } catch (e: any) {
      try {
        await verifyBizNo(data.businessNumber);

        const msg = '가입하지 않은 아이디에요. 아래 회원가입을 해 주세요.';
        setError('businessNumber', { type: 'server', message: msg }, { shouldFocus: true });
      } catch (ve: any) {
        const msg = '로그인 정보가 일치하지 않아요. 다시 확인해 주세요.';
        setError('password', { type: 'server', message: msg }, { shouldFocus: true });
      }
    }
  });

  return { onSubmit, isPending };
}
