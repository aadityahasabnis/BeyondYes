import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SignIn() {
    return (
        <Link href="/login">
            <Button>Sign In</Button>
        </Link>
    );
}
