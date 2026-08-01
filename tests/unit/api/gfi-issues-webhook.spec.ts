import { createHmac } from "node:crypto"
import { expect, test } from "@playwright/test"

import { POST } from "../../../app/api/gfi-issues-webhook/route"
import {
  MAX_GITHUB_WEBHOOK_BODY_BYTES,
  verifyGitHubWebhookSignature,
} from "../../../app/api/gfi-issues-webhook/security"

const WEBHOOK_URL = "https://example.com/api/gfi-issues-webhook"
const SECRET = "test-webhook-secret"

const originalFetch = globalThis.fetch
const originalWebhookSecret = process.env.GITHUB_WEBHOOK_SECRET
const originalDiscordId = process.env.DISCORD_ID
const originalDiscordToken = process.env.DISCORD_TOKEN

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
  } else {
    process.env[name] = value
  }
}

function sign(body: string, secret = SECRET) {
  return `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`
}

function webhookRequest(body: string, signature?: string) {
  const headers = new Headers({ "content-type": "application/json" })
  if (signature) headers.set("x-hub-signature-256", signature)

  return new Request(WEBHOOK_URL, { method: "POST", headers, body })
}

function issuePayload(overrides: Record<string, unknown> = {}) {
  return {
    action: "labeled",
    label: { name: "good first issue" },
    issue: {
      assignee: null,
      title: "Help improve ethereum.org",
      html_url: "https://github.com/ethereum/ethereum-org-website/issues/1",
      created_at: "2026-08-01T00:00:00Z",
      labels: [{ name: "good first issue" }, { name: "content" }],
      user: null,
    },
    ...overrides,
  }
}

test.beforeEach(() => {
  process.env.GITHUB_WEBHOOK_SECRET = SECRET
  process.env.DISCORD_ID = "discord-id"
  process.env.DISCORD_TOKEN = "discord-token"
})

test.afterEach(() => {
  globalThis.fetch = originalFetch
  restoreEnv("GITHUB_WEBHOOK_SECRET", originalWebhookSecret)
  restoreEnv("DISCORD_ID", originalDiscordId)
  restoreEnv("DISCORD_TOKEN", originalDiscordToken)
})

test("matches GitHub's documented HMAC-SHA256 test vector", () => {
  const body = new TextEncoder().encode("Hello, World!")
  const signature =
    "sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17"

  expect(
    verifyGitHubWebhookSignature(body, signature, "It's a Secret to Everybody")
  ).toBe(true)
})

test("rejects a missing signature before processing the payload", async () => {
  globalThis.fetch = async () => {
    throw new Error("Discord must not be called")
  }

  const body = JSON.stringify(issuePayload())
  const response = await POST(webhookRequest(body))

  expect(response.status).toBe(401)
})

test("rejects an incorrect signature before processing the payload", async () => {
  globalThis.fetch = async () => {
    throw new Error("Discord must not be called")
  }

  const body = JSON.stringify(issuePayload())
  const response = await POST(webhookRequest(body, sign(body, "wrong-secret")))

  expect(response.status).toBe(401)
})

test("accepts a valid signed ping without triggering unrelated work", async () => {
  globalThis.fetch = async () => {
    throw new Error("Discord must not be called")
  }

  const body = JSON.stringify({ zen: "Keep it logically awesome." })
  const response = await POST(webhookRequest(body, sign(body)))

  expect(response.status).toBe(200)
  await expect(response.json()).resolves.toEqual({
    message: "Not a label action",
  })
})

test("processes a valid signed good-first-issue event", async () => {
  const requests: Array<{ url: string; init?: RequestInit }> = []
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    requests.push({ url: String(url), init })
    return new Response(null, { status: 204 })
  }) as typeof fetch

  const body = JSON.stringify(issuePayload())
  const response = await POST(webhookRequest(body, sign(body)))

  expect(response.status).toBe(200)
  expect(requests).toHaveLength(1)
  expect(requests[0].url).toBe(
    "https://discord.com/api/webhooks/discord-id/discord-token"
  )
  expect(requests[0].init?.method).toBe("post")
})

test("rejects a signed body over the streaming size limit", async () => {
  globalThis.fetch = async () => {
    throw new Error("Discord must not be called")
  }

  const body = "x".repeat(MAX_GITHUB_WEBHOOK_BODY_BYTES + 1)
  const response = await POST(webhookRequest(body, sign(body)))

  expect(response.status).toBe(413)
})

test("rejects malformed JSON even when its signature is valid", async () => {
  const body = "not-json"
  const response = await POST(webhookRequest(body, sign(body)))

  expect(response.status).toBe(400)
})

test("fails closed when the webhook secret is not configured", async () => {
  delete process.env.GITHUB_WEBHOOK_SECRET
  const body = JSON.stringify(issuePayload())
  const response = await POST(webhookRequest(body, sign(body)))

  expect(response.status).toBe(500)
})
