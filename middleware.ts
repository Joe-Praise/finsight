import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect root path to dashboard/interest-rates
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/interest-rates', request.url));
  }

  // Continue with the request for all other paths
  return NextResponse.next();
}

export const config = {
  // Match only the root path exactly
  matcher: ['/'],
};
