import {
  isNotBlank,
  isValidPassword,
  isValidEmail,
  isValidBizNo,
  isValidPhoneNo,
  isValidBirth,
} from '@/lib/utils/validate';

export type Step = 1 | 2 | 3 | 4;
export type CheckKey = 'terms' | 'privacy' | 'manage' | 'inquiry' | 'isMarketingConsent';
export type AgreementItem = {
  id: CheckKey;
  label: string;
  href?: string;
  required?: boolean;
};

// 약관 목록
export const AGREEMENTS = [
  { id: 'terms', label: '서비스 이용약관 동의 (필수)', href: 'https://intro.allra.co.kr/policy/terms', required: true },
  {
    id: 'privacy',
    label: '개인(신용)정보 수집 및 이용동의 (필수)',
    href: 'https://intro.allra.co.kr/policy/privacy',
    required: true,
  },
  {
    id: 'manage',
    label: '개인(신용)정보 제공 및 위탁동의 (필수)',
    href: 'https://intro.allra.co.kr/policy/manage',
    required: true,
  },
  {
    id: 'inquiry',
    label: '개인(신용)정보 조회 동의 (필수)',
    href: 'https://intro.allra.co.kr/policy/inquiry',
    required: true,
  },
  { id: 'isMarketingConsent', label: '마케팅 활용 및 광고성 정보 수신동의' },
] satisfies AgreementItem[];

export const AGREEMENT_KEYS = ['terms', 'privacy', 'manage', 'inquiry', 'isMarketingConsent'] as const;

export const REQUIRED_AGREEMENT_IDS = AGREEMENTS.filter((a) => a.required).map((a) => a.id);

export const POOL_KEYS = [
  'businessNumber',
  'password',
  'passwordConfirm',
  'userName',
  'birthDate',
  'phone',
  'email',
] as const;
export type PoolKey = (typeof POOL_KEYS)[number];

// 약관 체크
export function getAgreementStatus(values: Record<string, any>) {
  const allRequiredChecked = REQUIRED_AGREEMENT_IDS.every((id) => !!values[id]);
  const allChecked = (AGREEMENTS as readonly AgreementItem[]).every((a) => !!values[a.id]);
  return { allRequiredChecked, allChecked };
}

// 유효성 판단
export function isFieldValid(key: PoolKey, values: Record<string, any>) {
  const v = values[key];
  switch (key) {
    case 'businessNumber':
      return isValidBizNo(v);
    case 'password':
      return isNotBlank(v) && isValidPassword(v);
    case 'passwordConfirm':
      return isNotBlank(v) && v === values.password && isValidPassword(values.password);
    case 'userName':
      return isNotBlank(v);
    case 'birthDate':
      return isValidBirth(v);
    case 'phone':
      return isValidPhoneNo(v);
    case 'email':
      return isValidEmail(v);
  }
}

// 회사명 잠금
export function isCompanyOk(values: Record<string, any>) {
  return values.companyAutoLock || !!(values.companyName && values.companyName.trim().length > 0);
}

// 진행률 계산
export function calcProgressPercent(
  step: number,
  values: Record<string, any>,
  touched: Partial<Record<string, boolean>>,
  submitTried: boolean
) {
  if (step === 1) return 0;
  const base = 15;

  const isConsidered = (key: PoolKey) => {
    const touchedFlag = !!touched[key] || submitTried;
    return key === 'businessNumber' ? touchedFlag : values.bizVerified && touchedFlag;
  };

  const validCount = POOL_KEYS.reduce((acc, k) => acc + (isConsidered(k) && isFieldValid(k, values) ? 1 : 0), 0);

  const extra = Math.round((validCount / POOL_KEYS.length) * 85);
  return Math.min(100, base + extra);
}
