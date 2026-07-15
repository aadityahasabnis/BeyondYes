import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const isAdmin = session?.user?.role === 'ADMIN';

    if (!session || !isAdmin) {
        redirect('/login');
    }

    return children;
}
