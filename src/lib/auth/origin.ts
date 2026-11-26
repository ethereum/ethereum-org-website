import { SITE_URL } from "@/lib/constants"

/**
 * Origin that passkeys and SIWE messages are bound to: the deploy's own URL,
 * resolved at build time, or localhost in development.
 */
export const AUTH_ORIGIN =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${process.env.PORT ?? 3000}`
    : new URL(SITE_URL).origin

/** Passkeys bind to the hostname alone */
export const AUTH_HOST = new URL(AUTH_ORIGIN).hostname

/** SIWE messages name the host with its port, as the browser's address bar does */
export const AUTH_DOMAIN = new URL(AUTH_ORIGIN).host
