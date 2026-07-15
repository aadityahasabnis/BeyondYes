import { redirect } from 'next/navigation';

import Navbar from '@/components/layout/navbar/Navbar';
import { auth } from '@/lib/auth/auth';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
