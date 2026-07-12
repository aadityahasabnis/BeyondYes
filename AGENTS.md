# BeyondYes Development Guide

## Product

BeyondYes is NOT a dating application.

BeyondYes is a Relationship Intelligence Platform.

The goal is helping people understand themselves and understand each other before marriage.

Never build features that encourage swiping, ranking people, or superficial matching.

---

## Core Philosophy

Always optimize for:

- Self Awareness
- Understanding
- Healthy Communication
- Long-Term Growth
- Relationship Readiness

Never optimize for:

- Virality through manipulation
- Addictive mechanics
- Popularity rankings

---

## Tech Stack

Framework:
- Next.js App Router

Language:
- TypeScript

Database:
- PostgreSQL

ORM:
- Prisma

Authentication:
- Auth.js

Validation:
- Zod

Forms:
- React Hook Form

Styling:
- Tailwind CSS

UI:
- shadcn/ui

AI:
- OpenAI

Emails:
- Resend

Deployment:
- Vercel

---

## Architecture

Use Feature-first architecture.

Never organize primarily by component type.

Use:

features/
    assessment/
    auth/
    invitation/
    reports/
    dashboard/
    profile/

Business logic belongs in lib/.

---

## Principles

Keep business logic outside React components.

Keep Server Actions small.

Never calculate assessment scores inside UI components.

Create reusable services.

---

## Assessment Engine

The assessment engine is the core intellectual property.

Everything should revolve around:

Assessment

Section

Question

Option

Trait

Weight

Answer

Score

Report

Compatibility

The engine should support future assessments without code duplication.

---

## AI

AI never calculates scores.

AI only explains deterministic results.

The application calculates all scoring.

---

## Reports

Generate reports once.

Store them.

Never regenerate reports on every page load.

---

## Code Style

Prefer:

Server Components

Server Actions

Async Functions

Strong Types

Zod Validation

Avoid:

any

duplicated code

large components

business logic inside pages

---

## Naming

Use descriptive names.

Examples:

calculateTraitScore()

generateCompatibilityReport()

buildAssessmentPrompt()

saveAssessmentAttempt()

Never use vague names like:

processData()

handleThing()

---

## Goal

Every feature should answer one question:

"Does this help people understand themselves or each other better?"

If the answer is no, reconsider the feature.