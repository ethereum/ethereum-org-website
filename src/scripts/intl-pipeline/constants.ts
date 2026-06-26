/**
 * Pipeline constants -- no side effects, safe to import from tests.
 */

import { adapters, type LlmAdapter } from "./lib/llm/adapters"

// Active LLM adapter (change this to switch LLM providers)
export const LLM: LlmAdapter = adapters.gemini

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
