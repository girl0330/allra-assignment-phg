import type {Metadata} from 'next';
import '../styles/globals.css';
import Providers from './providers';
import localFont from 'next/font/local';
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const pretendard = localFont({
    src: '../../public/fonts/PretendardVariable.woff2',
    variable: '--font-pretendard',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'allra',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={pretendard.variable}>
        <body className="font-pretendard min-h-dvh">
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}