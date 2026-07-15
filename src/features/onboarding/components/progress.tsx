'use client';

interface OnboardingProgressProps {
    step: number;
    stepCount: number;
    labels: string[];
}

export function OnboardingProgress({ step, stepCount, labels }: OnboardingProgressProps) {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-1.5">
                {Array.from({ length: stepCount }).map((_, index) => (
                    <div key={index} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${index <= step ? 'bg-foreground' : 'bg-muted'}`} />
                ))}
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span>{labels[step]}</span>
                <span>
                    {step + 1} / {stepCount}
                </span>
            </div>
        </div>
    );
}
