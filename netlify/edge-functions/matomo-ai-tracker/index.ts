import { getConfig } from "./config"
import { sendMatomoHit } from "./http"
import { createLogger } from "./logger"
import { buildMatomoPayload } from "./matomo"
import type { MatomoConfig } from "./types"

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
  context: {
    env: Record<string, string | undefined>
  }
) {
  let config: MatomoConfig | null = null

  try {
    config = getConfig(context.env)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    console.error("Configuration error", {
      error: message,
    })

    return fetch(request)
  }

  const log = createLogger(config.logLevel)

  const start = Date.now()

  try {
    const response = await fetch(request)

    const durationMs = Date.now() - start

    // Fire-and-forget tracking
    void trackRequest(request, response, durationMs, config)

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

    void trackRequest(request, fallback, durationMs, config)

    return fallback
  }
}
