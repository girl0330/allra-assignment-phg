'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProgressBar from '@/components/ProgressBar';
import AgreementSection from './AgreementForm';
import RegisterDetails from './RegisterDetailForm';
import { SignUpSchema, type FormData } from '@/features/auth/schema/registerSchema';
import {
  AGREEMENTS,
  AGREEMENT_KEYS,
  type Step,
  POOL_KEYS,
  getAgreementStatus,
  isFieldValid,
  isCompanyOk,
  calcProgressPercent,
} from '@/features/auth/hooks/register.shared';

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1);

  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      terms: false,
      privacy: false,
      manage: false,
      inquiry: false,
      isMarketingConsent: false,
      businessNumber: '',
      password: '',
      passwordConfirm: '',
      userName: '',
      birthDate: '',
      phone: '',
      email: '',
      companyName: '',
      companyAutoLock: false,
      bizVerified: false,
      businessNumberVerifyToken: '',
    },
  });

  const { formState, setValue, getValues } = methods;

  const bizVerified = methods.watch('bizVerified');
  const agreementsWatch = useWatch({ control: methods.control, name: AGREEMENT_KEYS });
  const values = methods.watch();

  // Step2 → Step3
  useEffect(() => {
    if (step === 2 && bizVerified) setStep(3);
  }, [step, bizVerified]);

  // submit 성공 → Step4
  useEffect(() => {
    if (formState.isSubmitSuccessful) setStep(4);
  }, [formState.isSubmitSuccessful]);

  const submitTried = formState.submitCount > 0;
  const touched = formState.touchedFields as Partial<Record<keyof FormData, boolean>>;

  // 약관 상태
  const agreementValues = useMemo(() => {
    const map: Record<string, any> = {};
    AGREEMENT_KEYS.forEach((k, i) => {
      map[k] = agreementsWatch?.[i];
    });
    return map;
  }, [agreementsWatch]);

  const { allRequiredChecked, allChecked } = useMemo(() => getAgreementStatus(agreementValues), [agreementValues]);

  // 진행률
  const progressPercent = useMemo(() => {
    return calcProgressPercent(step, values, touched as any, submitTried);
  }, [step, values, touched, submitTried]);

  // 제출 가능 여부
  const canSubmit = useMemo(() => {
    const v = getValues();
    const allValid = POOL_KEYS.every((k) => isFieldValid(k, v));
    return v.bizVerified && allValid && isCompanyOk(v);
  }, [bizVerified, formState.isValid, formState.submitCount, formState.touchedFields]);

  return (
    <FormProvider {...methods}>
      <div className="pt-header">
        <article className="relative mx-auto max-w-[520px] space-y-8 pb-10 pt-[80px] max-md:container md:px-7">
          <header>
            <h1 className="text-center text-title-2 md:text-title-1 lg:text-display-2">
              지금 회원가입하면 <br />
              <span className="font-bold">수수료 지원금 3만원 지급!</span>
            </h1>
          </header>

          <section>
            <div className="relative space-y-0 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="relative z-10 text-body-3 font-normal text-primary md:text-body-2">
                  최대 1,250만원까지 무료 선정산이 가능해요.
                </span>
                <span className="text-body-3 font-medium text-primary md:text-body-2 md:font-semibold">
                  {progressPercent}%
                </span>
              </div>
              <ProgressBar percent={progressPercent} />
            </div>
          </section>

          <section>
            {step === 1 ? (
              <AgreementSection
                agreements={AGREEMENTS}
                allChecked={allChecked}
                allRequiredChecked={allRequiredChecked}
                onToggleAll={() => {
                  const next = !allChecked;
                  AGREEMENTS.forEach((a) =>
                    setValue(a.id, next, { shouldDirty: true, shouldTouch: true, shouldValidate: false })
                  );
                }}
                onNext={async () => {
                  if (!allRequiredChecked) return;
                  setStep(2);
                }}
              />
            ) : (
              <RegisterDetails canSubmit={canSubmit} />
            )}
          </section>
        </article>
      </div>
    </FormProvider>
  );
}
