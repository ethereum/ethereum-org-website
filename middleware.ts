import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"
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

function redirectTo(request: NextRequest, pathname: string, status: number) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url, status)
}

export default function middleware(request: NextRequest) {
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

  // Handle i18n routing
  const response = handleI18nRouting(request)

  // Upgrade default-locale strip redirects from 307 to 301 for SEO
  if (response.status === 307) {
    const pathname = request.nextUrl.pathname
    const defaultPrefix = `/${DEFAULT_LOCALE}`
    if (
      pathname === defaultPrefix ||
      pathname.startsWith(`${defaultPrefix}/`)
    ) {
      return new NextResponse(null, { status: 301, headers: response.headers })
    }
  }

  return response
}

// Simplified matcher pattern
export const config = {
  matcher: ["/((?!api|_next|_vercel|.well-known|.*\\.[^/]*$).*)"],
}
