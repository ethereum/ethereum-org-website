import type { Env, LogLevel, MatomoConfig } from "./types.ts"

const toInt = (value: string | undefined | null, fallback?: number) => {
  if (value === undefined || value === null || value === "") return fallback
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) {
    throw new Error(`Expected integer value, got "${value}"`)
  }
  return parsed
}

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const defaultUserAgentPatterns = [
  "ChatGPT-User",
  "MistralAI-User",
  "Gemini-Deep-Research",
  "Claude-User",
  "Perplexity-User",
  "Google-NotebookLM",
]
const defaultAllowlistPattern = `(?:${defaultUserAgentPatterns
  .map(escapeRegex)
  .join("|")})`
const defaultHttpMethodAllowlist = ["GET"]
const defaultDocumentPattern =
  "^[^?]+\\.(?:pdf|docx?|xlsx?|pptx?|csv|json|txt|xml|epub|mobi|azw3|mp3|mp4|mpe?g|webm|mov|avi|ogg|wav|flac|zip|gz|gzip|tgz|tar|bz2|tbz|7z|rar|dmg|exe|msi|apk|jar|md5|sig)(?:\\?|$)"
const defaultUrlExcludePattern =
  "^[^?]+\\.(?:css|js|mjs|map|json|xml|webmanifest|manifest|png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?|woff2?|ttf|otf|eot|rss|atom|wasm|txt)(?:\\?|$)"

export function getConfig(
  env: Partial<Env> & Record<string, string | undefined>
): MatomoConfig {
  const matomoUrl = env.MATOMO_URL
  if (!matomoUrl) {
    throw new Error("MATOMO_URL is required")
  }

  const siteIdRaw = env.MATOMO_SITE_ID
  if (!siteIdRaw) {
    throw new Error("MATOMO_SITE_ID is required")
  }
  const matomoSiteId = toInt(siteIdRaw)
  if (matomoSiteId === undefined) {
    throw new Error("MATOMO_SITE_ID is required")
  }

  const matomoTimeoutMs = toInt(env.MATOMO_TIMEOUT_MS, 5000) ?? 5000
  const logLevel = (env.LOG_LEVEL || "warn").toLowerCase() as LogLevel
  const httpMethodAllowlist =
    env.HTTP_METHOD_ALLOWLIST && env.HTTP_METHOD_ALLOWLIST.trim()
      ? env.HTTP_METHOD_ALLOWLIST.split(",").map((v) => v.trim().toUpperCase())
      : defaultHttpMethodAllowlist
  const normalizedHttpMethodAllowlist = Array.from(
    new Set(httpMethodAllowlist.filter(Boolean))
  )
  if (normalizedHttpMethodAllowlist.length === 0) {
    throw new Error("HTTP_METHOD_ALLOWLIST must include at least one method")
  }
  const invalidMethod = normalizedHttpMethodAllowlist.find(
    (method) => !/^[A-Z]+$/.test(method)
  )
  if (invalidMethod) {
    throw new Error(
      `Invalid HTTP_METHOD_ALLOWLIST entry "${invalidMethod}" (expected letters only)`
    )
  }
  const allowlistPattern =
    env.USER_AGENT_ALLOWLIST_REGEX || defaultAllowlistPattern
  const urlExcludePattern = env.URL_EXCLUDE_REGEX || defaultUrlExcludePattern
  const documentPattern = env.DOCUMENT_REGEX || defaultDocumentPattern
  let userAgentAllowlistRegex: RegExp | undefined
  let urlExcludeRegex: RegExp | undefined
  let documentRegex: RegExp | undefined
  try {
    userAgentAllowlistRegex = new RegExp(allowlistPattern, "i")
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Invalid USER_AGENT_ALLOWLIST_REGEX: ${message}`)
  }
  try {
    urlExcludeRegex = new RegExp(urlExcludePattern, "i")
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Invalid URL_EXCLUDE_REGEX: ${message}`)
  }
  try {
    documentRegex = new RegExp(documentPattern, "i")
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Invalid DOCUMENT_REGEX: ${message}`)
  }

  return {
    matomoUrl,
    matomoSiteId,
    matomoTimeoutMs,
    logLevel,
    httpMethodAllowlist: normalizedHttpMethodAllowlist,
    userAgentAllowlistRegex,
    urlExcludeRegex,
    documentRegex,
  }
}
