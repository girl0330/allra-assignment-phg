'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useUserInfo } from '@/features/auth/hooks/useUserInfo';
import { clearTokens, getAccessToken, useTokenStore } from '@/store/tokenStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const { data: me, isLoading } = useUserInfo();
  const qc = useQueryClient();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!getAccessToken());
    setHydrated(true);
  }, []);

  const onLogout = async () => {
    clearTokens();
    qc.removeQueries({ queryKey: ['auth', 'me'] });
    router.replace('/');
  };

  const shouldHideAll = !hydrated || (isLoading && hasToken && !me);

  return (
    <header>
      <div className="fixed top-0 left-0 z-40 h-header w-full bg-background-default">
        <div className="size-full">
          <div className="container flex h-full items-center justify-between *:h-full">
            {/* 로고 */}
            <div className="flex items-center gap-11">
              <Link aria-label="초간편 통합 선정산서비스 올라" href="/">
                <Image src="/icons/logo.svg" alt="allra logo" width={92} height={24} priority />
              </Link>
            </div>

            {/* 모바일 */}
            <div className="flex items-center gap-4 lg:hidden">
              {shouldHideAll ? null : me ? (
                <>
                  <span className="text-body-2 font-bold">{me.companyName}님</span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border bg-background-default text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:border-line-400 disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                  href="/login?callbackUrl=%2Fblogs%3F"
                >
                  로그인/회원가입
                </Link>
              )}
            </div>

            {/* 데스크톱 */}
            <div className="flex items-center gap-4 max-lg:hidden">
              {shouldHideAll ? null : me ? (
                <>
                  <span className="text-body-2 font-bold">{me.companyName}님</span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border bg-background-default text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:border-line-400 disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                    href="/register?callbackUrl=blogs"
                  >
                    회원가입
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border bg-background-default text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:border-line-400 disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                    href="/login?callbackUrl=blogs"
                  >
                    로그인
                  </Link>
                </>
              )}
            </div>
          </div>

          <div data-orientation="horizontal" role="none" className="shrink-0 h-px w-full bg-line-200" />
        </div>
      </div>

      {/* 헤더 공간 보정 */}
      <div data-orientation="horizontal" role="none" className="shrink-0 block h-header bg-background-default" />
    </header>
  );
}
