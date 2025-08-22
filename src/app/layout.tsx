import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import localFont from 'next/font/local';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/shared/components/Footer';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'allra',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-pretendard min-h-dvh">
        <Providers>
          <div>
            <div className="mx-auto md:container md:min-h-[calc(100dvh-358px-64px)] px-[40px]">
              {/* 고정 헤더 */}
              <header className="fixed top-0 left-0 z-40 h-header w-full bg-background-default border-b border-line-200">
                <div className="size-full">
                  <div className="container px-4 md:px-6 lg:px-8 flex h-full items-center justify-between">
                    {/* 로고/우측 버튼 영역 */}
                    <div className="flex items-center gap-11">
                      <Link aria-label="초간편 통합 선정산서비스 올라" href="/">
                        <Image src="/icons/logo.svg" alt="allra logo" width={92} height={24} priority className="" />
                      </Link>
                    </div>
                    <div className="flex items-center gap-4 lg:hidden">
                      <button className="border">회원가입</button>
                      <button className="border">회원가입</button>
                    </div>
                    <div className="flex items-center gap-4 max-lg:hidden">
                      <button className="border">로그인/회원가입</button>
                    </div>
                  </div>
                </div>
              </header>

              {/* 스페이서 */}
              <div aria-hidden className="h-header" />

              {/* 본문 */}
              <main>{children}</main>
            </div>
            {/* 푸터 */}
            {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
