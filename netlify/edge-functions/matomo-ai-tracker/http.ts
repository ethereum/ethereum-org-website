/* global RequestInfo, RequestInit */
import { createLogger } from "./logger.ts"
import type { LogLevel, MatomoPayload } from "./types.ts"

export function buildMatomoRequestPayload(
  payload: Record<string, string | number | boolean | null | undefined>
): string {
  const search = new URLSearchParams()
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, String(value))
    }
  })
  return `?${search.toString()}`
}

export async function sendMatomoHit(
  matomoUrl: string,
  payload: MatomoPayload,
  timeoutMs = 5000,
  logLevel: LogLevel = "info",
  fetchImpl: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response> = fetch
): Promise<void> {
  const query = buildMatomoRequestPayload(payload)
  const baseUrl = new URL(matomoUrl)
  const basePath = baseUrl.pathname || "/"
  const strippedBasePath = /\/matomo\.php$/i.test(basePath)
    ? basePath.replace(/\/matomo\.php$/i, "/")
    : basePath
  const normalizedBasePath = strippedBasePath.endsWith("/")
    ? strippedBasePath
    : `${strippedBasePath}/`
  const url = new URL(baseUrl.toString())
  url.pathname = `${normalizedBasePath}matomo.php`
  url.search = query
  url.hash = ""
  const log = createLogger(logLevel)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetchImpl(url.toString(), {
      method: "GET",
      signal: controller.signal,
    })
    if (!res.ok) {
      throw new Error(`Matomo responded with status ${res.status}`)
    }
    log.debug("Matomo response", { status: res.status })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    log.error("Matomo send failed", { error: message })
    throw err
  } finally {
    clearTimeout(timeout)
  }
}
