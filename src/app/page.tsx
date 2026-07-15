import { SignIn } from '@/components/auth/SignIn';
import UserMenu from '@/components/layout/dropdown/UserMenu';
import ThemeToggler from '@/components/layout/navbar/ThemeToggler';
import { auth } from '@/lib/auth/auth';

export default async function Home() {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {!user ? <SignIn /> : <UserMenu user={user} />}
            <ThemeToggler />
        </div>
    );
}
