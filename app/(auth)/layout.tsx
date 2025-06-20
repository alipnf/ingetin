import { requireUser } from '@/lib/require-user';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (user) redirect('/');

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      {children}
    </div>
  );
}
