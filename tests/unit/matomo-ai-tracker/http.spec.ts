// Ported from matomo-org/tracker-cloudflare tests/http.test.ts

import { expect, test } from "@playwright/test"

import {
  buildMatomoRequestPayload,
  sendMatomoHit,
} from "../../../netlify/edge-functions/matomo-ai-tracker/http"
import type { MatomoPayload } from "../../../netlify/edge-functions/matomo-ai-tracker/types"

import { createConsoleSpies, type FetchArgs } from "./helpers"

const basePayload: MatomoPayload = {
  idsite: 1,
  rec: 1,
  recMode: 1,
  url: "https://example.com/path?foo=bar",
  source: "Netlify",
  cdt: "2024-01-01 00:00:00",
  ua: "AgentX",
}

test.describe("buildMatomoRequestPayload", () => {
  test("builds query string payload", () => {
    const qs = buildMatomoRequestPayload(basePayload)

    expect(qs).toContain("idsite=1")
    expect(qs).toContain("rec=1")
    expect(qs).toContain("recMode=1")
    expect(qs).toContain("source=Netlify")
    expect(qs).toContain("url=https%3A%2F%2Fexample.com%2Fpath%3Ffoo%3Dbar")
    expect(qs).toContain("ua=AgentX")
    expect(qs.startsWith("?")).toBe(true)
  })
})

test.describe("sendMatomoHit", () => {
  const expectedQuery =
    "idsite=1&rec=1&recMode=1&url=https%3A%2F%2Fexample.com%2Fpath%3Ffoo%3Dbar&source=Netlify&cdt=2024-01-01+00%3A00%3A00&ua=AgentX"

  const cases: [name: string, baseUrl: string, expected: string][] = [
    [
      "root url",
      "https://analytics.example.com",
      `https://analytics.example.com/matomo.php?${expectedQuery}`,
    ],
    [
      "subdirectory url",
      "https://analytics.example.com/matomo",
      `https://analytics.example.com/matomo/matomo.php?${expectedQuery}`,
    ],
    [
      "subdirectory url with slash",
      "https://analytics.example.com/matomo/",
      `https://analytics.example.com/matomo/matomo.php?${expectedQuery}`,
    ],
    [
      "matomo.php url",
      "https://analytics.example.com/matomo.php",
      `https://analytics.example.com/matomo.php?${expectedQuery}`,
    ],
  ]

  for (const [name, baseUrl, expected] of cases) {
    test(`sends a single hit via tracking API (${name})`, async () => {
      const spies = createConsoleSpies()
      const calls: FetchArgs[] = []
      const fetchMock = (input: RequestInfo | URL, init?: RequestInit) => {
        calls.push([input, init])
        return Promise.resolve(new Response(null, { status: 204 }))
      }

      try {
        await sendMatomoHit(baseUrl, basePayload, 1000, "debug", fetchMock)

        expect(calls).toHaveLength(1)
        const [url, options] = calls[0]
        expect(url).toBe(expected)
        expect(options?.method).toBe("GET")
        expect(spies.calls.debug).toContainEqual([
          "Matomo response",
          { status: 204 },
        ])
      } finally {
        spies.restore()
      }
    })
  }

  test("throws on non-ok response", async () => {
    const spies = createConsoleSpies()
    const fetchMock = () =>
      Promise.resolve(new Response("bad", { status: 500 }))

    try {
      await expect(
        sendMatomoHit(
          "https://analytics.example.com",
          basePayload,
          1000,
          "info",
          fetchMock
        )
      ).rejects.toThrow(/Matomo responded with status 500/)
    } finally {
      spies.restore()
    }
  })

  test("aborts when timeout elapses", async () => {
    const spies = createConsoleSpies()
    const fetchMock = () => Promise.reject(new Error("aborted"))

    try {
      await expect(
        sendMatomoHit(
          "https://analytics.example.com",
          basePayload,
          10,
          "info",
          fetchMock
        )
      ).rejects.toThrow(/aborted/)
      expect(spies.calls.error).toContainEqual([
        "Matomo send failed",
        { error: "aborted" },
      ])
    } finally {
      spies.restore()
    }
  })
})
