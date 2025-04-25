import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { routing } from "./i18n/routing"

// Create a custom middleware handler that wraps the next-intl middleware
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return
  }

  // Handle root path
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If no locale in path, redirect to default locale
  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    )
  }

  // Otherwise, let next-intl handle the request
  return createMiddleware(routing)(request)
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
