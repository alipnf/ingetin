'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { ModeToggle } from './mode-toogle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DialogLogout } from './ui/dialog-logout';
import { useNavbar } from '@/hooks/use-navbar';

const routes = [
  {
    href: '/',
    label: 'Beranda',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
  },
];

export function Navbar() {
  const { pathName, user, initalName, handleLogout } = useNavbar();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          Ingetin
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathName === route.href ? 'text-primary' : null
              )}
            >
              {route.label}
            </Link>
          ))}
          <div className="md:flex gap-2 items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.photoURL || initalName} />
                    <AvatarFallback>{initalName}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{user.name}</DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DialogLogout handleLogout={handleLogout} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="outline">Daftar</Button>
                </Link>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {routes.map((route) => (
                <DropdownMenuItem asChild key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      'w-full text-sm',
                      pathName === route.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {route.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              {user ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <DialogLogout handleLogout={handleLogout} />
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="flex gap-2 w-full px-3 py-2">
                  <Link href="/register" className="w-1/2">
                    <Button variant="outline" size="sm" className="w-full">
                      Daftar
                    </Button>
                  </Link>
                  <Link href="/login" className="w-1/2">
                    <Button size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
