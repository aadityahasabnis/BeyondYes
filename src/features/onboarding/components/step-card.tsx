'use client';

import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

interface StepShellProps {
    icon: IconType;
    title: string;
    description: string;
    children: ReactNode;
}

export function StepShell({ icon: Icon, title, description, children }: StepShellProps) {
    return (
        <div className="space-y-7">
            <div className="space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-foreground/5">
                    <Icon className="size-4 text-foreground" />
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>

            {children}
        </div>
    );
}
