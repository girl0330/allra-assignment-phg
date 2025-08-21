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
        {/* <div className="fixed inset-x-0 top-0 z-50 bg-background-default border-b border-line-200">
          <div className="mx-auto w-full max-w-[1440px] px-[100px]">
            <header className="h-[54px] flex items-center">i am header</header>
          </div>
        </div> */}

        <header>
          <div className="fixed top-0 left-0 z-40 h-[60px] h-header w-full bg-background-default">
            <div className="size-full">
              <div className="container flex h-full items-center justify-between *:h-full">
                <div className="flex items-center gap-11">
                  <a aria-label="초간편 통합 선정산서비스 올라" href="/">
                    <img
                      alt="allra logo"
                      loading="lazy"
                      width="92"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className=""
                      src="\icons\logo.svg"
                    />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                    href="/sign-up?callbackUrl=%2Fblogs%3F"
                  >
                    회원가입
                  </a>
                  <a
                    className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border bg-background-default text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:border-line-400 disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                    href="/sign-in?callbackUrl=%2Fblogs%3F"
                  >
                    로그인
                  </a>
                </div>
              </div>
              <div data-orientation="horizontal" role="none" className="shrink-0 h-px w-full bg-line-200"></div>
            </div>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 block h-header bg-background-default"
          ></div>
        </header>

        <div className="min-h-dvh flex flex-col pt-[54px]">
          <Providers>
            <main className="flex-1">
              <div className="mx-auto w-full max-w-[1440px] px-[100px]">
                <div className="mx-auto max-w-[1240px]">{children}</div>
              </div>
            </main>
          </Providers>

          {/* <div className="border-t border-line-200 bg-background-default">
            <div className="mx-auto w-full max-w-[1440px] px-[100px]">
              <footer className="h-[358px] py-[59px] flex items-center">i am footer</footer>
            </div>
          </div> */}
        </div>

        <footer className="">
          <div data-orientation="horizontal" role="none" className="shrink-0 h-px w-full bg-line-200"></div>
          <div className="lg:gap-20 container flex flex-wrap-reverse items-start gap-8 py-10 md:flex-nowrap md:gap-11 lg:py-[60px]">
            <div className="grow">
              <img
                alt="allra logo"
                loading="lazy"
                width="95"
                height="24"
                decoding="async"
                data-nimg="1"
                className="w-[95px]"
                src="/icons/footer-logo.svg"
              />
              <div className="mt-6 flex flex-col gap-6 md:mt-9">
                <main className="">
                  <div className="flex flex-wrap items-center gap-2 text-body-3 text-label-700 *:hover:font-bold">
                    <a href="/">회사소개</a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-dot"
                      aria-hidden="true"
                    >
                      <circle cx="12.1" cy="12.1" r="1"></circle>
                    </svg>
                    <a href="/">서비스 이용약관</a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-dot"
                      aria-hidden="true"
                    >
                      <circle cx="12.1" cy="12.1" r="1"></circle>
                    </svg>
                    <a className="font-bold" href="/">
                      개인정보 처리방침
                    </a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-dot"
                      aria-hidden="true"
                    >
                      <circle cx="12.1" cy="12.1" r="1"></circle>
                    </svg>
                    <a href="/">공지사항</a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-dot"
                      aria-hidden="true"
                    >
                      <circle cx="12.1" cy="12.1" r="1"></circle>
                    </svg>
                    <a href="/">FAQ</a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-dot"
                      aria-hidden="true"
                    >
                      <circle cx="12.1" cy="12.1" r="1"></circle>
                    </svg>
                    <a href="/">블로그</a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-dot"
                      aria-hidden="true"
                    >
                      <circle cx="12.1" cy="12.1" r="1"></circle>
                    </svg>
                    <a href="/">채용정보</a>
                  </div>
                </main>
                <main className="">
                  <div className="text-body-3 font-normal text-label-500 lg:text-body-2">
                    <p>(주)올라핀테크 ㅣ 사업자등록번호 : 509-86-01645 ㅣ 통신판매업신고 : 제2022-서울강남-02369호</p>
                    <p>대표이사 김상수 ㅣ 주소 : 서울특별시 강남구 봉은사로 327, 11층(논현동, 궁도빌딩)</p>
                  </div>
                </main>
                <p className="text-body-3 font-normal text-label-500">
                  © 2020. Allra Fintech Corp. All Rights Reserved.
                </p>
              </div>
              <div className="grid grid-cols-3 flex-wrap items-center md:grid-cols-4 lg:flex mt-3 md:mt-7">
                <picture>
                  <img src="/icons/KB금융그룹.svg" alt="partner" />
                </picture>
                <picture>
                  <img src="/icons/KB국민카드.svg" alt="partner" />
                </picture>
                <picture>
                  <img src="/icons/키움캐피탈.svg" alt="partner" />
                </picture>
                <picture>
                  <img src="/icons/금융위원회.svg" alt="partner" />
                </picture>
                <picture>
                  <img src="/icons/아기유니콘.svg" alt="partner" />
                </picture>
                <picture>
                  <img src="/icons/벤처확인기업.svg" alt="partner" />
                </picture>
                <picture>
                  <img src="/icons/기술보증기금.svg" alt="partner" />
                </picture>
              </div>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 h-px w-full bg-line-400 md:hidden"></div>

            <main className="">
              <div className="flex flex-col">
                <h3 className="text-body-3 font-medium text-label-700 lg:text-body-2 lg:font-semibold">고객센터</h3>
                <a
                  className="font-mukta text-display-2 font-bold text-nowrap text-primary md:text-[44px] lg:text-display-1"
                  href="tel:1811-1463"
                >
                  1811-1463
                </a>
                <div className="flex flex-col gap-5 text-body-3 font-medium text-label-700">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-label-500">운영시간</h3>
                    <div className="font-normal">
                      <p className="flex flex-wrap gap-1">
                        <span>평일 10:00 ~ 17:00 </span>
                        <span>(점심시간 11:30 ~ 13:00)</span>
                      </p>
                      <p>주말, 공휴일 휴무</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-label-500">E-mail</h3>
                    <div className="font-normal">
                      <a href="mailto:help@allra.co.kr">help@allra.co.kr</a>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </footer>
      </body>
    </html>
  );
}
