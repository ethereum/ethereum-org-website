import { getConfig } from "./config.ts"
import { sendMatomoHit } from "./http.ts"
import { createLogger } from "./logger.ts"
import { buildMatomoPayload } from "./matomo.ts"
import type { MatomoConfig, NetlifyEdgeContext } from "./types.ts"

declare const Netlify: {
  env: {
    toObject: () => Record<string, string | undefined>
  }
}

const trackRequest = async (
  request: Request,
  response: Response,
  durationMs: number,
  config: MatomoConfig
) => {
  const log = createLogger(config.logLevel)

  try {
    const payload = buildMatomoPayload(
      request,
      response,
      durationMs,
      config,
      new Date(Date.now() - durationMs)
    )

    if (!payload) {
      log.debug("Tracking skipped")
      return
    }

    await sendMatomoHit(
      config.matomoUrl,
      payload,
      config.matomoTimeoutMs,
      config.logLevel
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    log.warn("Tracking failed", {
      error: message,
    })
  }
}

export default async function handler(
  request: Request,
  context: NetlifyEdgeContext
) {
  let config: MatomoConfig | null = null

  try {
    config = getConfig(Netlify.env.toObject())
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    console.error("Configuration error", {
      error: message,
    })

    return context.next()
  }

  const log = createLogger(config.logLevel)

  const start = Date.now()

  try {
    const response = await context.next()

    const durationMs = Date.now() - start

    context.waitUntil(trackRequest(request, response, durationMs, config))

    return response
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    log.error("Origin request failed", {
      error: message,
    })

    const fallback = new Response("Bad Gateway", {
      status: 502,
    })

    const durationMs = Date.now() - start

    context.waitUntil(trackRequest(request, fallback, durationMs, config))

    return fallback
  }
}
