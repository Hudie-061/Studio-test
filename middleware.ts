import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr", "nl"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("Accept-Language") ?? "";
  for (const locale of LOCALES) {
    if (header.toLowerCase().includes(locale)) return locale;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclusion-based: anything not listed here gets locale-routed. /privacy
  // and /legal live under app/[locale]/ and deliberately are NOT excluded —
  // unlike /print and /brand-assets, they must go through locale detection
  // and redirect (e.g. /privacy -> /en/privacy).
  matcher: [
    "/((?!api|brand-assets|print|icon|apple-icon|opengraph-image|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
