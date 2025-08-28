'use client';

import { useEffect } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { LoginForm } from '@/features/auth/schema/loginSchema';

type Params = {
  values: LoginForm;
  setValue: UseFormSetValue<LoginForm>;
};

// 로컬스토리지에 저장할 키
const STORAGE_KEY = 'saved_id';

export function useSavedId({ values, setValue }: Params) {
  // 저장된 아이디 복원 & '아이디 저장' 체크박스 상태
  useEffect(
    function restoreSavedIdOnMount() {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        setValue('businessNumber', saved, { shouldValidate: true });
        setValue('saveId', true, { shouldValidate: false });
      }
    },
    [setValue]
  );

  // 아이디가 바뀔 때마다 저장
  useEffect(
    function persistIdWhenChecked() {
      if (!values.saveId) return;
      localStorage.setItem(STORAGE_KEY, (values.businessNumber || '').replace(/\D/g, '').slice(0, 10));
    },
    [values.saveId, values.businessNumber]
  );

  // 아이디 저장/삭제 토글
  useEffect(
    function togglePersistedId() {
      if (values.saveId) {
        localStorage.setItem(STORAGE_KEY, (values.businessNumber || '').replace(/\D/g, '').slice(0, 10));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    [values.saveId, values.businessNumber]
  );
}
