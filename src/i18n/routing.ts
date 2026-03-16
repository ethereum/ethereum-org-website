import { createNavigation } from "next-intl/navigation"

import { routing } from "./routing.config"

// Re-export routing config for convenience
export { routing }

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
