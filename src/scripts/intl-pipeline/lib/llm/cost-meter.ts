/**
 * Spend bounds for LLM work: a per-file+locale byte budget (the primary bound)
 * and a whole-run fuse.
 *
 * Run 31149083965 spent $1,108 because nothing bounded the work per unit: 488
 * changed sections in one 135KB file each became a full-context call, 62MB of
 * prompt per locale. A run's total legitimately scales with how many files and
 * locales are in scope, so the bound is per file+locale and derived from the
 * amount of content being translated; the run total is only a fuse.
 *
 * Module state on purpose -- one pipeline process is one run.
 */

import {
  INPUT_RATE_USD_PER_1M,
  MAX_CHUNK_BYTES,
  MAX_PROMPT_BYTES,
  OUTPUT_RATE_USD_PER_1M,
  RUN_FUSE_USD,
} from "../../constants"

let inputTokens = 0
let outputTokens = 0
let reasoningTokens = 0
let providerCostUsd = 0
/** Worst-case cost held for calls that have been sent but have not resolved */
let reservedUsd = 0
let calls = 0
let fuseUsd = RUN_FUSE_USD

/** Thrown when the whole-run fuse blows; not retryable. */
export class RunFuseExceededError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "RunFuseExceededError"
  }
}

/** Thrown when one file+locale exceeds its prompt-byte budget. */
export class FileBudgetExceededError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "FileBudgetExceededError"
  }
}

/**
 * Record a billed call. `costUsd` is the provider's own figure when it reports
 * one (OpenRouter does); otherwise the cost is estimated from the token rates.
 */
export function recordUsage(
  input: number,
  output: number,
  costUsd?: number,
  reasoning?: number
): void {
  inputTokens += input
  outputTokens += output
  reasoningTokens += reasoning ?? 0
  providerCostUsd +=
    costUsd ??
    (input / 1_000_000) * INPUT_RATE_USD_PER_1M +
      (output / 1_000_000) * OUTPUT_RATE_USD_PER_1M
  calls += 1
}

export function estimatedCostUsd(): number {
  return providerCostUsd
}

export function usageTotals(): {
  calls: number
  inputTokens: number
  outputTokens: number
  reasoningTokens: number
  costUsd: number
} {
  return {
    calls,
    inputTokens,
    outputTokens,
    reasoningTokens,
    costUsd: providerCostUsd,
  }
}

export function runFuseUsd(): number {
  return fuseUsd
}

/**
 * Worst-case cost of one in-flight call, used to reserve against the fuse while
 * a request is outstanding: a full prompt at MAX_PROMPT_BYTES plus an output of
 * the same order. Deliberately pessimistic -- reserving too little is what lets
 * the fuse overshoot, reserving too much only trips it marginally early.
 */
const WORST_CASE_CALL_USD =
  (MAX_PROMPT_BYTES / 3 / 1_000_000) * INPUT_RATE_USD_PER_1M +
  (MAX_PROMPT_BYTES / 3 / 1_000_000) * OUTPUT_RATE_USD_PER_1M

/**
 * Reserve worst-case cost for a call that is about to be sent, throwing if the
 * fuse cannot cover it. Spend is only recorded once a call resolves, and the
 * pipeline runs up to GEMINI_CONCURRENCY calls at once, so checking recorded
 * spend alone lets every in-flight call clear a fuse that one of them will
 * blow. Reservations close that window.
 *
 * Returns a settle function: call it with the actual cost once the request
 * resolves (or with 0 if it never billed) to release the reservation.
 */
export function reserveForCall(context: string): (actualUsd: number) => void {
  assertRunFuse(context)
  reservedUsd += WORST_CASE_CALL_USD
  let settled = false
  return () => {
    if (settled) return
    settled = true
    reservedUsd = Math.max(0, reservedUsd - WORST_CASE_CALL_USD)
  }
}

/**
 * Throw if committed spend plus outstanding reservations have reached the fuse.
 * Called before each request, so the guard trips one call late at worst.
 */
export function assertRunFuse(context: string): void {
  const committed = providerCostUsd + reservedUsd
  if (committed < fuseUsd) return

  throw new RunFuseExceededError(
    `[cost-guard] aborting run: $${providerCostUsd.toFixed(2)} spent across ` +
      `${calls} call(s)` +
      (reservedUsd > 0
        ? ` plus $${reservedUsd.toFixed(2)} reserved for calls in flight`
        : "") +
      ` reached the $${fuseUsd.toFixed(2)} fuse. Blocked: ${context}. ` +
      `Raise INTL_MAX_COST_USD only after confirming the call pattern is sane.`
  )
}

export interface FileBudget {
  /** Refuse a planned call sequence before any of it is sent. */
  assertProjected(bytes: number, detail: string): void
  /** Account for bytes actually sent; throws when the budget is exhausted. */
  spend(bytes: number, detail: string): void
  limitBytes: number
  spentBytes: number
}

/**
 * Budget for one file+locale, derived from the work itself: the number of
 * chunks the translatable content genuinely needs, times the most a single
 * call may cost. Independent of the file's total size, so a two-word change in
 * a 200KB file gets one chunk's budget rather than a proportional one.
 *
 * `translatableBytes` is wire bytes (content plus <SECTION> envelope) so the
 * budget and the batcher measure the same thing.
 *
 * Only planned prompt bytes are charged here. Retries re-send the same prompt
 * and are already bounded per call; charging them would fail a legitimate file
 * because one call was flaky.
 */
export function createFileBudget(
  label: string,
  translatableBytes: number
): FileBudget {
  const chunks = Math.max(1, Math.ceil(translatableBytes / MAX_CHUNK_BYTES))
  const limitBytes = chunks * MAX_PROMPT_BYTES
  let spentBytes = 0

  const fail = (attempted: number, detail: string) => {
    throw new FileBudgetExceededError(
      `[cost-guard] ${label}: ${detail} needs ${attempted.toLocaleString("en-US")} prompt bytes, ` +
        `over the ${limitBytes.toLocaleString("en-US")}-byte budget ` +
        `(${chunks} chunk(s) of translatable content x ${MAX_PROMPT_BYTES.toLocaleString("en-US")} bytes per call). ` +
        `Skipping this file; rerun it alone with MODE=full if the change is genuinely large.`
    )
  }

  return {
    limitBytes,
    get spentBytes() {
      return spentBytes
    },
    assertProjected(bytes: number, detail: string) {
      if (spentBytes + bytes > limitBytes) fail(spentBytes + bytes, detail)
    },
    spend(bytes: number, detail: string) {
      spentBytes += bytes
      if (spentBytes > limitBytes) fail(spentBytes, detail)
    },
  }
}

/** Test seam: reset counters and optionally set this run's fuse. */
export function resetMeter(fuse: number = RUN_FUSE_USD): void {
  inputTokens = 0
  outputTokens = 0
  reasoningTokens = 0
  providerCostUsd = 0
  reservedUsd = 0
  calls = 0
  fuseUsd = fuse
}
