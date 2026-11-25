// Ported from matomo-org/tracker-cloudflare tests/index.test.ts, adapted to
// the Netlify handler shape (Netlify.env global, context.next/waitUntil).
// Module spies are unavailable here, so tracking is asserted at the fetch
// boundary (sendMatomoHit's request to matomo.php) instead of vi.spyOn.

import { expect, test } from "@playwright/test"

import handler from "../../../netlify/edge-functions/matomo-ai-tracker/index"
import type { NetlifyEdgeContext } from "../../../netlify/edge-functions/matomo-ai-tracker/types"

import {
  type ConsoleSpies,
  createConsoleSpies,
  type FetchStub,
  stubGlobalFetch,
} from "./helpers"

const env = {
  MATOMO_AI_TRACKER_ENABLED: "true",
  MATOMO_URL: "https://analytics.example.com",
  MATOMO_SITE_ID: "7",
  USER_AGENT_ALLOWLIST_REGEX: ".*",
}

const setNetlifyEnv = (values: Record<string, string | undefined>) => {
  ;(globalThis as { Netlify?: unknown }).Netlify = {
    env: { toObject: () => values },
  }
}

const createContext = (next: () => Promise<Response>) => {
  const tracked: Promise<unknown>[] = []
  const context: NetlifyEdgeContext = {
    next,
    waitUntil: (promise) => {
      tracked.push(promise)
    },
  }
  return { context, tracked }
}

test.describe("Edge function handler", () => {
  let consoleSpies: ConsoleSpies
  let fetchStub: FetchStub | undefined

  test.beforeEach(() => {
    consoleSpies = createConsoleSpies()
  })

  test.afterEach(() => {
    consoleSpies.restore()
    fetchStub?.restore()
    fetchStub = undefined
    delete (globalThis as { Netlify?: unknown }).Netlify
  })

  test("proxies origin and schedules async tracking", async () => {
    setNetlifyEnv(env)
    fetchStub = stubGlobalFetch(() =>
      Promise.resolve(new Response(null, { status: 204 }))
    )
    const { context, tracked } = createContext(() =>
      Promise.resolve(
        new Response("origin", {
          status: 200,
          headers: { "content-length": "6" },
        })
      )
    )

    const response = await handler(
      new Request("https://example.com/path", {
        headers: { "user-agent": "AgentX" },
      }),
      context
    )

    expect(response.status).toBe(200)
    expect(tracked).toHaveLength(1)
    await tracked[0]
    expect(fetchStub.calls).toHaveLength(1)
    const [url] = fetchStub.calls[0]
    expect(String(url)).toContain(
      "https://analytics.example.com/matomo.php?idsite=7"
    )
  })

  test("rethrows when origin fails (platform bypass) but still tracks", async () => {
    setNetlifyEnv(env)
    fetchStub = stubGlobalFetch(() =>
      Promise.resolve(new Response(null, { status: 204 }))
    )
    const { context, tracked } = createContext(() =>
      Promise.reject(new Error("boom"))
    )

    await expect(
      handler(
        new Request("https://example.com/path", {
          headers: { "user-agent": "AgentX" },
        }),
        context
      )
    ).rejects.toThrow("boom")

    expect(tracked).toHaveLength(1)
    await tracked[0]
    expect(fetchStub.calls).toHaveLength(1)
    expect(String(fetchStub.calls[0][0])).toContain("http_status=502")
    expect(consoleSpies.calls.error).toContainEqual([
      "Origin request failed",
      { error: "boom" },
    ])
  })

  test("skips tracking when user agent not allowed", async () => {
    setNetlifyEnv({ ...env, USER_AGENT_ALLOWLIST_REGEX: "AllowedUA" })
    fetchStub = stubGlobalFetch(() =>
      Promise.resolve(new Response(null, { status: 204 }))
    )
    const { context, tracked } = createContext(() =>
      Promise.resolve(new Response("origin", { status: 200 }))
    )

    const response = await handler(
      new Request("https://example.com/path", {
        headers: { "user-agent": "OtherUA" },
      }),
      context
    )

    expect(response.status).toBe(200)
    expect(tracked).toHaveLength(1)
    await tracked[0]
    expect(fetchStub.calls).toHaveLength(0)
  })

  test("logs warning when tracking fails", async () => {
    setNetlifyEnv(env)
    fetchStub = stubGlobalFetch(() => Promise.reject(new Error("track fail")))
    const { context, tracked } = createContext(() =>
      Promise.resolve(new Response("origin", { status: 200 }))
    )

    const response = await handler(
      new Request("https://example.com/path", {
        headers: { "user-agent": "AgentX" },
      }),
      context
    )

    expect(response.status).toBe(200)
    expect(tracked).toHaveLength(1)
    await tracked[0]
    expect(consoleSpies.calls.warn).toContainEqual([
      "Tracking failed",
      { error: "track fail" },
    ])
  })

  for (const disabledEnv of [
    { ...env, MATOMO_AI_TRACKER_ENABLED: undefined },
    { ...env, MATOMO_AI_TRACKER_ENABLED: "false" },
  ]) {
    test(`passes through silently when kill switch is ${disabledEnv.MATOMO_AI_TRACKER_ENABLED ?? "unset"}`, async () => {
      setNetlifyEnv(disabledEnv)
      fetchStub = stubGlobalFetch(() =>
        Promise.resolve(new Response(null, { status: 204 }))
      )
      const { context, tracked } = createContext(() =>
        Promise.resolve(new Response("origin", { status: 200 }))
      )

      const response = await handler(
        new Request("https://example.com/path", {
          headers: { "user-agent": "AgentX" },
        }),
        context
      )

      expect(response.status).toBe(200)
      expect(tracked).toHaveLength(0)
      expect(fetchStub.calls).toHaveLength(0)
      expect(consoleSpies.calls.error).toHaveLength(0)
      expect(consoleSpies.calls.warn).toHaveLength(0)
    })
  }

  test("returns origin response when config is invalid and skips tracking", async () => {
    setNetlifyEnv({ MATOMO_AI_TRACKER_ENABLED: "true", MATOMO_SITE_ID: "7" })
    fetchStub = stubGlobalFetch(() =>
      Promise.resolve(new Response(null, { status: 204 }))
    )
    const { context, tracked } = createContext(() =>
      Promise.resolve(new Response("origin", { status: 200 }))
    )

    const response = await handler(
      new Request("https://example.com/path"),
      context
    )

    expect(response.status).toBe(200)
    expect(tracked).toHaveLength(0)
    expect(fetchStub.calls).toHaveLength(0)
    expect(consoleSpies.calls.error).toContainEqual([
      "Configuration error",
      {
        error: "MATOMO_URL is required (MATOMO_URL or NEXT_PUBLIC_MATOMO_URL)",
      },
    ])
  })
})
