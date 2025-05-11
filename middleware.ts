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

  // Call the next-intl middleware for all paths
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
