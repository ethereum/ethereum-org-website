/**
 * Gemini AI translation wrapper for JSX attribute translation
 */

import { GoogleGenerativeAI } from "@google/generative-ai"

import type { ExtractedAttribute, TranslatedAttribute } from "../jsx-attributes"

/** Gemini API configuration */
const GEMINI_MODEL = "gemini-2.5-pro"

/** Language display names for better prompt context */
const LANGUAGE_NAMES: Record<string, string> = {
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese (Simplified)",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  tr: "Turkish",
  nl: "Dutch",
  pl: "Polish",
  vi: "Vietnamese",
  th: "Thai",
  id: "Indonesian",
  uk: "Ukrainian",
  cs: "Czech",
  ro: "Romanian",
  hu: "Hungarian",
  el: "Greek",
  sv: "Swedish",
  da: "Danish",
  fi: "Finnish",
  no: "Norwegian",
  he: "Hebrew",
  hi: "Hindi",
  bn: "Bengali",
  ms: "Malay",
  tl: "Filipino",
  sw: "Swahili",
}

/**
 * Check if Gemini API is available (API key present)
 */
export function isGeminiAvailable(): boolean {
  return Boolean(process.env.GEMINI_API_KEY)
}

/**
 * Get the Gemini API client
 */
function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }
  return new GoogleGenerativeAI(apiKey)
}

/**
 * Get human-readable language name from code
 */
function getLanguageName(code: string): string {
  return LANGUAGE_NAMES[code] || code.toUpperCase()
}

/**
 * Build translation prompt for a batch of attributes
 */
function buildTranslationPrompt(
  attributes: ExtractedAttribute[],
  targetLanguage: string
): string {
  const langName = getLanguageName(targetLanguage)

  const attributeList = attributes
    .map(
      (attr, i) =>
        `${i + 1}. [${attr.componentName}.${attr.attributeName}] "${attr.originalValue}"
   Context: ${attr.context}`
    )
    .join("\n\n")

  return `You are translating UI component attributes for the Ethereum.org website into ${langName}.

These are JSX component attributes that contain human-readable text. Translate each value naturally and accurately while:
- Preserving technical Ethereum terminology appropriately for ${langName}
- Keeping the translation concise (similar length to original)
- Maintaining any placeholders like {variable} or {{variable}} unchanged
- Using region-neutral ${langName} that most speakers would understand

Attributes to translate:

${attributeList}

Respond with ONLY a JSON array of translated strings in the same order, like:
["translated text 1", "translated text 2", ...]

Do not include any explanation, just the JSON array.`
}

/**
 * Parse Gemini response to extract translated strings
 */
function parseTranslationResponse(response: string): string[] {
  // Clean up response - remove markdown code blocks if present
  let cleaned = response.trim()
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3)
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3)
  }
  cleaned = cleaned.trim()

  try {
    const parsed = JSON.parse(cleaned)
    if (!Array.isArray(parsed)) {
      throw new Error("Response is not an array")
    }
    return parsed.map((item) => String(item))
  } catch (error) {
    console.error("[GEMINI] Failed to parse response:", cleaned)
    throw new Error(`Failed to parse Gemini response: ${error}`)
  }
}

/**
 * Translate a batch of attributes for a single language.
 * Returns translated attributes with their values filled in.
 */
export async function translateAttributes(
  attributes: ExtractedAttribute[],
  targetLanguage: string
): Promise<TranslatedAttribute[]> {
  if (attributes.length === 0) {
    return []
  }

  if (!isGeminiAvailable()) {
    console.warn(
      "[GEMINI] API key not available, skipping attribute translation"
    )
    return []
  }

  const client = getGeminiClient()
  const model = client.getGenerativeModel({ model: GEMINI_MODEL })

  const prompt = buildTranslationPrompt(attributes, targetLanguage)

  console.log(
    `[GEMINI] Translating ${attributes.length} attributes to ${getLanguageName(targetLanguage)}`
  )

  try {
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    const translations = parseTranslationResponse(response)

    if (translations.length !== attributes.length) {
      console.warn(
        `[GEMINI] Translation count mismatch: expected ${attributes.length}, got ${translations.length}`
      )
    }

    // Map translations back to attributes
    return attributes.map((attr, i) => ({
      ...attr,
      translatedValue: translations[i] || attr.originalValue,
    }))
  } catch (error) {
    console.error("[GEMINI] Translation failed:", error)
    throw error
  }
}

/**
 * Translate attributes with retry logic
 */
export async function translateAttributesWithRetry(
  attributes: ExtractedAttribute[],
  targetLanguage: string,
  maxRetries = 3
): Promise<TranslatedAttribute[]> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await translateAttributes(attributes, targetLanguage)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      console.warn(
        `[GEMINI] Attempt ${attempt}/${maxRetries} failed: ${lastError.message}`
      )

      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError || new Error("Translation failed after retries")
}

/**
 * Translate attributes grouped by file, processing each file's batch sequentially
 * to avoid rate limits while maximizing context per request.
 */
export async function translateAttributesByFile(
  attributesByFile: Map<string, ExtractedAttribute[]>,
  targetLanguage: string
): Promise<Map<string, TranslatedAttribute[]>> {
  const results = new Map<string, TranslatedAttribute[]>()

  for (const [filePath, attributes] of attributesByFile) {
    try {
      const translated = await translateAttributesWithRetry(
        attributes,
        targetLanguage
      )
      results.set(filePath, translated)
      console.log(
        `[GEMINI] ✓ Translated ${translated.length} attributes in ${filePath}`
      )
    } catch (error) {
      console.error(`[GEMINI] ✗ Failed to translate ${filePath}:`, error)
      // Continue with other files even if one fails
      results.set(filePath, [])
    }
  }

  return results
}
