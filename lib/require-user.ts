import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/config-admin';
import { redirect } from 'next/navigation';

export async function requireUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
  } catch {
    redirect('/login');
  }
}
