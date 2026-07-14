import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';

import { env } from '@/env';
import { sendVerificationRequest } from '@/lib/auth/verification-mail-template';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

declare module 'next-auth' {
    interface User {
        role?: Role; // or `string` if no Prisma type
        isOnboarded?: boolean;
    }

    interface Session {
        user: User; // `User` is already extended, so this picks up `role` & `isOnboarded`
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),

    providers: [
        Google({
            clientId: env.AUTH_GOOGLE_ID!,
            clientSecret: env.AUTH_GOOGLE_SECRET!,
        }),

        Nodemailer({
            server: {
                host: env.EMAIL_SERVER_HOST,
                port: env.EMAIL_SERVER_PORT,
                auth: {
                    user: env.EMAIL_SERVER_USER,
                    pass: env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: env.EMAIL_FROM,
            sendVerificationRequest,
        }),
    ],

    session: {
        strategy: 'database',
    },
});
