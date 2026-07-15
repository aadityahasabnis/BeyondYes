'use client';

import { FaArrowRight, FaSpinner } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

interface OnboardingNavigationProps {
    isFirstStep: boolean;
    isLastStep: boolean;
    isPending: boolean;
    canContinue: boolean;
    onBack: () => void;
    onNext: () => void;
}

export function OnboardingNavigation({ isFirstStep, isLastStep, isPending, canContinue, onBack, onNext }: OnboardingNavigationProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={onBack} disabled={isFirstStep || isPending} className={isFirstStep ? 'invisible' : ''}>
                Back
            </Button>

            <Button type="button" onClick={onNext} disabled={!canContinue || isPending} className="min-w-32">
                {isPending ? (
                    <FaSpinner className="size-3.5 animate-spin" />
                ) : (
                    <>
                        {isLastStep ? 'Finish' : 'Continue'}
                        {!isLastStep && <FaArrowRight className="size-3.5" />}
                    </>
                )}
            </Button>
        </div>
    );
}
