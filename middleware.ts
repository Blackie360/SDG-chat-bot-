// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Configure which paths are protected
const protectedPaths = ['/dashboard'];
const authPaths = ['/auth/signin'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isAuthPath) {
    if (token) {
      // If user is already logged in and tries to access auth pages, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow access to auth pages if not logged in
    return NextResponse.next();
  }

  if (isProtectedPath && !token) {
    // Redirect to login if trying to access protected routes while not authenticated
    const redirectUrl = new URL('/auth/signin', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};

