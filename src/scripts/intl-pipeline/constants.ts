/**
 * Pipeline constants -- no side effects, safe to import from tests.
 */

import { adapters, type LlmAdapter } from "./lib/llm/adapters"

// Active LLM adapter (change this to switch LLM providers)
export const LLM: LlmAdapter = adapters.gemini

// Chunk size budget for LLM calls (bytes)
// 64KB ~= 16K tokens (English) or 32-64K tokens (CJK)
// Well within the 65K output token limit
// Conservative: prefer more calls over larger chunks
export const MAX_CHUNK_BYTES = 65_536

// Root directory for translation manifests (relative to repo root)
// Structure: {MANIFESTS_DIR}/{dest-file-path}/source.json | translation.json
export const MANIFESTS_DIR = ".manifests"
