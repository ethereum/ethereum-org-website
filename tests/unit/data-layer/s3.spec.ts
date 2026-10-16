import { createHash } from "crypto"
import http from "http"

import { expect, test } from "@playwright/test"

import { uploadToS3 } from "@/data-layer/s3"

const BUCKET = "test-bucket"
const S3_ENV_KEYS = [
  "S3_ENDPOINT",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_IMAGE_BUCKET",
] as const

test("returns the S3 url without downloading an image the bucket holds", async () => {
  const url = "https://example.com/already-there.png"
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 16)
  const key = `tools/thumbnails/${hash}.png`

  const s3Calls: string[] = []
  // The AWS SDK speaks node:http, so S3 needs a real local endpoint
  const server = http.createServer((req, res) => {
    s3Calls.push(`${req.method} ${req.url}`)
    res.writeHead(req.url === `/${BUCKET}/${key}` ? 200 : 404).end()
  })
  await new Promise<void>((resolve) => server.listen(0, resolve))
  const { port } = server.address() as { port: number }

  const originalEnv = S3_ENV_KEYS.map((k) => [k, process.env[k]] as const)
  const originalFetch = globalThis.fetch
  const sourceFetches: string[] = []
  process.env.S3_ENDPOINT = `http://127.0.0.1:${port}`
  process.env.S3_ACCESS_KEY_ID = "test"
  process.env.S3_SECRET_ACCESS_KEY = "test"
  process.env.S3_IMAGE_BUCKET = BUCKET
  globalThis.fetch = (async (input: string | URL | Request) => {
    sourceFetches.push(String(input))
    return new Response(null, { status: 500 })
  }) as typeof fetch

  try {
    const result = await uploadToS3(url, "tools/thumbnails")

    expect(result).toBe(`http://127.0.0.1:${port}/${BUCKET}/${key}`)
    expect(s3Calls).toEqual([`HEAD /${BUCKET}/${key}`])
    expect(sourceFetches).toHaveLength(0)
  } finally {
    globalThis.fetch = originalFetch
    for (const [k, v] of originalEnv) {
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
    }
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
})
