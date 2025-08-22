import { label } from 'framer-motion/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Item {
  label: string;
  href: string;
}

const navItem: Item[] = [
  { label: '회사소개', href: '/' },
  { label: '서비스 이용약관', href: '/' },
  { label: '개인정보 처리방침', href: '/' },
  { label: '공지사항', href: '/' },
  { label: 'FAQ', href: '/' },
  { label: '블로그', href: '/' },
  { label: '채용정보', href: '/' },
];

const Footer = () => {
  return (
    <footer className="border-t border-line-200">
      <div role="none" className="shrink-0 h-px w-full bg-line-200"></div>
      <div className="container flex flex-wrap-reverse items-start gap-8 md:flex-nowrap md:gap-11 lg:gap-20 py-10 lg:py-[60px]">
        <div className="grow">
          <Image
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
                <Link href="/">회사소개</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                  aria-hidden="true"
                >
                  <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                <Link href="/">서비스 이용약관</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                  aria-hidden="true"
                >
                  <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                <Link href="/">개인정보 처리방침</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                  aria-hidden="true"
                >
                  <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                <Link href="/">공지사항</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                  aria-hidden="true"
                >
                  <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                <Link href="/">FAQ</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                  aria-hidden="true"
                >
                  <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                <Link href="/">블로그</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dot"
                  aria-hidden="true"
                >
                  <circle cx="12.1" cy="12.1" r="1"></circle>
                </svg>
                <Link href="/">채용정보</Link>
              </div>
            </main>
            <main className="">
              <div className="text-body-3 font-normal text-label-500 lg:text-body-2">
                <p>(주)올라핀테크 ㅣ 사업자등록번호 : 509-86-01645 ㅣ 통신판매업신고 : 제2022-서울강남-02369호</p>
                <p>대표이사 김상수 ㅣ 주소 : 서울특별시 강남구 봉은사로 327, 11층(논현동, 궁도빌딩)</p>
              </div>
            </main>
            <p className="text-body-3 font-normal text-label-500">© 2020. Allra Fintech Corp. All Rights Reserved.</p>
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
        <div role="none" className="shrink-0 h-px w-full bg-line-400 md:hidden" />
        <main className="">
          <div className="flex flex-col">
            <h3 className="text-body-3 font-medium text-label-700 lg:text-body-2 lg:font-semibold">고객센터</h3>
            <Link
              className="font-mukta text-display-2 font-bold text-nowrap text-primary md:text-[44px] lg:text-display-1"
              href="tel:1811-1463"
            >
              1811-1463
            </Link>
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
  );
};

export default Footer;
