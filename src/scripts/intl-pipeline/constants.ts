/**
 * Pipeline constants -- no side effects, safe to import from tests.
 */

import { adapters, type LlmAdapter } from "./lib/llm/adapters"

// Active LLM provider: "gemini" (direct) or "openrouter". Set LLM_PROVIDER.
export const LLM_PROVIDER = process.env.LLM_PROVIDER?.trim() || "gemini"

if (!adapters[LLM_PROVIDER]) {
  throw new Error(
    `Unknown LLM_PROVIDER "${LLM_PROVIDER}" (have: ${Object.keys(adapters).join(", ")})`
  )
}

export const LLM: LlmAdapter = adapters[LLM_PROVIDER]

// Per-Gemini-call hard timeout (milliseconds). The pipeline aborts the
// request via AbortController if generation hasn't completed within this
// window. Sized so a chunk at MAX_CHUNK_BYTES (below) produces output that
// fits comfortably inside the window even for high-expansion target
// languages (sw, ur, ar at ~1.5x).
export const GEMINI_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes

// Chunk size budget for LLM calls (bytes).
// 32KB ~= 8K input tokens (English) or 16-32K (CJK). Sized in tandem with
// GEMINI_TIMEOUT_MS above so high-expansion languages still produce output
// well under the timeout window. Prefer more calls over larger chunks.
export const MAX_CHUNK_BYTES = 32_768

// Per-batch cap on replicated CONTEXT bytes in an incremental prompt.
// Context is resent with every batch, so it is a per-call tax: uncapped, a
// large existing translation is billed once per changed section.
export const MAX_CONTEXT_BYTES = 8_192

// Hard ceiling on incremental batches per file per locale. A well-formed
// incremental update is a handful of batches; hundreds means the batching
// collapsed and a full retranslation would be cheaper.
export const MAX_BATCHES_PER_FILE = 32

// Gemini standard-tier pricing, USD per 1M tokens (<=200k prompts).
// https://ai.google.dev/gemini-api/docs/pricing (as of 11-April-2026)
export const INPUT_RATE_USD_PER_1M = 2.0
export const OUTPUT_RATE_USD_PER_1M = 12.0

// Whole-run fuse, not a budget: a legitimate full-tree run is under $2 and a
// deliberate backfill has reached ~$50, so this only catches "categorically
// wrong". Override with INTL_MAX_COST_USD.
export const RUN_FUSE_USD = Number(process.env.INTL_MAX_COST_USD || 100)

// Least content a batch may carry after prompt overhead (rules + glossary +
// replicated context) is accounted for. Hitting this means overhead has grown
// enough to crowd out the work; fail loudly rather than fan out into many tiny
// calls, which is how run 31149083965 became expensive.
export const MIN_CONTENT_BUDGET_BYTES = 4_096

// Maximum bytes in a single LLM prompt, and the unit the per-file budget is
// built from: one chunk of content (MAX_CHUNK_BYTES) plus context
// (MAX_CONTEXT_BYTES) plus <SECTION> envelopes, rules and glossary. Measured
// worst case on learn-quizzes.json is 49KB, so this leaves ~30% headroom.
export const MAX_PROMPT_BYTES = 65_536

// Maximum recursion depth when splitting a failed batch into sub-batches.
// On retry exhaustion (validation failure or timeout), translateJsonFile
// will split the batch in half and retry each half, up to this many levels.
// depth=2 reduces a 100-key batch to ~25-key sub-batches before giving up.
export const MAX_SPLIT_DEPTH = 2

// Root directory for translation manifests (relative to repo root)
// Structure: {MANIFESTS_DIR}/{dest-file-path}/source.json | translation.json
export const MANIFESTS_DIR = ".manifests"

// Paths that should never be translated
export const DO_NOT_TRANSLATE_PATHS = [
  // Legal pages
  "/cookie-policy/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/terms-and-conditions/",
  // Contributing pages
  "/style-guide/",
]
