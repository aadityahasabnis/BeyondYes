import { auth } from '@/lib/auth/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    // const isAdmin = session?.user?.role === 'ADMIN';

    // if (!session) {
    //     redirect('/login');
    // }

    // if (!isAdmin) {
    //     redirect('/login');
    // }

    return children;
}
