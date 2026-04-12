/**
 * Pipeline constants -- no side effects, safe to import from tests.
 */

// Chunk size budget for LLM calls (bytes)
// 64KB ~= 16K tokens (English) or 32-64K tokens (CJK)
// Well within Gemini 3.1 Pro's 65K output token limit
// Conservative: prefer more calls over larger chunks
export const MAX_CHUNK_BYTES = 65_536
