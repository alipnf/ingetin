import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/config-admin';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const { token } = await request.json();

  try {
    await adminAuth.verifyIdToken(token);
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Token verification failed:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return new Response(null, { status: 200 });
}
