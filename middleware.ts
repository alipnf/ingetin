import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;

  const protectedPaths = ['/dashboard'];
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    const loginUrl = new URL(`/login`, request.url);
    loginUrl.searchParams.set('redirect', url.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
