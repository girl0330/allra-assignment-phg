import Link from 'next/link';
import Image from 'next/image';
import { section } from "framer-motion/client";

export default function Header() {
    return (
        <header role="banner">
            <section
                className="h-header border-b !border-line-200 left-0 top-0 bg-background-default z-50 w-screen flex flex-col justify-center px-7 lg:px-10 fixed">
                <div className="container">
                    <Link href="/">
                        <Image alt="allra logo" loading="lazy" width="95" height="24" decoding="async" data-nimg="1"
                               className="" src="/icons/logo.svg"/>
                    </Link>
                </div>
            </section>
        </header>
    );
}