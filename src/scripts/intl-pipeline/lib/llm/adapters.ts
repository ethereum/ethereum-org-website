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
    coAuthor: "Gemini <noreply@google.com>",
    isAvailable: () => Boolean(process.env.GEMINI_API_KEY),
  },
}
