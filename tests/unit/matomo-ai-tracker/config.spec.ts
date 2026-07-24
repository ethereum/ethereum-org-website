// Ported from matomo-org/tracker-cloudflare tests/config.test.ts

import { expect, test } from "@playwright/test"

import { getConfig } from "../../../netlify/edge-functions/matomo-ai-tracker/config"

const baseEnv = {
  MATOMO_URL: "https://analytics.example.com",
  MATOMO_SITE_ID: "42",
}

test.describe("getConfig", () => {
  test("reads required fields and defaults", () => {
    const config = getConfig({ ...baseEnv })
    expect(config).toMatchObject({
      matomoUrl: baseEnv.MATOMO_URL,
      matomoSiteId: 42,
      matomoTimeoutMs: 5000,
      logLevel: "warn",
      httpMethodAllowlist: ["GET"],
    })
    expect(config.userAgentAllowlistRegex).toEqual(
      /(?:ChatGPT-User|MistralAI-User|Gemini-Deep-Research|Claude-User|Perplexity-User|Google-NotebookLM)/i
    )
    expect(config.urlExcludeRegex).toEqual(
      /^[^?]+\.(?:css|js|mjs|map|json|xml|webmanifest|manifest|png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?|woff2?|ttf|otf|eot|rss|atom|wasm|txt)(?:\?|$)/i
    )
    expect(config.documentRegex).toEqual(
      /^[^?]+\.(?:pdf|docx?|xlsx?|pptx?|csv|json|txt|xml|epub|mobi|azw3|mp3|mp4|mpe?g|webm|mov|avi|ogg|wav|flac|zip|gz|gzip|tgz|tar|bz2|tbz|7z|rar|dmg|exe|msi|apk|jar|md5|sig)(?:\?|$)/i
    )
  })

  test("uses optional overrides", () => {
    const config = getConfig({
      ...baseEnv,
      MATOMO_TIMEOUT_MS: "8000",
      LOG_LEVEL: "debug",
      HTTP_METHOD_ALLOWLIST: "get, post",
      USER_AGENT_ALLOWLIST_REGEX: "CustomBot",
      URL_EXCLUDE_REGEX: "\\.(?:js|css)$",
      DOCUMENT_REGEX: "\\.custom$",
    })
    expect(config).toMatchObject({
      matomoUrl: baseEnv.MATOMO_URL,
      matomoSiteId: 42,
      matomoTimeoutMs: 8000,
      logLevel: "debug",
      httpMethodAllowlist: ["GET", "POST"],
    })
    expect(config.userAgentAllowlistRegex).toEqual(/CustomBot/i)
    expect(config.urlExcludeRegex).toEqual(/\.(?:js|css)$/i)
    expect(config.documentRegex).toEqual(/\.custom$/i)
  })

  test("defaults to GET when HTTP_METHOD_ALLOWLIST is empty/blank", () => {
    expect(
      getConfig({ ...baseEnv, HTTP_METHOD_ALLOWLIST: "" }).httpMethodAllowlist
    ).toEqual(["GET"])
    expect(
      getConfig({ ...baseEnv, HTTP_METHOD_ALLOWLIST: "   " })
        .httpMethodAllowlist
    ).toEqual(["GET"])
  })

  test("throws on invalid regex config", () => {
    expect(() =>
      getConfig({ ...baseEnv, USER_AGENT_ALLOWLIST_REGEX: "[" })
    ).toThrow(/Invalid USER_AGENT_ALLOWLIST_REGEX/)
    expect(() => getConfig({ ...baseEnv, URL_EXCLUDE_REGEX: "[" })).toThrow(
      /Invalid URL_EXCLUDE_REGEX/
    )
    expect(() => getConfig({ ...baseEnv, DOCUMENT_REGEX: "[" })).toThrow(
      /Invalid DOCUMENT_REGEX/
    )
  })

  test("throws on invalid HTTP_METHOD_ALLOWLIST", () => {
    expect(() => getConfig({ ...baseEnv, HTTP_METHOD_ALLOWLIST: "$" })).toThrow(
      /Invalid HTTP_METHOD_ALLOWLIST/
    )
    expect(() => getConfig({ ...baseEnv, HTTP_METHOD_ALLOWLIST: "," })).toThrow(
      /HTTP_METHOD_ALLOWLIST must include at least one method/
    )
  })

  test("falls back to NEXT_PUBLIC_* vars when unprefixed are absent", () => {
    const config = getConfig({
      NEXT_PUBLIC_MATOMO_URL: "https://public.example.com",
      NEXT_PUBLIC_MATOMO_SITE_ID: "5",
    })
    expect(config.matomoUrl).toBe("https://public.example.com")
    expect(config.matomoSiteId).toBe(5)
  })

  test("unprefixed vars override NEXT_PUBLIC_* vars", () => {
    const config = getConfig({
      ...baseEnv,
      NEXT_PUBLIC_MATOMO_URL: "https://public.example.com",
      NEXT_PUBLIC_MATOMO_SITE_ID: "5",
    })
    expect(config.matomoUrl).toBe(baseEnv.MATOMO_URL)
    expect(config.matomoSiteId).toBe(42)
  })

  test("throws when MATOMO_URL is missing", () => {
    expect(() => getConfig({ MATOMO_SITE_ID: "1" })).toThrow(
      /MATOMO_URL is required/
    )
  })

  test("throws when MATOMO_SITE_ID is missing", () => {
    expect(() => getConfig({ MATOMO_URL: baseEnv.MATOMO_URL })).toThrow(
      /MATOMO_SITE_ID is required/
    )
  })

  test("throws when MATOMO_SITE_ID is empty string", () => {
    expect(() =>
      getConfig({ MATOMO_URL: baseEnv.MATOMO_URL, MATOMO_SITE_ID: "" })
    ).toThrow(/MATOMO_SITE_ID is required/)
  })

  test("throws when numeric fields are not integers", () => {
    expect(() => getConfig({ ...baseEnv, MATOMO_SITE_ID: "abc" })).toThrow(
      /Expected integer value/
    )
    expect(() => getConfig({ ...baseEnv, MATOMO_TIMEOUT_MS: "abc" })).toThrow(
      /Expected integer value/
    )
  })
})
