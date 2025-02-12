import createMiddleware from "next-intl/middleware"

import { LOCALES_CODES } from "@/lib/constants"

import { routing } from "./routing"

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/${LOCALES_CODES.join("|")}/:path*`],
}
