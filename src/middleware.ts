import { NextRequest, NextResponse } from "next/server"

import { DEFAULT_LOCALE, FAKE_LOCALE, LOCALES_CODES } from "./lib/constants"

const PUBLIC_FILE = /\.(.*)$/

function detectLocale(acceptLanguage: string | null) {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE
  }

  // it comes in the format of `en-US,en;q=0.9,de;q=0.8`
  const locales = acceptLanguage.split(",")

  const locale = locales
    .map((localeWeight) => localeWeight.split(";")[0].trim())
    .find((locale) => {
      return LOCALES_CODES.includes(locale)
    })

  return locale
}

export const config = {
  matcher: [
    "/", // explicit matcher for root route
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     */
    "/((?!_next/static).*)",
  ],
}

// Middleware required to always display the locale prefix in the URL. It
// redirects to the default locale if the locale is not present in the URL
export async function middleware(req: NextRequest) {
  const { pathname, locale, search } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return
  }

  if (locale === FAKE_LOCALE) {
    // Apparently, the built-in `localeDetection`from Next does not work when
    // using the faked locale hack. So, we need to detect the locale manually
    const localeDetected = detectLocale(req.headers.get("accept-language"))
    const locale = localeDetected || DEFAULT_LOCALE

    const redirectUrl = new URL(`/${locale}${pathname}${search}`, req.url)

    // Add trailing slash if it's not present
    if (!redirectUrl.pathname.endsWith("/")) {
      redirectUrl.pathname = redirectUrl.pathname + "/"
    }

    // return NextResponse.redirect(redirectUrl, { status: 301 })
  }
}
