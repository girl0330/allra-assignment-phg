import AuthHeader from "@/components/layout/AuthHeader";
import ClientToaster from '@/app/ClientToaster';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <AuthHeader />
            <div className="h-full">
                {children}
                <ClientToaster/>
            </div>
        </div>
    );
}