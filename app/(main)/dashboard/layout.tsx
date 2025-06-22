import { requireUser } from '@/lib/require-user';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user) redirect('/login');

  return <>{children}</>;
}
