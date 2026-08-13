/**
 * OpenRouter transport for the translation pipeline.
 *
 * Why route through OpenRouter at all: an OpenRouter key carries a
 * server-side credit limit (optionally resetting daily) and rejects with 402
 * once it is exhausted, and credits are prepaid -- a ceiling that holds even
 * when our own guards are wrong. The Gemini API has no USD cap of any kind;
 * its only brake is a rolling 10-minute spend-rate limit that run 31149083965
 * never came close to tripping. Inference is passed through at list price;
 * the cost is 5.5% on credit purchases.
 *
 * Responses are shaped like the Gemini SDK's so the shared retry, validation,
 * and guard path in gemini.ts stays provider-agnostic.
 */

import { INPUT_RATE_USD_PER_1M, OUTPUT_RATE_USD_PER_1M } from "../../constants"

const OPENROUTER_BASE = "https://openrouter.ai/api/v1"

/** The subset of the Gemini response shape the pipeline reads. */
export interface ProviderResponse {
  text: string
  usageMetadata?: {
    promptTokenCount?: number
    candidatesTokenCount?: number
  }
  candidates?: Array<{
    finishReason?: string
    safetyRatings?: Array<{ category?: string; probability?: string }>
  }>
  /** Provider-reported spend for this call, when available. */
  costUsd?: number
}

interface OpenRouterCompletion {
  choices?: Array<{
    message?: { content?: string }
    finish_reason?: string
    error?: { message?: string }
  }>
  usage?: {
    prompt_tokens?: number
    completion_tokens?: number
    cost?: number
  }
  error?: { message?: string; code?: number }
}

function apiKey(): string {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) throw new Error("Missing OPENROUTER_API_KEY")
  return key
}

/**
 * Key budget as OpenRouter sees it. Read at startup so a run announces the
 * ceiling it is operating under -- and warns when the key has none.
 */
export async function openRouterKeyStatus(): Promise<{
  limit: number | null
  limitRemaining: number | null
  /** e.g. "daily" when the limit resets at midnight UTC; null when it never does */
  limitReset: string | null
  usage: number
}> {
  const res = await fetch(`${OPENROUTER_BASE}/key`, {
    headers: { Authorization: `Bearer ${apiKey()}` },
  })
  if (!res.ok) {
    throw new Error(`OpenRouter key lookup failed: ${res.status}`)
  }
  const body = (await res.json()) as {
    data?: {
      limit?: number | null
      limit_remaining?: number | null
      limit_reset?: string | null
      usage?: number
    }
  }
  return {
    limit: body.data?.limit ?? null,
    limitRemaining: body.data?.limit_remaining ?? null,
    limitReset: body.data?.limit_reset ?? null,
    usage: body.data?.usage ?? 0,
  }
}

/**
 * One completion via OpenRouter. `max_price` refuses the request outright if no
 * provider serves the model at or under our expected rate, so a provider-side
 * price change cannot quietly multiply the bill.
 */
export async function generateViaOpenRouter(options: {
  modelId: string
  prompt: string
  temperature: number
  signal: AbortSignal
}): Promise<ProviderResponse> {
  const { modelId, prompt, temperature, signal } = options

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      "X-Title": "ethereum.org intl-pipeline",
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: "user", content: prompt }],
      temperature,
      usage: { include: true },
      provider: {
        max_price: {
          prompt: INPUT_RATE_USD_PER_1M,
          completion: OUTPUT_RATE_USD_PER_1M,
        },
      },
    }),
  })

  if (res.status === 402) {
    throw new Error(
      `OpenRouter 402: key credit limit exhausted (${await res.text()})`
    )
  }
  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${await res.text()}`)
  }

  const body = (await res.json()) as OpenRouterCompletion
  if (body.error) {
    throw new Error(`OpenRouter error: ${body.error.message ?? "unknown"}`)
  }

  const choice = body.choices?.[0]
  return {
    text: choice?.message?.content ?? "",
    usageMetadata: {
      promptTokenCount: body.usage?.prompt_tokens ?? 0,
      candidatesTokenCount: body.usage?.completion_tokens ?? 0,
    },
    // finish_reason maps onto the Gemini vocabulary the caller already handles:
    // "stop" is success, anything else is surfaced as a non-STOP finish.
    candidates: [
      {
        finishReason:
          choice?.finish_reason === "stop"
            ? "STOP"
            : (choice?.finish_reason ?? "UNKNOWN").toUpperCase(),
      },
    ],
    costUsd: body.usage?.cost,
  }
}
