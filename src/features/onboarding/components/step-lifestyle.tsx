'use client';

import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { RELATIONSHIP_STAGE_OPTIONS } from '../constants/schemaConstants';
import type { OnboardingFormValues } from '../schema';

export function StepLifestyle({ form }: { form: UseFormReturn<OnboardingFormValues> }) {
    const { register, watch, setValue, formState } = form;
    const relationshipStage = watch('relationshipStage');

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Relationship status</Label>
                <Select
                    value={relationshipStage ?? ''}
                    onValueChange={(value) => setValue('relationshipStage', value as OnboardingFormValues['relationshipStage'], { shouldValidate: true, shouldDirty: true })}>
                    <SelectTrigger className="w-full justify-between">
                        <SelectValue placeholder="Select relationship status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {RELATIONSHIP_STAGE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {formState.errors.relationshipStage ? <p className="text-[12px] text-destructive">{formState.errors.relationshipStage.message}</p> : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="occupation" className="text-sm font-medium text-foreground">
                    Occupation <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id="occupation" placeholder="Software Engineer" aria-invalid={!!formState.errors.occupation} {...register('occupation')} />
                {formState.errors.occupation ? <p className="text-[12px] text-destructive">{formState.errors.occupation.message}</p> : null}
            </div>
        </div>
    );
}
