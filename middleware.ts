import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;

  const protectedPaths = ['/dashboard'];
  const authPaths = ['/login', '/register'];
  
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );
  
  const isAuthPage = authPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  // If trying to access protected page without token, redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL(`/login`, request.url);
    loginUrl.searchParams.set('redirect', url.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access auth pages with valid token, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
