import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

export const routing = defineRouting({
  locales: LOCALES_CODES,
  defaultLocale: DEFAULT_LOCALE,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
