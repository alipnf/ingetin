import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/config-admin';

export async function requireUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
  } catch (error) {
    // If token is invalid/expired, delete it
    cookieStore.set('token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });
    return null;
  }
}
