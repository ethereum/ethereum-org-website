import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"

export default createMiddleware(routing)

// Simplified matcher pattern
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\.[^/]*$).*)"],
}
