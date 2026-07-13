import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}>
            <Button type="submit" variant="destructive">Sign Out</Button>
        </form>
    );
}