'use client';

import React from 'react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import RHFInput from '@/components/RHFInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatBizNo } from '@/lib/utils/format';
import { useSavedId } from '@/features/auth/hooks/useSavedId';
import { useLoginSubmit } from '@/features/auth/hooks/useLoginSubmit';
import { LoginSchema, type LoginForm } from '@/features/auth/schema/loginSchema';

type Props = { callbackUrl: string };

export default function LoginForm({ callbackUrl }: Props) {
  const methods = useForm<LoginForm>({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: { businessNumber: '', password: '', saveId: false },
  });

  const { control, watch, setValue, handleSubmit, setError } = methods;
  const values = watch();

  // 아이디 저장/복원
  useSavedId({ values, setValue });

  const { onSubmit, isPending } = useLoginSubmit({ handleSubmit, setError, callbackUrl });

  return (
    <div className="mx-auto mt-header max-w-[480px] h-full max-md:container">
      <div className="pt-[80px] max-md:container pb-10 relative mx-auto max-w-[520px] md:px-7 space-y-8">
        <header>
          <h3 className="text-title-3 font-medium md:text-title-2">로그인</h3>
        </header>

        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div>
                <RHFInput<LoginForm>
                  control={control}
                  name="businessNumber"
                  label="사업자등록번호(ID로 사용돼요)"
                  placeholder="-제외 10자리 입력"
                  autoComplete="username"
                  displayValue={(v) => formatBizNo((v || '').replace(/\D/g, '').slice(0, 10))}
                  normalize={(v) => v.replace(/\D/g, '').slice(0, 10)}
                />
              </div>

              <div>
                <RHFInput<LoginForm>
                  control={control}
                  name="password"
                  label="비밀번호"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  autoComplete="current-password"
                  rightIcon="eye"
                />
              </div>

              <section>
                <div className="flex items-center justify-between">
                  <label className="text-body-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:text-status-disable text-label-900 flex cursor-pointer items-center gap-3 space-y-0">
                    <input
                      type="checkbox"
                      checked={values.saveId}
                      onChange={(e) => setValue('saveId', e.target.checked, { shouldValidate: false })}
                      className="size-7 shrink-0 overflow-hidden rounded-xs border border-component-dark"
                    />
                    <span className="text-body-3 font-medium text-label-700">아이디 저장</span>
                  </label>
                </div>

                <div className="mt-9 flex w-full flex-col gap-4 lg:mt-10">
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed bg-primary text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:bg-status-disable disabled:text-label-100 h-[48px] md:h-[56px] gap-4 rounded-lg md:rounded-xl px-6 text-title-4 font-semibold"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? '로그인 중…' : '로그인'}
                  </button>

                  <Link
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[48px] md:h-[56px] gap-4 rounded-lg md:rounded-xl px-6 text-title-4 font-semibold"
                    href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                  >
                    회원가입
                  </Link>
                </div>
              </section>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
