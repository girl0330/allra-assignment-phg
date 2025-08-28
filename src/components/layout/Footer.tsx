import Image from 'next/image';
import Link from 'next/link';

const Dot = () => (
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
    aria-hidden="true"
    className="lucide lucide-dot"
  >
    <circle cx="12.1" cy="12.1" r="1" />
  </svg>
);

export default function Footer() {
  return (
    <footer>
      <hr className="h-px w-full shrink-0 bg-line-200 border-0" />

      <div className="container flex flex-wrap-reverse items-start gap-8 py-10 md:flex-nowrap md:gap-11 lg:gap-20 lg:py-[60px]">
        {/* 좌측: 로고 + 링크 + 회사 정보 */}
        <div className="grow">
          <Image
            alt="allra logo"
            src="/icons/footer-logo.svg"
            width={95}
            height={24}
            className="w-[95px] h-auto"
            priority={false}
          />

          <nav aria-label="푸터 링크" className="mt-6 md:mt-9">
            <ul className="flex flex-wrap items-center gap-2 text-body-3 text-label-700 *:hover:font-bold">
              <li>
                <Link href="/">회사소개</Link>
              </li>
              <li aria-hidden="true">
                <Dot />
              </li>
              <li>
                <Link href="/">서비스 이용약관</Link>
              </li>
              <li aria-hidden="true">
                <Dot />
              </li>
              <li>
                <Link href="/">개인정보 처리방침</Link>
              </li>
              <li aria-hidden="true">
                <Dot />
              </li>
              <li>
                <Link href="/">공지사항</Link>
              </li>
              <li aria-hidden="true">
                <Dot />
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li aria-hidden="true">
                <Dot />
              </li>
              <li>
                <Link href="/">블로그</Link>
              </li>
              <li aria-hidden="true">
                <Dot />
              </li>
              <li>
                <Link href="/">채용정보</Link>
              </li>
            </ul>
          </nav>

          <section aria-label="회사 정보" className="mt-6 flex flex-col gap-6">
            <div className="text-body-3 font-normal text-label-500 lg:text-body-2">
              <p>(주)올라핀테크 ㅣ 사업자등록번호 : 509-86-01645 ㅣ 통신판매업신고 : 제2022-서울강남-02369호</p>
              <p>대표이사 김상수 ㅣ 주소 : 서울특별시 강남구 봉은사로 327, 11층(논현동, 궁도빌딩)</p>
            </div>
            <p className="text-body-3 font-normal text-label-500">© 2020. Allra Fintech Corp. All Rights Reserved.</p>
          </section>

          <ul className="mt-3 grid grid-cols-3 items-center md:mt-7 md:grid-cols-4 lg:flex lg:flex-wrap gap-3">
            {[
              { src: '/icons/KB금융그룹.svg', alt: 'KB금융그룹' },
              { src: '/icons/KB국민카드.svg', alt: 'KB국민카드' },
              { src: '/icons/키움캐피탈.svg', alt: '키움캐피탈' },
              { src: '/icons/금융위원회.svg', alt: '금융위원회' },
              { src: '/icons/아기유니콘.svg', alt: '아기유니콘' },
              { src: '/icons/벤처확인기업.svg', alt: '벤처확인기업' },
              { src: '/icons/기술보증기금.svg', alt: '기술보증기금' },
            ].map((logo) => (
              <li key={logo.alt} className="flex items-center">
                <Image src={logo.src} alt={logo.alt} width={100} height={30} className="h-auto w-auto" />
              </li>
            ))}
          </ul>
        </div>

        <hr className="h-px w-full shrink-0 bg-line-400 border-0 md:hidden" />

        {/* 우측: 고객센터 */}
        <section aria-label="고객센터" className="">
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
                <h4 className="font-medium text-label-500">운영시간</h4>
                <div className="font-normal">
                  <p className="flex flex-wrap gap-1">
                    <span>평일 10:00 ~ 17:00 </span>
                    <span>(점심시간 11:30 ~ 13:00)</span>
                  </p>
                  <p>주말, 공휴일 휴무</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-label-500">E-mail</h4>
                <div className="font-normal">
                  <a href="mailto:help@allra.co.kr">help@allra.co.kr</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
