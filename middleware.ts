import { precompute } from "flags/next"
import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"
import { abTestFlags } from "./src/lib/ab-testing/flags"
import { DEFAULT_LOCALE } from "./src/lib/constants"
import { getFirstSegment } from "./src/lib/utils/url"

const handleI18nRouting = createMiddleware(routing)

// Locales that have been removed but may have external links pointing to them
const DEPRECATED_LOCALES = new Set([
  // Previously deprecated
  "pcm",
  "fil",
  "ph",
  // Removed in locale reduction (67 → 25)
  "am",
  "az",
  "be",
  "bg",
  "bs",
  "ca",
  "da",
  "el",
  "fa",
  "fi",
  "ga",
  "gl",
  "gu",
  "ha",
  "he",
  "hr",
  "hu",
  "hy-am",
  "ig",
  "ka",
  "kk",
  "km",
  "kn",
  "lt",
  "ml",
  "ms",
  "nb",
  "ne-np",
  "nl",
  "no",
  "pt",
  "ro",
  "sk",
  "sl",
  "sn",
  "sr",
  "sv",
  "th",
  "tk",
  "tl",
  "tw",
  "uz",
  "yo",
])

// Routes that should have A/B testing precomputation
// Add paths here as A/B tests are configured for them
const AB_TEST_ROUTES = new Set(["/"])

function redirectTo(request: NextRequest, pathname: string, status: number) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url, status)
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const lowerPath = pathname.toLowerCase()
  if (pathname !== lowerPath) {
    return redirectTo(request, lowerPath, 301)
  }

  const firstSegment = getFirstSegment(lowerPath)

  if (firstSegment && DEPRECATED_LOCALES.has(firstSegment)) {
    // Strip deprecated locale and redirect to default locale version
    const rest = lowerPath.slice(firstSegment.length + 1)
    const newPath = !rest ? "/" : rest
    return redirectTo(request, newPath, 301)
  }

  // Handle i18n routing first
  const i18nResponse = handleI18nRouting(request)

  // Determine locale from the response or request
  const locale =
    firstSegment && !DEPRECATED_LOCALES.has(firstSegment)
      ? firstSegment
      : DEFAULT_LOCALE

  // Get path without locale prefix
  const localePrefix = `/${locale}`
  const pathWithoutLocale = pathname.startsWith(localePrefix + "/")
    ? pathname.slice(localePrefix.length)
    : pathname === localePrefix
      ? "/"
      : pathname

  // Check if this route should have A/B tests and is English locale
  const shouldPrecompute =
    AB_TEST_ROUTES.has(pathWithoutLocale) &&
    locale === DEFAULT_LOCALE &&
    abTestFlags.length > 0

  if (shouldPrecompute) {
    try {
      const code = await precompute(abTestFlags)
      const newUrl = new URL(request.url)
      newUrl.pathname = `/${locale}/${code}${pathWithoutLocale}`
      console.log(`[Middleware] A/B rewrite: ${pathname} -> ${newUrl.pathname}`)
      return NextResponse.rewrite(newUrl)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"
      console.error("[Middleware] A/B precompute failed:", message)
    }
  }

  // Upgrade default-locale strip redirects from 307 to 301 for SEO
  if (i18nResponse.status === 307) {
    const defaultPrefix = `/${DEFAULT_LOCALE}`
    if (
      pathname === defaultPrefix ||
      pathname.startsWith(`${defaultPrefix}/`)
    ) {
      return new NextResponse(null, {
        status: 301,
        headers: i18nResponse.headers,
      })
    }
  }

  return i18nResponse
}

// Simplified matcher pattern
export const config = {
  matcher: ["/((?!api|_next|_vercel|.well-known|.*\\.[^/]*$).*)"],
}
