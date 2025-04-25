import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

// This middleware handles automatic locale detection and redirects
export default createMiddleware({
  // Use the same locales configuration from routing.ts
  locales: routing.locales,

  // Use the default locale from routing.ts
  defaultLocale: routing.defaultLocale,

  // Enable locale detection from Accept-Language headers
  localeDetection: true,

  // Always use locale prefixes in URLs
  localePrefix: "always",
})

// Update matcher pattern to be specific and exclude static files and API routes
export const config = {
  matcher: [
    // Match the root path
    "/",

    // Match all paths except those that start with:
    // - api (API routes)
    // - _next (Next.js internals)
    // - public files with extensions (e.g. favicon.ico)
    "/((?!api|_next|.*\\.[^/]*$).*)",
  ],
}
