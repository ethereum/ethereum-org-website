import { precompute } from "flags/next"
import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"
import {
  AB_CODE_SEGMENT,
  encodeABCode,
  FLAG_OVERRIDE_COOKIE_PREFIX,
} from "./src/lib/ab-testing/constants"
import { abTestRoutes, ALLOW_DEBUG_OVERRIDES } from "./src/lib/ab-testing/flags"
import { getActiveExperimentNames } from "./src/lib/ab-testing/matomo-adapter"
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
  "se",
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

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Catch malformed percent-encoding (e.g. `%GG`, a bare `%`) before route
  // params are decoded. Otherwise the framework-level decodeURIComponent in
  // the [locale]/[...slug] catch-all throws "failed to decode param",
  // surfacing as an unhandled 500 (#17967). Redirect to a well-formed slug
  // that fails validation in the catch-all, which calls notFound() — so the
  // visitor lands on the styled, localized 404 page. This must be a
  // redirect, not a rewrite: on a rewrite Next still decodes the original
  // request URL and throws the same 500, whereas the redirect produces a
  // fresh request with a clean path. (A bare NextResponse with status 400
  // would render as a browser-default dead-end page.)
  try {
    decodeURIComponent(pathname)
  } catch {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}/__bad-request__`, request.url),
      302
    )
  }

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

  // A/B testing: precompute flag variants and rewrite to the coded route,
  // which serves a statically generated page per variant permutation.
  // Only exact canonical paths match (non-canonical forms fall through and
  // get slash-normalized first). Only the default locale is A/B tested:
  // English URLs are unprefixed, so locale-prefixed paths never match.
  // On failure, or with no experiment running, fall through to the real page.
  const routeFlags = abTestRoutes[pathname]
  if (routeFlags?.length) {
    try {
      // Only rewrite while a test is actually running, so the deployed page
      // stays authoritative before launch and after a pause. Debug overrides
      // force a rewrite so variants stay previewable on non-prod deploys.
      const forced =
        ALLOW_DEBUG_OVERRIDES &&
        routeFlags.some((flag) =>
          request.cookies.has(`${FLAG_OVERRIDE_COOKIE_PREFIX}${flag.key}`)
        )

      const running =
        forced ||
        (await getActiveExperimentNames().then((active) =>
          routeFlags.some((flag) => active.has(flag.key))
        ))

      if (running) {
        const code = await precompute(routeFlags)
        const url = request.nextUrl.clone()
        // The coded segment goes *below* the tested path, not above it, so the
        // route's own layouts stay active - a coded page hoisted to the app
        // root loses parallel slots like find-wallet's @modal, which breaks
        // route interception for the variant being tested.
        url.pathname = `/${DEFAULT_LOCALE}${pathname}${AB_CODE_SEGMENT}/${encodeABCode(code)}/`
        return NextResponse.rewrite(url)
      }
    } catch (error) {
      console.error("[proxy] A/B precompute failed:", error)
    }
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
