export type LogLevel = "silent" | "error" | "warn" | "info" | "debug"

export interface Logger {
  debug: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
}

export interface Env {
  MATOMO_URL: string
  MATOMO_SITE_ID: string
  MATOMO_TIMEOUT_MS?: string
  LOG_LEVEL?: LogLevel
  HTTP_METHOD_ALLOWLIST?: string
  USER_AGENT_ALLOWLIST_REGEX?: string
  URL_EXCLUDE_REGEX?: string
  DOCUMENT_REGEX?: string
  [key: string]: string | undefined
}

export interface MatomoConfig {
  matomoUrl: string
  matomoSiteId: number
  matomoTimeoutMs: number
  logLevel: LogLevel
  httpMethodAllowlist: string[]
  userAgentAllowlistRegex?: RegExp
  urlExcludeRegex?: RegExp
  documentRegex?: RegExp
}

export interface MatomoPayload {
  [key: string]: string | number | boolean | undefined
  idsite: number
  rec: 1
  recMode: 1
  url: string
  source: "Cloudflare"
  cdt: string
  ua: string
  download?: string
  http_status?: number | string
  bw_bytes?: number | string
  pf_srv?: number | string
}

export interface WorkerContext {
  waitUntil(promise: Promise<unknown>): void
}
