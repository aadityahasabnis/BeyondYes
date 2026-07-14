// src/middleware.ts (or proxy.ts if you keep it)
import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

const AUTH_PATTERNS = ['/login', '/signup'];
const PROTECTED_PATTERNS = ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/onboarding/:path*'];
const ADMIN_PATTERNS = ['/admin/:path*'];

export const proxy = auth((req) => {
    const { pathname } = req.nextUrl;
    const session = req.auth;

    const isAuthenticated = !!session;
    const isOnboarded = session?.user?.isOnboarded;
    const isAdmin = session?.user?.role === 'ADMIN';

    const isAuthRoute = AUTH_PATTERNS.some((route) => pathname.startsWith(route));
    const isProtectedRoute = PROTECTED_PATTERNS.some((route) => pathname.startsWith(route));
    // 👇 Check if current path is an admin route
    const isAdminRoute = ADMIN_PATTERNS.some((route) => pathname.startsWith(route));

    // 1️⃣ Not logged in → redirect to login
    if (!isAuthenticated && (isProtectedRoute || isAdminRoute)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // 2️⃣ Logged in → redirect away from auth routes
    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL(isOnboarded ? '/dashboard' : '/onboarding', req.url));
    }

    // 3️⃣ Logged in but not onboarded → force onboarding
    if (isAuthenticated && !isOnboarded && pathname !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    // 4️⃣ Already onboarded → prevent access to onboarding
    if (isAuthenticated && isOnboarded && pathname.startsWith('/onboarding')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // 5️⃣ Admin: must be logged in, onboarded, and have ADMIN role
    if (isAdminRoute) {
        if (!isAuthenticated || !isOnboarded || !isAdmin) {
            // Redirect to dashboard (or a "forbidden" page if you have one)
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    // All good → proceed
    return NextResponse.next();
});

export const config = {
    matcher: ['/login', '/signup', '/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/onboarding/:path*', '/admin/:path*'],
};
