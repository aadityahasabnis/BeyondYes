import { OnboardForm } from '@/features/onboarding/components/onboard-form';
import { auth } from '@/lib/auth/auth';

const page = async () => {
    const session = await auth();
    const userName = session?.user?.name?.split(' ')[0] ?? 'there';

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
                <OnboardForm userName={userName} />
            </div>
        </main>
    );
};

export default page;
