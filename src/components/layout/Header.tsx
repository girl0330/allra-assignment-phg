import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <div className="fixed top-0 left-0 z-40 h-header w-full bg-background-default">
                <div className="size-full">
                    <div className="container flex h-full items-center justify-between *:h-full">
                        <div className="flex items-center gap-11">
                            <Link aria-label="초간편 통합 선정산서비스 올라" href="/">
                                <Image
                                    src="/icons/logo.svg"
                                    alt="allra logo"
                                    width={92}
                                    height={24}
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 lg:hidden">
                            <Link
                                className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                                href="/register?callbackUrl=%2Fblogs%3F">
                                로그인/회원가입
                            </Link>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-menu"
                                aria-hidden="true"
                            >
                                <path d="M4 12h16"/>
                                <path d="M4 18h16"/>
                                <path d="M4 6h16"/>
                            </svg>
                        </div>
                        <div className="flex items-center gap-4 max-lg:hidden">
                            <Link
                                className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border border-secondary-300 bg-background-default text-primary hover:border-secondary-300 hover:bg-label-100 active:bg-background-alternative disabled:border-status-disable disabled:bg-background-default disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                                href="/register?callbackUrl=blogs">회원가입</Link>
                            <Link
                                className="inline-flex items-center justify-center whitespace-nowrap cursor-pointer disabled:cursor-not-allowed border bg-background-default text-label-800 hover:bg-label-100 active:bg-background-alternative disabled:border-line-400 disabled:text-status-disable h-[32px] gap-1 rounded-sm px-6 text-body-3 font-medium"
                                href="/login?callbackUrl=blogs">로그인</Link>
                        </div>
                    </div>
                    <div data-orientation="horizontal" role="none"
                         className="shrink-0 h-px w-full bg-line-200">
                    </div>
                </div>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 block h-header bg-background-default">
            </div>
        </header>
    );
}
