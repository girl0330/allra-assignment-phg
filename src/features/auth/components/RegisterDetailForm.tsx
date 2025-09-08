'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '@/features/auth/schema/registerSchema';
import RHFInput from '@/components/RHFInput';
import { formatBirth, formatBizNo, formatPhone } from '@/lib/utils/format';
import { toast } from 'react-hot-toast';
import { useRegisterUser, useVerifyBizNo } from '@/features/auth/hooks/authApiCall';
import { customAlert } from '@/features/auth/components/ModalAlert';
import { useRouter } from 'next/navigation';

export default function RegisterDetails({ canSubmit }: { canSubmit: boolean }) {
  const { control, formState, setValue, watch, handleSubmit } = useFormContext<FormData>();
  const values = watch();
  const { mutateAsync: submitRegister } = useRegisterUser();
  const { mutateAsync: verifyBusinessNumber } = useVerifyBizNo();
  const [showPw, setShowPw] = useState(false);
  const [showPwC, setShowPwC] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const res = await submitRegister(formData);
      customAlert(
        '올라 가입을 환영합니다 🎉',
        <>
          이제 첫 정산을 신청해보세요!
          <br />
          정산금을 <strong className="text-secondary-400">30초만에 조회</strong>하고,{' '}
          <strong className="text-secondary-400">바로 신청</strong>할 수 있어요.
        </>,
        '정산금 조회하기',
        () => {
          router.push('/blogs');
        }
      );
    } catch (e: any) {
      alert(e.response?.data?.errorMessage);
    }
  });

  const onVerifyBiz = async (businessNumber: string) => {
    try {
      const { company, owner, businessNumberVerifyToken } = await verifyBusinessNumber(businessNumber);

      setValue('bizVerified', true, { shouldValidate: true });
      setValue('companyAutoLock', true, { shouldValidate: false });
      setValue('companyName', company ?? '', { shouldValidate: true, shouldTouch: true, shouldDirty: true });
      setValue('userName', owner ?? '', { shouldValidate: true, shouldTouch: true, shouldDirty: true });
      setValue('businessNumberVerifyToken', businessNumberVerifyToken, { shouldValidate: false });
    } catch (err: any) {
      setValue('bizVerified', false, { shouldValidate: true });
      setValue('companyAutoLock', false, { shouldValidate: false });

      const msg = err?.response?.data?.errorMessage || '사업자등록번호 검증 실패';
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="businessNumber" className="block text-sm font-medium">
            사업자등록번호 (ID)
          </label>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-3 font-medium text-label-700 underline underline-offset-4 hover:bg-label-100 rounded-sm h-[32px] inline-flex items-center px-2"
            href="https://www.ftc.go.kr/www/selectBizCommList.do?key=253&amp;token=71FB05C5-4829-80F4-C230-B0FB890B3E892EB62DA22EDEFB1080D78429A22093C1"
          >
            사업자 번호가 기억나지 않아요
          </a>
        </div>

        <div className="flex items-stretch gap-4">
          <RHFInput<FormData>
            control={control}
            name="businessNumber"
            label=""
            placeholder="-제외 10자리 입력"
            autoComplete="off"
            displayValue={(v) => formatBizNo((v || '').replace(/\D/g, '').slice(0, 10))}
            normalize={(v) => v.replace(/\D/g, '').slice(0, 10)}
            disabled={values.companyAutoLock}
            readOnly={values.companyAutoLock}
            containerClassName="flex-1 min-w-0"
            successWhen={() => values.bizVerified}
          />

          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable gap-3 rounded-md px-6 text-body-2 font-semibold h-[48px] min-w-[96px]"
            disabled={values.bizVerified || !(values.businessNumber || '').match(/^\d{10}$/)}
            onClick={() => onVerifyBiz(values.businessNumber)}
          >
            {values.bizVerified ? '인증 성공' : '인증하기'}
          </button>
        </div>

        {values.bizVerified && <p className="mt-1 text-xs text-status-correct">사업자등록번호 확인이 완료되었어요</p>}
      </div>

      <div className="mt-6 grid gap-4">
        <RHFInput<FormData>
          control={control}
          name="password"
          label="비밀번호"
          type={showPw ? 'text' : 'password'}
          placeholder="8~15자리/영문, 숫자, 특수문자 조합 입력"
          autoComplete="new-password"
          rightIcon="eye"
          containerClassName="relative"
        />
        <button
          type="button"
          aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
          className="absolute right-3 top-[76px] -translate-y-1/2 text-neutral-500"
          onClick={() => setShowPw((v) => !v)}
        ></button>

        <RHFInput<FormData>
          control={control}
          name="passwordConfirm"
          label=""
          type={showPwC ? 'text' : 'password'}
          placeholder="8~15자리/영문, 숫자, 특수문자 조합 재입력"
          autoComplete="new-password"
          rightIcon="eye"
          containerClassName="relative"
        />
        <button
          type="button"
          aria-label={showPwC ? '비밀번호 확인 숨기기' : '비밀번호 확인 보기'}
          className="absolute right-3 top-[136px] -translate-y-1/2 text-neutral-500"
          onClick={() => setShowPwC((v) => !v)}
        ></button>
      </div>

      {values.bizVerified && (
        <div className="mt-6 grid gap-5">
          <RHFInput<FormData>
            control={control}
            name="companyName"
            label="상호명"
            placeholder="상호명 입력"
            disabled={values.companyAutoLock}
            readOnly={values.companyAutoLock}
          />

          <RHFInput<FormData>
            control={control}
            name="userName"
            label="대표자"
            placeholder="사업자등록증에 기재된 대표자명 입력"
          />

          <RHFInput<FormData>
            control={control}
            name="birthDate"
            label="대표자 생년월일"
            placeholder="생년월일 8자리 입력 (19900101)"
            displayValue={(v) => formatBirth(v || '')}
            normalize={(v) => v.replace(/\D/g, '').slice(0, 8)}
          />

          <RHFInput<FormData>
            control={control}
            name="phone"
            label="대표자 휴대폰 번호"
            placeholder="계약서 송부를 위해 꼭 본인정보 입력"
            displayValue={(v) => formatPhone(v || '')}
            normalize={(v) => v.replace(/\D/g, '').slice(0, 11)}
          />

          <RHFInput<FormData>
            control={control}
            name="email"
            label="대표자 이메일"
            type="email"
            placeholder="example@domain.com"
          />
        </div>
      )}

      <div className="mt-8 flex w-full">
        <button
          type="submit"
          className="inline-flex h-[48px] w-full items-center justify-center gap-4 rounded-lg bg-primary px-6 text-title-4 font-semibold text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:cursor-not-allowed disabled:bg-status-disable disabled:text-label-100 md:h-[56px] md:rounded-xl"
          disabled={!canSubmit}
        >
          가입하기
        </button>
      </div>
    </form>
  );
}
