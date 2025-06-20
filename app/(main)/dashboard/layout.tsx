import { requireUser } from '@/lib/require-user';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return <>{children}</>;
}
