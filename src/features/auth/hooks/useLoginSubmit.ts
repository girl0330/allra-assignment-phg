// useLoginSubmit.ts
'use client';

import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/hooks/authApiCall';
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await doLogin({ businessNumber: data.businessNumber, password: data.password });
      router.replace(callbackUrl);
    } catch (e: any) {
      const msg = e?.response?.data?.errorMessage ?? '로그인 실패';
      setError('password', { type: 'server', message: msg }, { shouldFocus: true });
    }
  });

  return { onSubmit, isPending };
}
