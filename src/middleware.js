import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Allow paths that start with:
  // - /admin (so you can still access dashboard)
  // - /api (so APIs still work)
  // - /maintenance (the page we just created)
  // - /_next (static files, Next.js assets)
  // - /logo.png, /favicon.ico (static images)
  const isExcluded = url.pathname.startsWith('/admin') ||
                     url.pathname.startsWith('/api') ||
                     url.pathname.startsWith('/maintenance') ||
                     url.pathname.startsWith('/_next') ||
                     url.pathname === '/logo.png' ||
                     url.pathname === '/favicon.ico';
                     
  if (!isExcluded) {
    url.pathname = '/maintenance';
    // Use rewrite instead of redirect so the URL in browser doesn't change,
    // they just see the maintenance page on whatever link they clicked.
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
