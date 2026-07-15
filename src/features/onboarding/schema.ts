import { Gender, RelationshipStage } from '@prisma/client';
import { z } from 'zod';

const MIN_AGE = 18;
const MAX_AGE = 120;

function isValidBirthDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;

    const today = new Date();
    const minDate = new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

    return date >= minDate && date <= maxDate;
}

export const onboardingSchema = z.object({
    birthDate: z
        .string({ message: 'Please select your birth date.' })
        .min(1, 'Please select your birth date.')
        .refine(isValidBirthDate, 'Please enter a valid birth date. You must be at least 18 years old.'),

    gender: z.nativeEnum(Gender, { message: 'Please select your gender.' }),

    relationshipStage: z.nativeEnum(RelationshipStage, { message: 'Please select your relationship stage.' }),

    occupation: z.string().trim().max(80, 'Occupation must be 80 characters or fewer.').optional().or(z.literal('')),

    receiveEmails: z.boolean(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

// One schema per step, used to gate "Continue" and to validate before advancing.
export const onboardingStepSchemas = [
    onboardingSchema.pick({ birthDate: true, gender: true }),
    onboardingSchema.pick({ relationshipStage: true, occupation: true }),
    onboardingSchema.pick({ receiveEmails: true }),
] as const;

// Field names per step, used with form.trigger() for step-scoped validation.
export const ONBOARDING_STEP_FIELDS = [['birthDate', 'gender'], ['relationshipStage', 'occupation'], ['receiveEmails']] as const satisfies readonly (keyof OnboardingFormValues)[][];
