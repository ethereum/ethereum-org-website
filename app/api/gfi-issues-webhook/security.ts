import { createHmac, timingSafeEqual } from "node:crypto"

export const MAX_GITHUB_WEBHOOK_BODY_BYTES = 1024 * 1024

export class WebhookBodyTooLargeError extends Error {
  constructor() {
    super("GitHub webhook body exceeds the configured limit")
    this.name = "WebhookBodyTooLargeError"
  }
}

export async function readWebhookBody(
  request: Request,
  maxBytes = MAX_GITHUB_WEBHOOK_BODY_BYTES
): Promise<Uint8Array> {
  const contentLength = request.headers.get("content-length")
  if (/^\d+$/.test(contentLength ?? "") && Number(contentLength) > maxBytes) {
    throw new WebhookBodyTooLargeError()
  }

  if (!request.body) return new Uint8Array()

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  try {
    let chunk = await reader.read()
    while (!chunk.done) {
      const { value } = chunk
      totalBytes += value.byteLength
      if (totalBytes > maxBytes) {
        await reader.cancel()
        throw new WebhookBodyTooLargeError()
      }
      chunks.push(value)
      chunk = await reader.read()
    }
  } finally {
    reader.releaseLock()
  }

  const body = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    body.set(chunk, offset)
    offset += chunk.byteLength
  }
  return body
}

export function verifyGitHubWebhookSignature(
  body: Uint8Array,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !/^sha256=[0-9a-f]{64}$/.test(signature)) return false

  const suppliedDigest = Buffer.from(signature.slice("sha256=".length), "hex")
  const expectedDigest = createHmac("sha256", secret).update(body).digest()

  return (
    suppliedDigest.length === expectedDigest.length &&
    timingSafeEqual(suppliedDigest, expectedDigest)
  )
}
