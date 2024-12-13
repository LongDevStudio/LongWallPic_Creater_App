import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Regular expression to match public files
const PUBLIC_FILE = /\.(.*)$/;

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
  // Skip middleware for public files, API routes, and other special paths
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  // Check if we need to redirect based on the cookie
  if (!request.nextUrl.pathname.startsWith('/en') &&
      !request.nextUrl.pathname.startsWith('/zh')) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    );
  }

  // Handle internationalization with next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(zh|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
