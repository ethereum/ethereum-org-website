/**
 * LLM adapter interface and registry.
 *
 * Each adapter declares its models, identity, and availability.
 * The pipeline references the active adapter -- not a specific LLM.
 */

export interface LlmAdapter {
  /** Display name for logs and PR metadata */
  name: string
  /** Models to try in order (first available wins) */
  models: string[]
  /** Co-author line for git commits (if available) */
  coAuthor?: string
  /** Check if this adapter's API key is available */
  isAvailable: () => boolean
}

// ---------------------------------------------------------------------------
// Available adapters
// ---------------------------------------------------------------------------

export const adapters: Record<string, LlmAdapter> = {
  gemini: {
    name: "Gemini",
    models: ["gemini-3.1-pro-preview", "gemini-3.1-pro"],
    coAuthor: "Gemini <gemini@google.com>",
    isAvailable: () => Boolean(process.env.GEMINI_API_KEY),
  },
  // Same models at list price, but the key carries a server-side credit limit
  // the pipeline cannot exceed. Model ids are namespaced by provider, so this
  // is also the seam for moving off Google without touching the pipeline.
  openrouter: {
    name: "Gemini via OpenRouter",
    models: ["google/gemini-3.1-pro-preview", "google/gemini-3.1-pro"],
    coAuthor: "Gemini <gemini@google.com>",
    isAvailable: () => Boolean(process.env.OPENROUTER_API_KEY),
  },
}
