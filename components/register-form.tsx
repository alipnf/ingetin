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
import FormField from './form-field';
import SeparatorForm from './separator-form';
import { Spinner } from './ui/spinner';
import { useAuth } from '@/hooks/use-auth';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    isLoading,
    isGoogleLoading,
    formData,
    handleChange,
    handleSubmitRegister,
    handleGoogle,
  } = useAuth();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Akun</CardTitle>
          <CardDescription>Buat akun baru di ingetin</CardDescription>
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
          <SeparatorForm>Atau daftar dengan email</SeparatorForm>
          <form onSubmit={handleSubmitRegister}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <FormField
                  id="name"
                  label="Nama"
                  type="text"
                  placeholder="Masukan Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormField
                  id="password"
                  label="Kata sandi"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
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
              Sudah punya akun?{' '}
              <Link href="/login" className="underline underline-offset-4">
                Login
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
