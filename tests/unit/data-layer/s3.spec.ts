/**
 * Playwright Test suite for the data-layer S3 upload helpers.
 *
 * Covers the two properties that a stale `fetch-developer-tools` blob traced
 * back to: uploads must not re-download an image the bucket already holds, and
 * batch helpers must bound how many run at once. Unbounded fan-out shares one
 * `AbortSignal.timeout` deadline across every call, so queued requests abort
 * before they are ever dispatched.
 *
 * The S3 endpoint is a local stub. The AWS SDK speaks node:http, so stubbing
 * `globalThis.fetch` isolates the source-image side without touching it.
 */

import { createHash } from "crypto"
import http from "http"

import { expect, test } from "@playwright/test"

import { mapWithConcurrency, uploadToS3 } from "@/data-layer/s3"

const BUCKET = "test-bucket"

type Stub = {
  port: number
  existing: Set<string>
  calls: string[]
  close: () => Promise<void>
}

async function startS3Stub(): Promise<Stub> {
  const existing = new Set<string>()
  const calls: string[] = []

  const server = http.createServer((req, res) => {
    // The SDK appends `?x-id=PutObject`, which is not part of the key
    const key = decodeURIComponent(
      (req.url || "").split("?")[0].replace(`/${BUCKET}/`, "")
    )
    calls.push(`${req.method} ${key}`)

    if (req.method === "HEAD") {
      res.writeHead(existing.has(key) ? 200 : 404).end()
      return
    }
    if (req.method === "PUT") {
      req.on("data", () => {})
      req.on("end", () => {
        existing.add(key)
        res.writeHead(200).end()
      })
      return
    }
    res.writeHead(400).end()
  })

  await new Promise<void>((resolve) => server.listen(0, resolve))
  const { port } = server.address() as { port: number }

  return {
    port,
    existing,
    calls,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  }
}

const s3Key = (prefix: string, url: string, ext: string) =>
  `${prefix}/${createHash("sha256").update(url).digest("hex").slice(0, 16)}.${ext}`

test.describe("data-layer S3 helpers", () => {
  let stub: Stub
  let sourceFetches: string[]
  const servedTypes = new Map<string, string>()

  test.beforeAll(async () => {
    stub = await startS3Stub()
    process.env.S3_ENDPOINT = `http://127.0.0.1:${stub.port}`
    process.env.S3_ACCESS_KEY_ID = "test"
    process.env.S3_SECRET_ACCESS_KEY = "test"
    process.env.S3_IMAGE_BUCKET = BUCKET

    // The module reads every S3 env var lazily, on first upload, so setting
    // them here is enough despite the static import above.
    sourceFetches = []
    globalThis.fetch = (async (
      input: string | URL | Request,
      init?: RequestInit
    ) => {
      const url = typeof input === "string" ? input : input.toString()
      const method = init?.method ?? "GET"
      sourceFetches.push(`${method} ${url}`)
      // A url can declare a type the host does not actually serve
      const contentType = servedTypes.get(url) ?? "image/png"
      return new Response(
        method === "HEAD" ? null : new Uint8Array([1, 2, 3, 4]),
        {
          status: 200,
          headers: { "content-type": contentType },
        }
      )
    }) as typeof fetch
  })

  test.afterAll(async () => {
    await stub.close()
  })

  test.beforeEach(() => {
    stub.calls.length = 0
    sourceFetches.length = 0
    servedTypes.clear()
  })

  test("returns the S3 url without downloading an image the bucket holds", async () => {
    const url = "https://example.com/already-there.png"
    const key = s3Key("tools/thumbnails", url, "png")
    stub.existing.add(key)

    const result = await uploadToS3(url, "tools/thumbnails")

    expect(result).toBe(`http://127.0.0.1:${stub.port}/${BUCKET}/${key}`)
    expect(stub.calls).toEqual([`HEAD ${key}`])
    expect(sourceFetches).toHaveLength(0)
  })

  test("uploads on a miss without issuing a duplicate HEAD", async () => {
    const url = "https://example.com/fresh.png"
    const key = s3Key("tools/banners", url, "png")
    stub.existing.delete(key)

    const result = await uploadToS3(url, "tools/banners")

    expect(result).toBe(`http://127.0.0.1:${stub.port}/${BUCKET}/${key}`)
    expect(stub.calls).toEqual([`HEAD ${key}`, `PUT ${key}`])
    // HEAD settles the served type, GET pulls the body exactly once
    expect(sourceFetches).toEqual([`HEAD ${url}`, `GET ${url}`])
  })

  test("a repeat run costs one HEAD and no download", async () => {
    const url = "https://example.com/repeat.png"
    const key = s3Key("tools/banners", url, "png")

    await uploadToS3(url, "tools/banners")
    stub.calls.length = 0
    sourceFetches.length = 0

    await uploadToS3(url, "tools/banners")

    expect(stub.calls).toEqual([`HEAD ${key}`])
    expect(sourceFetches).toHaveLength(0)
  })

  test("falls back to the Content-Type when the url carries no extension", async () => {
    const url = "https://avatars.example.com/u/12345?v=4"
    const key = s3Key("tools/thumbnails", url, "png")
    stub.existing.delete(key)

    const result = await uploadToS3(url, "tools/thumbnails")

    // No url extension, so the type comes from the source HEAD
    expect(sourceFetches).toEqual([`HEAD ${url}`, `GET ${url}`])
    expect(stub.calls).toEqual([`HEAD ${key}`, `PUT ${key}`])
    expect(result).toContain(key)
  })

  test("resolves a url whose extension lies about the served type", async () => {
    // `github.com/<org>.png` serves whatever the org uploaded
    const url = "https://github.com/some-org.png"
    servedTypes.set(url, "image/jpeg")
    const jpgKey = s3Key("tools/thumbnails", url, "jpg")
    stub.existing.add(jpgKey)

    const result = await uploadToS3(url, "tools/thumbnails")

    expect(result).toContain(jpgKey)
    // The body is never pulled: the source HEAD is enough to find the real key
    expect(sourceFetches).toEqual([`HEAD ${url}`])
    expect(stub.calls).toEqual([
      `HEAD ${s3Key("tools/thumbnails", url, "png")}`,
      `HEAD ${jpgKey}`,
    ])
  })

  test("never probes the same S3 key twice on a mismatched miss", async () => {
    const url = "https://github.com/absent-org.png"
    servedTypes.set(url, "image/jpeg")
    const pngKey = s3Key("tools/banners", url, "png")
    const jpgKey = s3Key("tools/banners", url, "jpg")

    await uploadToS3(url, "tools/banners")

    expect(stub.calls).toEqual([
      `HEAD ${pngKey}`,
      `HEAD ${jpgKey}`,
      `PUT ${jpgKey}`,
    ])
  })

  test("mapWithConcurrency preserves input order", async () => {
    const result = await mapWithConcurrency(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      async (n) => {
        // Reverse the natural completion order to catch accidental sorting
        await new Promise((resolve) => setTimeout(resolve, (10 - n) * 2))
        return n * 2
      },
      4
    )

    expect(result).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20])
  })

  test("mapWithConcurrency never exceeds the requested concurrency", async () => {
    let inFlight = 0
    let peak = 0

    await mapWithConcurrency(
      Array.from({ length: 50 }, (_, i) => i),
      async () => {
        inFlight++
        peak = Math.max(peak, inFlight)
        await new Promise((resolve) => setTimeout(resolve, 5))
        inFlight--
      },
      6
    )

    expect(peak).toBeLessThanOrEqual(6)
    expect(peak).toBeGreaterThan(1)
  })
})
