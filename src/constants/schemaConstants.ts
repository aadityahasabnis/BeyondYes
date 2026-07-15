import { Gender, RelationshipStage } from '@prisma/client';

export const GENDER_OPTIONS = [
    {
        label: 'Male',
        value: Gender.MALE,
    },
    {
        label: 'Female',
        value: Gender.FEMALE,
    },
    {
        label: 'Non-binary',
        value: Gender.NON_BINARY,
    },
    {
        label: 'Prefer not to say',
        value: Gender.PREFER_NOT_TO_SAY,
    },
] as const;

export const RELATIONSHIP_STAGE_OPTIONS = [
    {
        label: 'Single',
        value: RelationshipStage.SINGLE,
    },
    {
        label: 'Dating',
        value: RelationshipStage.DATING,
    },
    {
        label: 'Engaged',
        value: RelationshipStage.ENGAGED,
    },
    {
        label: 'Married',
        value: RelationshipStage.MARRIED,
    },
    {
        label: 'Divorced',
        value: RelationshipStage.DIVORCED,
    },
    {
        label: 'Widowed',
        value: RelationshipStage.WIDOWED,
    },
    {
        label: 'Prefer not to say',
        value: RelationshipStage.PREFER_NOT_TO_SAY,
    },
] as const;
