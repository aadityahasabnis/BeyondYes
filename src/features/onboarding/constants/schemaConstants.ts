import { Gender, RelationshipStage } from '@prisma/client';

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'NON_BINARY', label: 'Non-binary' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];

export const RELATIONSHIP_STAGE_OPTIONS: { value: RelationshipStage; label: string }[] = [
    { value: 'SINGLE', label: 'Single' },
    { value: 'DATING', label: 'Dating' },
    { value: 'ENGAGED', label: 'Engaged' },
    { value: 'MARRIED', label: 'Married' },
    { value: 'DIVORCED', label: 'Divorced' },
    { value: 'WIDOWED', label: 'Widowed' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
];
