import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"

// Create the base middleware
const intlMiddleware = createMiddleware(routing)

// Wrap it with our debugging middleware
export default async function middleware(request) {
  // Use console.log for Edge Runtime compatible logging
  console.log("\n🔍 MIDDLEWARE DEBUG START")
  console.log(`📥 Original URL: ${request.url}`)
  console.log(`📥 Original pathname: ${request.nextUrl.pathname}`)
  console.log(`🌐 Default locale: ${routing.defaultLocale}`)

  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.includes(".")
  ) {
    console.log("⏭️  Skipping middleware for static/API route")
    return NextResponse.next()
  }

  // Check if path already has a locale
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    console.log("⏭️  Path already has locale, skipping middleware")
    return NextResponse.next()
  }

  // Force redirect to default locale for root path
  if (pathname === "/") {
    const response = NextResponse.redirect(
      new URL(`/${routing.defaultLocale}`, request.url)
    )
    console.log(`📤 Redirecting root to: ${routing.defaultLocale}`)
    return response
  }

  // Call the next-intl middleware for all other paths
  const response = await intlMiddleware(request)

  // Log the response
  console.log(`📤 Redirect URL: ${response.headers.get("location")}`)
  console.log(`📤 Response status: ${response.status}`)
  console.log(
    `📤 Response headers: ${JSON.stringify(Object.fromEntries(response.headers), null, 2)}`
  )
  console.log("🔍 MIDDLEWARE DEBUG END\n")

  return response
}

// Simplified matcher pattern
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\.[^/]*$).*)"],
}
