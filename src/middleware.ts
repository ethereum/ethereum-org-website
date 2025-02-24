import { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"
import { HEADER_PATHNAME_KEY } from "./lib/constants"

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // Add the pathname to be used by the i18n request handler and determine
  // the namespaces required for the page
  request.headers.set(HEADER_PATHNAME_KEY, request.nextUrl.pathname)

  return handleI18nRouting(request)
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
