import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth/auth';

type AuthCardProps = {
    mode: 'login' | 'signup';
};

export function AuthCard({ mode }: AuthCardProps) {
    const isLogin = mode === 'login';

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold leading-tight">
                    Hey!
                    <br />
                    Welcome to <span className="text-primary">BeyondYes</span>
                </h1>

                <p className="hidden md:flex text-sm leading-6 text-muted-foreground">Build meaningful habits, stay accountable, and keep moving forward every day.</p>
            </div>

            {/* Card */}
            <Card className="rounded-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Email */}
                    <form
                        className="space-y-4"
                        action={async (formData) => {
                            'use server';

                            await signIn('nodemailer', {
                                email: formData.get('email') as string,
                                redirectTo: '/dashboard',
                            });
                        }}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="Enter your email address" autoComplete="email" required />
                        </div>

                        <Button type="submit" size="lg" className="w-full">
                            {isLogin ? 'Continue' : 'Create Account'}
                        </Button>
                    </form>

                    {/* Switch */}
                    <p className="text-center text-sm text-muted-foreground">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <Link href={isLogin ? '/signup' : '/login'} className="font-medium text-primary hover:underline">
                            {' '}
                            {isLogin ? 'Sign Up' : 'Login'}
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center">
                            <span className="bg-card px-3 text-xs uppercase text-muted-foreground">Or</span>
                        </div>
                    </div>

                    {/* Google */}
                    <form
                        action={async () => {
                            'use server';
                            await signIn('google', {
                                redirectTo: '/dashboard',
                            });
                        }}>
                        <Button type="submit" variant="outline" size="lg" className="w-full">
                            <FcGoogle className="size-5" />
                            Continue with Google
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
