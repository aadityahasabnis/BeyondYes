'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiLayout, FiLogOut, FiSettings } from 'react-icons/fi';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { ThemeSwitch } from '../navbar/ThemeSwitch';

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    isOnboarded?: boolean;
}

interface UserMenuProps {
    user?: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
    const router = useRouter();

    if (!user) {
        return null;
    }

    const userInitials =
        user.name
            ?.split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) ??
        user.email?.charAt(0).toUpperCase() ??
        'U';

    const handleSignOut = async () => {
        await signOut({ redirectTo: '/login' });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label={user.name ? `Open ${user.name}'s account menu` : 'Open account menu'}
                className={cn(
                    'relative inline-flex h-10 w-10 items-center justify-center rounded-full p-0 outline-none transition-colors',
                    'hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    'data-[state=open]:bg-muted/60 data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-background'
                )}>
                <span className="pointer-events-none relative block h-10 w-10 rounded-full border border-border/60 bg-background shadow-sm">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'User'} />

                        <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-sm font-semibold text-primary-foreground">{userInitials}</AvatarFallback>
                    </Avatar>

                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={12} className="w-64 p-2">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-11 w-11 ring-1 ring-border/60">
                                <AvatarImage src={user.image ?? undefined} alt={user.name ?? 'User'} />

                                <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-sm font-semibold text-primary-foreground">{userInitials}</AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-foreground">{user.name ?? 'Unnamed user'}</p>

                                <p className="truncate text-xs text-muted-foreground">{user.email ?? 'No email attached'}</p>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                        <FiLayout className="h-4 w-4" />
                        <span>Dashboard</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push('/settings')}>
                        <FiSettings className="h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleSignOut} variant="destructive">
                        <FiLogOut className="h-4 w-4" />
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <div className="px-2 pb-1 pt-1">
                        <ThemeSwitch />
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
