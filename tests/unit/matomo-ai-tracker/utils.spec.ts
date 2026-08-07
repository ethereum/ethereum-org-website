// Ported from matomo-org/tracker-cloudflare tests/utils.test.ts

import { expect, test } from "@playwright/test"

import {
  formatMatomoDateTime,
  getContentLength,
  isUserAgentAllowed,
  normalizeTrackedUrl,
} from "../../../netlify/edge-functions/matomo-ai-tracker/utils"

test.describe("utils", () => {
  test("handles user agent allowlist correctly", () => {
    const regex = /Allowed/
    expect(isUserAgentAllowed("AllowedUA", regex)).toBe(true)
    expect(isUserAgentAllowed("OtherUA", regex)).toBe(false)
    expect(isUserAgentAllowed(undefined, regex)).toBe(false)
    expect(isUserAgentAllowed("AnyUA")).toBe(true)
  })

  test("formats date with zero padding", () => {
    const dt = new Date(Date.UTC(2025, 0, 2, 3, 4, 5))
    expect(formatMatomoDateTime(dt)).toBe("2025-01-02 03:04:05")
  })

  test("normalizes internal rewrite URLs back to public URLs", () => {
    // default-locale prefix from the as-needed i18n rewrite
    expect(normalizeTrackedUrl("https://x.org/en/learn/")).toBe(
      "https://x.org/learn/"
    )
    expect(normalizeTrackedUrl("https://x.org/en")).toBe("https://x.org/")
    expect(normalizeTrackedUrl("https://x.org/en/")).toBe("https://x.org/")
    // A/B variant rewrite
    expect(normalizeTrackedUrl("https://x.org/en/ab-code/abc123/learn/")).toBe(
      "https://x.org/learn/"
    )
    expect(normalizeTrackedUrl("https://x.org/en/ab-code/abc123")).toBe(
      "https://x.org/"
    )
    // untouched: non-default locales, lookalike paths, query strings
    expect(normalizeTrackedUrl("https://x.org/de/learn/")).toBe(
      "https://x.org/de/learn/"
    )
    expect(normalizeTrackedUrl("https://x.org/energy/")).toBe(
      "https://x.org/energy/"
    )
    expect(normalizeTrackedUrl("https://x.org/en/learn/?a=1#b")).toBe(
      "https://x.org/learn/?a=1#b"
    )
  })

  test("parses content length safely", () => {
    const response = new Response("ok", {
      headers: { "content-length": "123" },
    })
    expect(getContentLength(response)).toBe(123)
    const none = new Response("ok")
    expect(getContentLength(none)).toBeUndefined()
    const invalid = new Response("ok", {
      headers: { "content-length": "abc" },
    })
    expect(getContentLength(invalid)).toBeUndefined()
  })
})
