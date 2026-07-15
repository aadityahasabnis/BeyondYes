'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { OnboardingFormValues, onboardingSchema } from './schema';

const emptyToNull = (value?: string) => value?.trim() || null;

export async function submitOnboardingAction(values: OnboardingFormValues): Promise<never> {
    const parsed = onboardingSchema.safeParse(values);

    if (!parsed.success) {
        throw new Error('Please complete all required profile fields.');
    }

    const session = await auth();

    if (!session?.user?.email) {
        throw new Error('Your session has expired. Please sign in again.');
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        select: {
            id: true,
            isOnboarded: true,
        },
    });

    if (!user) {
        throw new Error('We could not find your account.');
    }

    if (user.isOnboarded) {
        redirect('/dashboard');
    }

    const payload = parsed.data;

    const profileData = {
        birthDate: new Date(payload.birthDate),
        gender: payload.gender,
        relationshipStage: payload.relationshipStage,
        occupation: emptyToNull(payload.occupation),
        receiveEmails: payload.receiveEmails,
    };

    await prisma.$transaction(async (tx) => {
        await tx.profile.upsert({
            where: {
                userId: user.id,
            },
            update: profileData,
            create: {
                userId: user.id,
                ...profileData,
            },
        });

        await tx.user.update({
            where: {
                id: user.id,
            },
            data: {
                isOnboarded: true,
            },
        });
    });

    revalidatePath('/dashboard');
    revalidatePath('/onboarding');

    redirect('/dashboard');
}
