import { toNextJsHandler } from "better-auth/next-js"

import { getAuth } from "@/lib/auth/server"
import { hasLearnerDb } from "@/lib/db"

/**
 * The site's `trailingSlash: true` sends `/api/auth/x` here as `/api/auth/x/`,
 * which Better Auth's router doesn't match, so the slash comes off first.
 */
const withoutTrailingSlash = async (request: Request) => {
  const url = new URL(request.url)
  if (!url.pathname.endsWith("/")) return request
  url.pathname = url.pathname.replace(/\/+$/, "")
  const hasBody = request.method !== "GET" && request.method !== "HEAD"
  return new Request(url, {
    method: request.method,
    headers: request.headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
  })
}

const handle = async (request: Request) => {
  if (!hasLearnerDb) return new Response(null, { status: 404 })
  const { GET, POST } = toNextJsHandler(getAuth())
  const normalized = await withoutTrailingSlash(request)
  return request.method === "GET" ? GET(normalized) : POST(normalized)
}

export const GET = handle
export const POST = handle
