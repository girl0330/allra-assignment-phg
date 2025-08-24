// src/app/(auth)/sign-up/page.tsx
// ✔ 체크박스 동작 + lucide-react 아이콘 적용 (정리/리팩터링)
// - 전체 동의/해제, 개별 동의 동기화
// - 필수 4개 모두 체크 시 다음 버튼 활성화
// - 진행바는 "필수 항목 체크 비율"로 계산
// - 체크 시 버튼 내부에 <span><Check/></span> 구조 유지
// - 외부 링크는 <ChevronRight/> 사용

'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Input from '@/components/Input';

type AgreementItem = {
  id: string;
  label: string;
  href?: string;
  required?: boolean;
};

const AGREEMENTS: AgreementItem[] = [
  {
    id: 'terms',
    label: '서비스 이용약관 동의 (필수)',
    href: 'https://intro.allra.co.kr/policy/terms',
    required: true,
  },
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
  {
    id: 'marketing',
    label: '마케팅 활용 및 광고성 정보 수신동의',
  },
];

export default function SignUpPage() {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(AGREEMENTS.map((a) => [a.id, false] as const))
  );
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setInEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const requiredIds = useMemo(() => AGREEMENTS.filter((a) => a.required).map((a) => a.id), []);

  const requiredCheckedCount = requiredIds.filter((id) => checkedMap[id]).length;
  const requiredTotal = requiredIds.length;
  const allRequiredChecked = requiredCheckedCount === requiredTotal;

  const allChecked = useMemo(() => AGREEMENTS.every((a) => checkedMap[a.id]), [checkedMap]);

  const progressPercent = Math.round((requiredCheckedCount / requiredTotal) * 100);

  const toggleAll = () => {
    const next = !allChecked;
    setCheckedMap((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, next] as const)));
  };

  const toggleOne = (id: string) => {
    setCheckedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-header">
      <article className="relative mx-auto max-w-[520px] space-y-8 pb-10 pt-[80px] max-md:container md:px-7">
        {/* 타이틀 */}
        <header>
          <h1 className="text-center text-title-2 md:text-title-1 lg:text-display-2">
            지금 회원가입하면 <br />
            <span className="font-bold">수수료 지원금 3만원 지급!</span>
          </h1>
        </header>

        {/* 진행 상태 섹션 */}
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

        {/* 동의 섹션 */}
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!allRequiredChecked) return;
              // TODO: 제출 로직
            }}
          >
            {/* 전체 동의 */}
            <div className="flex items-center gap-4">
              <CheckboxButton id="agreeAll" checked={allChecked} onClick={toggleAll} />

              {/* 시멘틱 컨트롤(숨김). 상태 동기화만 유지 */}
              <input
                aria-hidden="true"
                tabIndex={-1}
                type="checkbox"
                className="sr-only"
                readOnly
                checked={allChecked}
              />

              <label htmlFor="agreeAll" className="text-body-1 font-medium sm:text-title-4" onClick={toggleAll}>
                전체 동의
              </label>
            </div>

            {/* 구분선 */}
            <div data-orientation="horizontal" role="none" className="my-7 h-px w-full shrink-0 bg-line-400" />

            {/* 개별 동의 목록 */}
            <div className="flex flex-col gap-7">
              {AGREEMENTS.map((item) => (
                <AgreementRow
                  key={item.id}
                  {...item}
                  checked={checkedMap[item.id]}
                  onToggle={() => toggleOne(item.id)}
                />
              ))}
            </div>

            {/* 제출 버튼 */}
            <div className="mt-10">
              <button
                className="inline-flex h-[48px] w-full cursor-pointer items-center justify-center gap-4 whitespace-nowrap rounded-lg bg-primary px-6 text-title-4 font-semibold text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:cursor-not-allowed disabled:bg-status-disable disabled:text-label-100 md:h-[56px] md:rounded-xl"
                disabled={!allRequiredChecked}
                type="submit"
              >
                다음
              </button>
            </div>

            {/* --------------------------------- Step 2 --------------------------------- */}

            <div className="flex flex-col gap-6 mt-8">
              <div className="space-y-0">
                <div className="flex items-center justify-between">
                  <label
                    className="peer-disabled:cursor-not-allowed peer-disabled:text-status-disable text-body-3 font-medium text-label-700 py-0"
                    htmlFor="_r_0_-form-item"
                  >
                    사업자등록번호 (ID)
                  </label>
                  <Link
                    target="_blank"
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed p-0! underline underline-offset-4 hover:bg-label-100 active:bg-background-alternative disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium text-label-700"
                    href="https://www.ftc.go.kr/www/selectBizCommList.do?key=253&amp;token=71FB05C5-4829-80F4-C230-B0FB890B3E892EB62DA22EDEFB1080D78429A22093C1"
                  >
                    사업자 번호가 기억나지 않아요
                  </Link>
                </div>

                <div className="flex items-stretch gap-4">
                  <Input
                    id="businessNumber"
                    name="businessNumber"
                    placeholder="-제외 10자리 입력"
                    type="text"
                    labelText="사업자등록번호 (ID)"
                    labelHidden={true}
                    value={businessNumber}
                    onChange={(e) => {
                      setBusinessNumber(e.target.value);
                    }}
                    errorText="사업자등록번호 10자리를 입력해 주세요."
                  />

                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable gap-3 rounded-md px-6 text-body-2 font-semibold h-[48px] min-w-[96px]"
                    type="button"
                  >
                    인증하기
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <Input
                    id="password"
                    name="password"
                    labelHidden={false}
                    type="password"
                    icon="eye"
                    placeholder="8~15자리/영문, 숫자, 특수문자 조합 입력"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ring-offset-background file:text-sm flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px] file:border-0 file:bg-transparent file:font-medium placeholder:text-body-2 placeholder:text-label-500 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0 disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable focus:ring-1 focus:ring-component-dark h-[48px] text-body-1"
                    errorText="8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
                  />
                </div>

                <div className="space-y-3">
                  <Input
                    id="passwordConfirm "
                    name="passwordConfirm"
                    labelHidden={true}
                    type="password"
                    icon="eye"
                    placeholder="8~15자리/영문, 숫자, 특수문자 조합 재입력"
                    autoComplete="current-password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="ring-offset-background file:text-sm flex w-full rounded-md border border-line-200 bg-background-default px-6 py-[12.5px] file:border-0 file:bg-transparent file:font-medium placeholder:text-body-2 placeholder:text-label-500 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-0 disabled:bg-background-alternative disabled:text-status-disable disabled:placeholder:text-status-disable focus:ring-1 focus:ring-component-dark h-[48px] text-body-1"
                    errorText="8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="상호명 입력"
                  type="text"
                  labelText="상호명"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  errorText="입력해주세요"
                />
              </div>

              <div className="space-y-3">
                <Input
                  id="userName"
                  name="userName"
                  placeholder="문자 입력"
                  type="text"
                  labelText="대표자"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  errorText="입력해주세요"
                />
              </div>

              <div className="space-y-3">
                <Input
                  id="birthDate"
                  name="birthDate"
                  placeholder="문자 입력"
                  type="text"
                  labelText="대표자 생년월일"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                  errorText="입력해주세요"
                />
              </div>

              <div className="space-y-3">
                <Input
                  id="phone"
                  name="phone"
                  placeholder="문자 입력"
                  type="text"
                  labelText="대표자 휴대폰 번호"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  errorText="입력해주세요"
                />
              </div>

              <div className="space-y-3">
                <Input
                  id="email"
                  name="email"
                  placeholder="문자 입력"
                  type="text"
                  labelText="대표자 이메일"
                  value={email}
                  onChange={(e) => {
                    setInEmail(e.target.value);
                  }}
                  errorText="입력해주세요"
                />
              </div>
            </div>

            {/* 가입하기 버튼 */}
            <div className="mt-12 flex w-full flex-col">
              <button
                type="submit"
                disabled
                className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed bg-primary text-label-100 hover:bg-secondary-400 active:bg-secondary-600 disabled:bg-status-disable disabled:text-label-100 h-[48px] md:h-[56px] gap-4 rounded-lg md:rounded-xl px-6 text-title-4 font-semibold"
              >
                가입하기
              </button>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

/* --------------------------------- Components --------------------------------- */

function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className="relative h-5 w-full overflow-hidden rounded-2xl bg-background-alternative"
    >
      <div
        className="size-full flex-1 rounded-2xl bg-primary transition-[width] duration-500"
        style={{ width: clamped + '%' }}
      />
    </div>
  );
}

type AgreementRowProps = AgreementItem & {
  checked: boolean;
  onToggle: () => void;
};

function AgreementRow({ id, label, href, checked, onToggle }: AgreementRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CheckboxButton id={id} checked={checked} onClick={onToggle} />

          {/* 시멘틱 컨트롤(숨김). 상태 동기화만 유지 */}
          <input aria-hidden="true" tabIndex={-1} type="checkbox" className="sr-only" readOnly checked={checked} />

          <label
            htmlFor={id}
            className="flex cursor-pointer items-baseline text-body-2 text-label-700 md:text-body-1"
            onClick={onToggle}
          >
            {label}
          </label>
        </div>

        {href && (
          <a target="_blank" rel="noopener noreferrer" href={href}>
            <ChevronRight
              aria-hidden="true"
              width={24}
              height={24}
              stroke="#9CA3AF"
              strokeWidth={2}
              className="lucide lucide-chevron-right"
            />
          </a>
        )}
      </div>
    </div>
  );
}

function CheckboxButton({ id, checked, onClick }: { id: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      value="on"
      aria-invalid="false"
      onClick={onClick}
      className="size-7 shrink-0 overflow-hidden rounded-xs border border-component-dark data-[state=checked]:bg-component-default data-[state=checked]:text-background-dark disabled:cursor-not-allowed disabled:border-status-disable disabled:bg-background-default disabled:data-[state=checked]:text-status-disable"
    >
      {checked && (
        <span
          data-state="checked"
          className="flex items-center justify-center text-current"
          style={{ pointerEvents: 'none' }}
        >
          <Check aria-hidden="true" className="absolute size-[13px]" strokeWidth={2} />
        </span>
      )}
    </button>
  );
}
