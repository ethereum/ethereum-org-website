/**
 * Gemini API availability check.
 */

/**
 * Check if Gemini API is available (API key present)
 */
export function isGeminiAvailable(): boolean {
  return Boolean(process.env.GEMINI_API_KEY)
}
