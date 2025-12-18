/**
 * AI translation module
 */

export type { TranslationContext } from "./gemini"
export {
  isGeminiAvailable,
  translateAttributes,
  translateAttributesByFile,
  translateAttributesWithRetry,
} from "./gemini"
