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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Akun</CardTitle>
          <CardDescription>Buat akun baru di ingetin</CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonGoogle>Daftar dengan Google</ButtonGoogle>
          <SeparatorForm>Atau daftar dengan email</SeparatorForm>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <FormField
                  id="name"
                  label="Nama"
                  type="text"
                  placeholder="Nama Lengkap"
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                />
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="********"
                />
                <FormField
                  id="confirmPassword"
                  label="Konfirmasi Password"
                  type="password"
                  placeholder="********"
                />
                <Button type="submit" className="w-full">
                  Daftar
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
