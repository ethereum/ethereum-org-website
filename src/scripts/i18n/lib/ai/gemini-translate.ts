/**
 * Core file translation via Gemini (direct, no Crowdin).
 *
 * Sends whole files (no segmentation) with site-specific context.
 * Gemini handles the linguistics; we handle the guardrails.
 */

import { GoogleGenerativeAI } from "@google/generative-ai"

import i18nConfig from "../../../../../i18n.config.json"
import { delay } from "../workflows/utils"

import {
  validateTranslatedJson,
  validateTranslatedMarkdown,
  type ValidationResult,
} from "./gemini-output-validation"
import { buildTranslationPrompt } from "./prompt-builder"

const GEMINI_MODELS = ["gemini-3.1-pro-preview", "gemini-3.1-pro"]
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 5000

const LANGUAGE_NAMES: Record<string, string> = Object.fromEntries(
  i18nConfig.map(({ code, name }: { code: string; name: string }) => [
    code,
    name,
  ])
)

function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }
  return new GoogleGenerativeAI(apiKey)
}

export interface TranslateFileOptions {
  filePath: string
  fileContent: string
  fileType: "markdown" | "json"
  targetLanguage: string
  glossaryTerms: Map<string, string>
}

export interface TranslateFileResult {
  translatedContent: string
  tokensUsed: { input: number; output: number }
}

/**
 * Translate a single file via Gemini.
 * Retries up to MAX_RETRIES times on failure.
 */
export async function translateFile(
  options: TranslateFileOptions
): Promise<TranslateFileResult> {
  const { filePath, fileContent, fileType, targetLanguage, glossaryTerms } =
    options

  const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage
  const prompt = buildTranslationPrompt({
    filePath,
    fileContent,
    fileType,
    targetLanguage,
    languageName,
    glossaryTerms,
  })

  const client = getGeminiClient()

  // Allow env override, otherwise try models in preference order
  const modelsToTry = process.env.GEMINI_MODEL
    ? [process.env.GEMINI_MODEL]
    : GEMINI_MODELS

  let lastError: Error | null = null

  const modelNotFound = new Set<string>()

  for (const modelId of modelsToTry) {
    const model = client.getGenerativeModel({
      model: modelId,
      generationConfig: { temperature: 0 },
    })
    let modelFailed = false

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await model.generateContent(prompt)
        const response = result.response
        let text = response.text()

        // Strip markdown code block wrapping if Gemini added it
        text = stripCodeBlockWrapping(text, fileType)

        // Validate structural integrity
        const validation: ValidationResult =
          fileType === "json"
            ? validateTranslatedJson(text, fileContent)
            : validateTranslatedMarkdown(text, fileContent)
        if (!validation.valid) {
          if (attempt < MAX_RETRIES) {
            console.warn(
              `[WARN] ${filePath} attempt ${attempt} (${modelId}): ${validation.error}. Retrying...`
            )
            await delay(RETRY_DELAY_MS * attempt)
            continue
          }
          throw new Error(
            `Output validation failed after ${MAX_RETRIES} attempts: ${validation.error}`
          )
        }

        const usage = response.usageMetadata
        return {
          translatedContent: text,
          tokensUsed: {
            input: usage?.promptTokenCount || 0,
            output: usage?.candidatesTokenCount || 0,
          },
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))

        // Model not found / deprecated -- fall back to next model
        if (
          lastError.message.includes("404") ||
          lastError.message.includes("not found") ||
          lastError.message.includes("deprecated")
        ) {
          console.warn(
            `[WARN] Model ${modelId} unavailable: ${lastError.message}. Trying next model...`
          )
          modelNotFound.add(modelId)
          modelFailed = true
          break
        }

        // Rate limit -- back off and retry
        if (
          lastError.message.includes("429") ||
          lastError.message.includes("RESOURCE_EXHAUSTED")
        ) {
          const backoff = RETRY_DELAY_MS * Math.pow(2, attempt)
          console.warn(
            `[WARN] Rate limited on ${filePath} (${modelId}). Waiting ${backoff / 1000}s...`
          )
          await delay(backoff)
          continue
        }

        // Other transient errors
        if (attempt < MAX_RETRIES) {
          console.warn(
            `[WARN] ${filePath} attempt ${attempt} (${modelId}) failed: ${lastError.message}. Retrying...`
          )
          await delay(RETRY_DELAY_MS * attempt)
          continue
        }
      }
    }

    if (!modelFailed) break // Success or exhausted retries on working model
  }

  // If all models were unavailable, fail loudly with specific guidance
  if (modelNotFound.size === modelsToTry.length) {
    throw new Error(
      `All Gemini models unavailable (${[...modelNotFound].join(", ")}). ` +
        `Update GEMINI_MODELS in gemini-translate.ts or set GEMINI_MODEL env var.`
    )
  }

  throw lastError || new Error(`Translation failed for ${filePath}`)
}

/**
 * Gemini sometimes wraps output in ```markdown or ```json blocks.
 * Strip that wrapping to get raw content.
 */
function stripCodeBlockWrapping(
  text: string,
  fileType: "markdown" | "json"
): string {
  // Match ```markdown\n...\n``` or ```json\n...\n``` or just ```\n...\n```
  const patterns = [
    new RegExp(
      `^\`\`\`(?:${fileType}|md|mdx)?\\s*\\n([\\s\\S]*?)\\n\`\`\`\\s*$`
    ),
    /^```\s*\n([\s\S]*?)\n```\s*$/,
  ]

  for (const re of patterns) {
    const match = text.match(re)
    if (match) return match[1]
  }

  return text
}
