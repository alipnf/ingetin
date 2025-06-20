import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/config-admin';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    await adminAuth.verifyIdToken(token);
  } catch {
    redirect('/login');
  }
  return <>{children}</>;
}
