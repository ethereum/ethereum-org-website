export const isUserAgentAllowed = (
  userAgent: string | undefined | null,
  regex?: RegExp
): boolean => {
  if (!regex) return true
  if (!userAgent) return false
  return regex.test(userAgent)
}

export const formatMatomoDateTime = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, "0")
  const year = date.getUTCFullYear()
  const month = pad(date.getUTCMonth() + 1)
  const day = pad(date.getUTCDate())
  const hours = pad(date.getUTCHours())
  const minutes = pad(date.getUTCMinutes())
  const seconds = pad(date.getUTCSeconds())
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// Netlify runs framework middleware (tier 1) ahead of toml-declared edge
// functions, so request.url arrives post-rewrite. Map internal rewrite shapes
// back to the public URL: the "as-needed" default-locale prefix
// (/en/learn -> /learn) and A/B variant routes
// (/en/ab-code/<code>/<path> -> /<path>).
export const normalizeTrackedUrl = (rawUrl: string): string => {
  const url = new URL(rawUrl)
  let pathname = url.pathname
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    pathname = pathname.slice(3) || "/"
  }
  const abMatch = pathname.match(/^\/ab-code\/[^/]+(\/.*)?$/)
  if (abMatch) {
    pathname = abMatch[1] || "/"
  }
  if (pathname !== url.pathname) {
    url.pathname = pathname
  }
  return url.toString()
}

export const getContentLength = (response: Response): number | undefined => {
  const header = response.headers.get("content-length")
  if (!header) return undefined
  const parsed = Number.parseInt(header, 10)
  return Number.isNaN(parsed) ? undefined : parsed
}
