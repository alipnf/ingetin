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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Masuk ke akun ingetin anda</CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonGoogle>Login dengan Google</ButtonGoogle>
          <SeparatorForm>Atau login dengan email</SeparatorForm>
          <form>
            <div className="flex flex-col gap-6">
              <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="nama@email.com"
              />
              <div className="grid gap-3">
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="********"
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
                <Button type="submit" className="w-full">
                  Login
                </Button>
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
