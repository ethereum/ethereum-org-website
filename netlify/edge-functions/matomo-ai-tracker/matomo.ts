import type { MatomoConfig, MatomoPayload } from "./types.ts"
import {
  formatMatomoDateTime,
  getContentLength,
  isUserAgentAllowed,
} from "./utils.ts"

export function buildMatomoPayload(
  request: Request,
  response: Response,
  durationMs: number,
  config: MatomoConfig,
  timestamp: Date = new Date()
): MatomoPayload | null {
  if (!config || !config.matomoSiteId) {
    throw new Error("matomoSiteId is required in config")
  }

  const method = request.method.toUpperCase()
  if (
    Array.isArray(config.httpMethodAllowlist) &&
    config.httpMethodAllowlist.length > 0 &&
    !config.httpMethodAllowlist.includes(method)
  ) {
    return null
  }

  const url = request.url
  if (config.urlExcludeRegex && config.urlExcludeRegex.test(url)) {
    return null
  }
  const ua = request.headers.get("user-agent") || ""
  if (!isUserAgentAllowed(ua, config.userAgentAllowlistRegex)) {
    return null
  }

  const payload: MatomoPayload = {
    idsite: config.matomoSiteId,
    rec: 1,
    recMode: 1,
    url,
    source: "Cloudflare",
    cdt: formatMatomoDateTime(timestamp),
    ua,
  }

  if (response.status) {
    payload.http_status = response.status
  }

  const bytes = getContentLength(response)
  if (bytes !== undefined) {
    payload.bw_bytes = bytes
  }

  if (durationMs >= 0) {
    payload.pf_srv = Math.round(durationMs)
  }

  if (config.documentRegex && config.documentRegex.test(url)) {
    payload.download = url
  }

  return payload
}
