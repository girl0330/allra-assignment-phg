'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import LoginForm from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  const sp = useSearchParams();
  const callbackUrl = sp.get('callbackUrl') ?? '/';

  return (
    <>
      <nav className="w-full fixed top-header left-0 z-30 bg-label-100">
        <div className="container flex items-center justify-end bg-label-100 font-normal text-label-700 h-breadcrumb-mobile text-caption-1 md:h-breadcrumb-tablet md:text-body-3">
          <ol className="flex items-center gap-1 text-body-3">
            <li>
              <a href="/">홈</a>
            </li>
            <ChevronRight className="size-6" aria-hidden="true" />
            <li>
              <a href="/login">로그인</a>
            </li>
          </ol>
        </div>
      </nav>
      <LoginForm callbackUrl={callbackUrl} />
    </>
  );
}
