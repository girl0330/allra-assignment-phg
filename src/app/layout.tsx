import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import localFont from 'next/font/local';

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
      <body className="font-pretendard bg-white text-neutral-900">
        <div className="fixed inset-x-0 top-0 z-50 bg-background-default border-b border-line-200">
          <div className="mx-auto w-full max-w-[1440px] px-[100px]">
            <header className="h-[54px] flex items-center">i am header</header>
          </div>
        </div>

        <div className="min-h-dvh flex flex-col pt-[54px]">
          <Providers>
            <main className="flex-1">
              <div className="mx-auto w-full max-w-[1440px] px-[100px]">
                <div className="mx-auto max-w-[1240px]">{children}</div>
              </div>
            </main>
          </Providers>

          <div className="border-t border-line-200 bg-background-default">
            <div className="mx-auto w-full max-w-[1440px] px-[100px]">
              <footer className="h-[358px] py-[59px] flex items-center">i am footer</footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
