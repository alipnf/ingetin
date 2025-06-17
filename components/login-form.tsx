'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import ButtonGoogle from './button-google';
import SeparatorForm from './separator-form';
import FormField from './form-field';
import { Spinner } from './ui/spinner';
import { useAuth } from '@/hooks/use-auth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    isLoading,
    isGoogleLoading,
    formData,
    handleChange,
    handleSubmitLogin,
    handleGoogle,
  } = useAuth();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Masuk ke akun ingetin anda</CardDescription>
        </CardHeader>
        <CardContent>
          {isGoogleLoading ? (
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGoogleLoading}
              variant="outline"
            >
              <Spinner size="small" />
            </Button>
          ) : (
            <ButtonGoogle
              onClick={handleGoogle}
              disabled={isLoading || isGoogleLoading}
            >
              Login dengan Google
            </ButtonGoogle>
          )}
          <SeparatorForm>Atau login dengan email</SeparatorForm>
          <form onSubmit={handleSubmitLogin}>
            <div className="flex flex-col gap-6">
              <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="grid gap-3">
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {isLoading ? (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || isGoogleLoading}
                  >
                    <Spinner size="small" className="text-white" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || isGoogleLoading}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Belum punya akun?{' '}
              <Link href="/register" className="underline underline-offset-4">
                Daftar Sekarang
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground mt-3">
              <Link href="/" className="text-primary hover:underline">
                Kembali ke beranda
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
