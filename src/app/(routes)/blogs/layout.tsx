import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientToaster from '@/app/ClientToaster';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mx-auto md:container md:min-h-[calc(100dvh-358px-64px)]">
        <Header />
        <main className="pb-13 pt-[24px] md:py-[40px] lg:py-[80px]">
          {children}
          <ClientToaster />
        </main>
      </div>
      <Footer />
    </div>
  );
}
