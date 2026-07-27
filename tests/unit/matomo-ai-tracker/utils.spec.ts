// Ported from matomo-org/tracker-cloudflare tests/utils.test.ts

import { expect, test } from "@playwright/test"

import {
  formatMatomoDateTime,
  getContentLength,
  isUserAgentAllowed,
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
