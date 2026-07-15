'use client';

import { useState, useTransition } from 'react';
import { useForm, type FieldErrors, type Resolver } from 'react-hook-form';

import { ONBOARDING_STEP_FIELDS, onboardingSchema, onboardingStepSchemas, type OnboardingFormValues } from '../schema';
import { submitOnboardingAction } from '../actions';

const STEP_COUNT = onboardingStepSchemas.length;

const resolver: Resolver<OnboardingFormValues> = async (values) => {
    const result = onboardingSchema.safeParse(values);

    if (result.success) {
        return { values: result.data, errors: {} };
    }

    const errors = result.error.issues.reduce<FieldErrors<OnboardingFormValues>>((accumulator, issue) => {
        const field = issue.path[0] as keyof OnboardingFormValues | undefined;

        if (field && !accumulator[field]) {
            accumulator[field] = { type: issue.code, message: issue.message };
        }

        return accumulator;
    }, {});

    return { values: {}, errors };
};

// Next.js redirect() throws a special error under the hood — we must let it
// propagate instead of treating it as a failed submission.
function isRedirectError(error: unknown): boolean {
    return (
        typeof error === 'object' &&
        error !== null &&
        'digest' in error &&
        typeof (error as { digest?: unknown }).digest === 'string' &&
        (error as { digest: string }).digest.startsWith('NEXT_REDIRECT')
    );
}

export function useOnboarding() {
    const form = useForm<OnboardingFormValues>({
        resolver,
        mode: 'onChange',
        defaultValues: {
            birthDate: '',
            gender: undefined as never,
            relationshipStage: undefined as never,
            occupation: '',
            receiveEmails: true,
        },
    });

    const [step, setStep] = useState(0);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const isFirstStep = step === 0;
    const isLastStep = step === STEP_COUNT - 1;

    const goNext = async () => {
        const fields = ONBOARDING_STEP_FIELDS[step];
        const isValid = await form.trigger(fields as (keyof OnboardingFormValues)[], { shouldFocus: true });

        if (isValid) {
            setStep((current) => Math.min(current + 1, STEP_COUNT - 1));
        }
    };

    const goBack = () => {
        setSubmitError(null);
        setStep((current) => Math.max(current - 1, 0));
    };

    const submit = form.handleSubmit((values) => {
        setSubmitError(null);

        startTransition(async () => {
            try {
                await submitOnboardingAction(values);
            } catch (error) {
                if (isRedirectError(error)) {
                    throw error;
                }

                setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
            }
        });
    });

    return {
        form,
        step,
        stepCount: STEP_COUNT,
        isFirstStep,
        isLastStep,
        isPending,
        submitError,
        goNext,
        goBack,
        submit,
    };
}
