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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginWithGoogle } from '@/lib/firebase/auth';
import { toast } from 'sonner';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser(formData.name, formData.email, formData.password);
      toast.success('Registrasi berhasil');
      router.push('/login');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registrasi gagal';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Registrasi berhasil');
      router.push('/');
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Registrasi dengan Google gagal';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Akun</CardTitle>
          <CardDescription>Buat akun baru di ingetin</CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonGoogle onClick={handleGoogleLogin} disabled={isLoading}>
            Daftar dengan Google
          </ButtonGoogle>
          <SeparatorForm>Atau daftar dengan email</SeparatorForm>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <FormField
                  id="name"
                  label="Nama"
                  type="text"
                  placeholder="Nama Lengkap"
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
                  label="Password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Daftar'}
                </Button>
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
