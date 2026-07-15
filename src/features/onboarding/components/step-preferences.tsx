'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';

import type { OnboardingFormValues } from '../schema';

export function StepPreferences({ form }: { form: UseFormReturn<OnboardingFormValues> }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/30 px-4 py-4">
                <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">Product updates</p>
                    <p className="text-[12px] text-muted-foreground">Occasional emails about new features and insights.</p>
                </div>
                <Controller
                    control={form.control}
                    name="receiveEmails"
                    render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Receive product updates" />}
                />
            </div>

            <p className="text-[12px] leading-relaxed text-muted-foreground">You&apos;re all set. Click finish to save your profile and start your first assessment.</p>
        </div>
    );
}
