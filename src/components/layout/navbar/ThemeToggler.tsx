'use client';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = (): void => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 text-muted-foreground hover:text-foreground relative" aria-label="Toggle theme">
            <FiSun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0 text-yellow-500 dark:text-yellow-400" />
            <FiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100 text-indigo-400 dark:text-indigo-300" />
        </Button>
    );
};

export default ThemeToggler;
