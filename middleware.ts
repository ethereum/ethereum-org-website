import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"
import { DEFAULT_LOCALE } from "./src/lib/constants"

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest) {
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
