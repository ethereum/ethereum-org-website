/**
 * Adds the trailing slash the site's `trailingSlash: true` would redirect to,
 * before any query: `/api/x?y=1` -> `/api/x/?y=1`. Saves a 308 per request.
 */
export const withTrailingSlash = (path: string) => {
  const [base, ...rest] = path.split("?")
  const query = rest.length ? `?${rest.join("?")}` : ""
  return `${base.endsWith("/") ? base : `${base}/`}${query}`
}
