/** Cookie prefix for debug overrides - single source of truth for server and client */
export const FLAG_OVERRIDE_COOKIE_PREFIX = "flag_override_"

/** Internal path segment the middleware rewrites A/B-tested routes to. Never linked publicly. */
export const AB_CODE_SEGMENT = "ab-code"

/**
 * The signed flags code contains dots, which make Next.js treat the URL as a
 * file path: with trailingSlash: true the origin then 308-redirects to strip
 * the slash that rewrite normalization itself re-appends, exposing the
 * internal URL (the #17265 failure mode). Encode dots as "~" (unreserved,
 * never in base64url) so the segment is directory-like in URLs.
 */
export const encodeABCode = (code: string) => code.replace(/\./g, "~")
export const decodeABCode = (code: string) => code.replace(/~/g, ".")
