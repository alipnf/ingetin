import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/config-admin';

export async function requireUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return;
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
  } catch {
    return;
  }
}
