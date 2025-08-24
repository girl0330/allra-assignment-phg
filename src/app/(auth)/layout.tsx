// app/(auth)/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'allra',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mx-auto md:container md:min-h-[calc(100dvh-358px-64px)] px-[40px]">
        {/* (auth) 전용 헤더가 정말 필요하면 이 위치에서 렌더링 (아니면 루트 헤더 재사용) */}
        {/* 스페이서 */}
        <div aria-hidden className="h-header" />
        <main>{children}</main>
      </div>
    </div>
  );
}
