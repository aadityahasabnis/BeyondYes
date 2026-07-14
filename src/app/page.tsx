// import SignIn from '@/components/auth/SignIn';
import { SignIn } from '@/components/auth/SignIn';
import SignOut from '@/components/auth/SignOut';
import { auth } from '@/lib/auth/auth';

export default async function Home() {
    const session = await auth();
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <SignIn />
            <SignOut />
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}
