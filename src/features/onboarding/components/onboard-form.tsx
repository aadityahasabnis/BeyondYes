'use client';

import { FaBriefcase, FaCircleUser, FaHeart } from 'react-icons/fa6';

import { useOnboarding } from '../hooks/use-onboarding';
import { onboardingStepSchemas } from '../schema';
import { OnboardingNavigation } from './navigation';
import { OnboardingProgress } from './progress';
import { StepShell } from './step-card';
import { StepLifestyle } from './step-lifestyle';
import { StepPersonal } from './step-personal';
import { StepPreferences } from './step-preferences';

const STEPS = [
    {
        label: 'Personal',
        icon: FaCircleUser,
        title: 'Tell us about yourself',
        description: 'A couple of basics to personalize your experience.',
    },
    {
        label: 'Lifestyle',
        icon: FaHeart,
        title: 'Where you stand today',
        description: 'This helps us tailor the right assessments for you.',
    },
    {
        label: 'Preferences',
        icon: FaBriefcase,
        title: 'Almost there',
        description: 'One last thing before we get started.',
    },
] as const;

export function OnboardForm({ userName }: { userName: string }) {
    const { form, step, stepCount, isFirstStep, isLastStep, isPending, submitError, goNext, goBack, submit } = useOnboarding();

    // Re-derives on every watched change so "Continue" enables the instant the step is valid.
    const currentStepValues = form.watch();
    const currentStepIsValid = onboardingStepSchemas[step].safeParse(currentStepValues).success;

    const current = STEPS[step];

    const handleContinue = () => {
        if (isLastStep) {
            void submit();
        } else {
            void goNext();
        }
    };

    return (
        <div className="mx-auto w-full max-w-lg">
            <p className="mb-6 text-center text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{userName}</span>
            </p>

            <div className="rounded-2xl border border-border/70 bg-card px-7 py-8 shadow-sm">
                <div className="mb-8">
                    <OnboardingProgress step={step} stepCount={stepCount} labels={STEPS.map((s) => s.label)} />
                </div>

                <StepShell icon={current.icon} title={current.title} description={current.description}>
                    {step === 0 ? <StepPersonal form={form} /> : null}
                    {step === 1 ? <StepLifestyle form={form} /> : null}
                    {step === 2 ? <StepPreferences form={form} /> : null}
                </StepShell>

                {submitError ? <p className="mt-5 rounded-lg bg-destructive/10 px-3 py-2 text-[12px] text-destructive">{submitError}</p> : null}

                <div className="mt-8 border-t border-border/70 pt-5">
                    <OnboardingNavigation isFirstStep={isFirstStep} isLastStep={isLastStep} isPending={isPending} canContinue={currentStepIsValid} onBack={goBack} onNext={handleContinue} />
                </div>
            </div>
        </div>
    );
}
