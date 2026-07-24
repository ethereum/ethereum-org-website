// Ported from matomo-org/tracker-cloudflare tests/matomo.test.ts

import { expect, test } from "@playwright/test"

import { getConfig } from "../../../netlify/edge-functions/matomo-ai-tracker/config"
import { buildMatomoPayload } from "../../../netlify/edge-functions/matomo-ai-tracker/matomo"

const config = getConfig({
  MATOMO_URL: "https://analytics.example.com",
  MATOMO_SITE_ID: "99",
  USER_AGENT_ALLOWLIST_REGEX: ".*",
})

test.describe("buildMatomoPayload", () => {
  const request = new Request("https://example.com/files/report.pdf?foo=bar", {
    headers: { "user-agent": "AgentX" },
  })

  test("builds payload with response metadata", () => {
    const response = new Response("ok", {
      status: 201,
      headers: { "content-length": "512" },
    })
    const payload = buildMatomoPayload(
      request,
      response,
      1234,
      config,
      new Date("2025-02-18T12:00:00Z")
    )

    expect(payload).toEqual({
      idsite: 99,
      rec: 1,
      recMode: 1,
      url: request.url,
      source: "Netlify",
      cdt: "2025-02-18 12:00:00",
      ua: "AgentX",
      http_status: 201,
      bw_bytes: 512,
      pf_srv: 1234,
      download: request.url,
    })
  })

  test("omits optional fields when unavailable", () => {
    const response = new Response(null, { status: 200 })
    const payload = buildMatomoPayload(
      new Request("https://example.com/path", {
        headers: { "user-agent": "AgentX" },
      }),
      response,
      5,
      { ...config, documentRegex: undefined },
      new Date("2025-02-18T12:00:01Z")
    )

    expect(payload).not.toHaveProperty("bw_bytes")
    expect(payload).not.toHaveProperty("download")
    expect(payload?.pf_srv).toBe(5)
    expect(payload?.cdt).toBe("2025-02-18 12:00:01")
  })

  test("returns null when user agent is not allowlisted", () => {
    const cfg = getConfig({
      MATOMO_URL: "https://analytics.example.com",
      MATOMO_SITE_ID: "99",
      USER_AGENT_ALLOWLIST_REGEX: "AllowedUA",
    })
    const response = new Response(null, { status: 200 })
    const payload = buildMatomoPayload(
      new Request("https://example.com", {
        headers: { "user-agent": "OtherUA" },
      }),
      response,
      10,
      cfg
    )
    expect(payload).toBeNull()
  })

  test("returns null when url is excluded", () => {
    const response = new Response(null, { status: 200 })
    const payload = buildMatomoPayload(
      new Request("https://example.com/assets/app.js?ver=1", {
        headers: { "user-agent": "AgentX" },
      }),
      response,
      10,
      config
    )
    expect(payload).toBeNull()
  })

  test("returns null when http method is not allowlisted", () => {
    const response = new Response(null, { status: 200 })
    const payload = buildMatomoPayload(
      new Request("https://example.com/path", {
        method: "POST",
        headers: { "user-agent": "AgentX" },
      }),
      response,
      10,
      config
    )
    expect(payload).toBeNull()
  })

  test("tracks request when http method is allowlisted", () => {
    const cfg = getConfig({
      MATOMO_URL: "https://analytics.example.com",
      MATOMO_SITE_ID: "99",
      HTTP_METHOD_ALLOWLIST: "GET,POST",
      USER_AGENT_ALLOWLIST_REGEX: ".*",
    })
    const response = new Response(null, { status: 200 })
    const payload = buildMatomoPayload(
      new Request("https://example.com/path", {
        method: "POST",
        headers: { "user-agent": "AgentX" },
      }),
      response,
      10,
      cfg
    )
    expect(payload).not.toBeNull()
    expect(payload?.url).toBe("https://example.com/path")
  })

  test("uses defaults when user agent allowlist is disabled", () => {
    const response = new Response(null, { status: 200 })
    const payload = buildMatomoPayload(
      new Request("https://example.com", { headers: {} }),
      response,
      10,
      { ...config, userAgentAllowlistRegex: undefined }
    )
    expect(payload?.ua).toBe("")
  })

  test("throws when matomoSiteId is missing in config", () => {
    const response = new Response("ok", { status: 200 })
    expect(() =>
      buildMatomoPayload(
        new Request("https://example.com"),
        response,
        10,
        {} as never
      )
    ).toThrow(/matomoSiteId is required/)
  })
})
