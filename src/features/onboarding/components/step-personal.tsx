'use client';

import * as React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { GENDER_OPTIONS } from '../constants/schemaConstants';
import type { OnboardingFormValues } from '../schema';

const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export function StepPersonal({ form }: { form: UseFormReturn<OnboardingFormValues> }) {
    const { watch, setValue, formState } = form;
    const birthDate = watch('birthDate');
    const gender = watch('gender');
    const [open, setOpen] = React.useState(false);

    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const selectedDate = birthDate ? new Date(`${birthDate}T12:00:00`) : undefined;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-medium text-foreground">
                    Birth date
                </Label>
                <Button
                    id="birthDate"
                    type="button"
                    variant="outline"
                    className="h-11 w-full justify-start font-normal"
                    aria-invalid={!!formState.errors.birthDate}
                    aria-expanded={open}
                    onClick={() => setOpen((previous) => !previous)}>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select date'}
                </Button>
                {open ? (
                    <div className="rounded-xl border border-border bg-background p-2 shadow-sm">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            defaultMonth={selectedDate ?? maxDate}
                            captionLayout="dropdown"
                            disabled={{ before: minDate, after: maxDate }}
                            onSelect={(date) => {
                                if (!date) return;

                                setValue('birthDate', formatDateValue(date), { shouldValidate: true, shouldDirty: true });
                                setOpen(false);
                            }}
                        />
                    </div>
                ) : null}
                {formState.errors.birthDate ? <p className="text-[12px] text-destructive">{formState.errors.birthDate.message}</p> : null}
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Gender</Label>
                <Select value={gender ?? ''} onValueChange={(value) => setValue('gender', value as OnboardingFormValues['gender'], { shouldValidate: true, shouldDirty: true })}>
                    <SelectTrigger className="w-full justify-between">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {GENDER_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {formState.errors.gender ? <p className="text-[12px] text-destructive">{formState.errors.gender.message}</p> : null}
            </div>
        </div>
    );
}
