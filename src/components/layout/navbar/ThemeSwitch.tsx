'use client';

import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

export function ThemeSwitch() {
    const { resolvedTheme, setTheme } = useTheme();

    const dark = resolvedTheme === 'dark';
    const label = dark ? 'Light mode' : 'Dark mode';
    const Icon = dark ? FiSun : FiMoon;

    return (
        <div className="flex w-full items-center justify-between gap-2 rounded-sm py-0.5">
            <div className="flex min-w-0 items-center gap-2">
                <Icon className="h-3.5 w-3.5" />

                <span className="truncate text-xs text-foreground">{label}</span>
            </div>

            <Switch size="sm" checked={dark} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
        </div>
    );
}
