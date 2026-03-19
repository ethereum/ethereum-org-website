/**
 * Core file translation via Gemini (direct, no Crowdin).
 *
 * Sends whole files (no segmentation) with site-specific context.
 * Gemini handles the linguistics; we handle the guardrails.
 */

import { GoogleGenAI } from "@google/genai"

import i18nConfig from "../../../../../i18n.config.json"
import { delay } from "../workflows/utils"

import {
  chunkProse,
  type CodeBlock,
  type CodeComment,
  extractCodeBlocks,
  extractComments,
  getCommentSyntax,
  PROSE_SIZE_THRESHOLD,
  restoreCodeBlocks,
  restoreComments,
} from "./code-block-extractor"
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

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }
  return new GoogleGenAI({ apiKey })
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
 *
 * For markdown files:
 *   1. Extract fenced code blocks -> placeholders (reduces payload)
 *   2. If prose still too large, chunk by headings recursively
 *   3. Translate prose (single call or per-chunk)
 *   4. Restore code blocks
 *   5. Extract and translate code comments separately
 *   6. Restore translated comments into code blocks
 *
 * For JSON files: translate directly (no code blocks).
 */
export async function translateFile(
  options: TranslateFileOptions
): Promise<TranslateFileResult> {
  const { filePath, fileContent, fileType, targetLanguage, glossaryTerms } =
    options

  // JSON files: translate directly, no extraction needed
  if (fileType === "json") {
    return callGemini({ ...options, fileContent })
  }

  // Markdown: extract code blocks first
  const { prose, blocks } = extractCodeBlocks(fileContent)

  if (blocks.length > 0) {
    console.log(
      `  [extract] ${filePath}: ${blocks.length} code blocks removed (${fileContent.length} -> ${prose.length} chars)`
    )
  }

  // Check if prose needs chunking
  const chunks = chunkProse(prose, PROSE_SIZE_THRESHOLD)
  let translatedProse: string
  let totalTokens = { input: 0, output: 0 }

  if (chunks.length === 1) {
    // Single chunk: translate normally
    const result = await callGemini({
      ...options,
      fileContent: prose,
    })
    translatedProse = result.translatedContent
    totalTokens = result.tokensUsed
  } else {
    // Multiple chunks: translate each, reassemble
    console.log(`  [chunk] ${filePath}: split into ${chunks.length} chunks`)
    const translatedChunks: string[] = []
    for (let i = 0; i < chunks.length; i++) {
      const result = await callGemini({
        ...options,
        fileContent: chunks[i],
      })
      translatedChunks.push(result.translatedContent)
      totalTokens.input += result.tokensUsed.input
      totalTokens.output += result.tokensUsed.output
    }
    translatedProse = translatedChunks.join("\n\n")
  }

  // Restore code blocks
  let finalContent = restoreCodeBlocks(translatedProse, blocks)

  // Translate code comments (best-effort, non-fatal)
  if (blocks.length > 0) {
    try {
      finalContent = await translateCodeComments(
        finalContent,
        blocks,
        targetLanguage,
        glossaryTerms
      )
    } catch (error) {
      console.warn(
        `  [comments] ${filePath}: comment translation failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  return {
    translatedContent: finalContent,
    tokensUsed: totalTokens,
  }
}

/**
 * Extract comments from all code blocks, translate them in a single
 * Gemini call, and restore them into the final content.
 */
async function translateCodeComments(
  content: string,
  blocks: CodeBlock[],
  targetLanguage: string,
  glossaryTerms: Map<string, string>
): Promise<string> {
  // Extract comments from all blocks
  const allComments: CodeComment[] = []
  const blockData: Array<{
    block: CodeBlock
    strippedCode: string
    comments: CodeComment[]
  }> = []

  for (const block of blocks) {
    if (!block.language || !block.content.trim()) continue
    const { strippedCode, comments } = extractComments(
      block.content,
      block.language
    )
    // Tag comments with their block index
    const tagged = comments.map((c) => ({ ...c, blockIndex: block.index }))
    allComments.push(...tagged)
    blockData.push({ block, strippedCode, comments: tagged })
  }

  if (allComments.length === 0) return content

  // Build a compact payload for comment translation
  const commentPayload: Record<string, string> = {}
  for (let i = 0; i < allComments.length; i++) {
    commentPayload[`c${i}`] = allComments[i].text
  }

  const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage
  const glossaryHint =
    glossaryTerms.size > 0
      ? `\nUse these exact translations for glossary terms:\n${[
          ...glossaryTerms.entries(),
        ]
          .slice(0, 30)
          .map(([en, loc]) => `  ${en} = ${loc}`)
          .join("\n")}`
      : ""

  const commentPrompt = `Translate these code comments to ${languageName}. Return ONLY a JSON object with the same keys and translated values. Do not add explanations.${glossaryHint}

${JSON.stringify(commentPayload, null, 2)}`

  const result = await callGeminiRaw(commentPrompt)
  let translatedMap: Record<string, string>

  try {
    const cleaned = stripCodeBlockWrapping(result.text, "json")
    translatedMap = JSON.parse(cleaned)
  } catch {
    console.warn("  [comments] Could not parse comment translation response")
    return content
  }

  // Restore translated comments into the code blocks within content
  for (const { block, comments } of blockData) {
    if (comments.length === 0) continue

    const syntax = getCommentSyntax(block.language)

    // Map translated text back onto comment objects
    const translatedComments = comments.map((c) => {
      const key = `c${allComments.indexOf(c)}`
      return { ...c, text: translatedMap[key] || c.text }
    })

    // Find and replace the code block in content
    const fence = "```"
    const originalBlock = `${fence}${block.language}\n${block.content}\n${fence}`
    const restoredCode = restoreComments(
      block.content,
      translatedComments,
      syntax
    )
    const newBlock = `${fence}${block.language}\n${restoredCode}\n${fence}`
    content = content.replace(originalBlock, newBlock)
  }

  return content
}

/**
 * Core Gemini API call with retries and model fallback.
 * Used by both prose translation and comment translation.
 */
async function callGemini(
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

  // Retry loop for validation failures (API call retries are in callGeminiRaw)
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const result = await callGeminiRaw(prompt)

    let text = result.text
    text = stripCodeBlockWrapping(text, fileType)

    const validation: ValidationResult =
      fileType === "json"
        ? validateTranslatedJson(text, fileContent)
        : validateTranslatedMarkdown(text, fileContent)

    if (validation.valid) {
      return {
        translatedContent: text,
        tokensUsed: result.tokensUsed,
      }
    }

    if (attempt < MAX_RETRIES) {
      console.warn(
        `[WARN] ${filePath} validation attempt ${attempt}: ${validation.error}. Retrying...`
      )
      await delay(RETRY_DELAY_MS * attempt)
      continue
    }

    throw new Error(
      `Output validation failed after ${MAX_RETRIES} attempts: ${validation.error}`
    )
  }

  throw new Error(`Translation failed for ${filePath}`)
}

/**
 * Raw Gemini API call with retries and model fallback.
 * Returns the raw text response and token usage.
 */
async function callGeminiRaw(
  prompt: string
): Promise<{ text: string; tokensUsed: { input: number; output: number } }> {
  const client = getGeminiClient()

  const modelsToTry = process.env.GEMINI_MODEL
    ? [process.env.GEMINI_MODEL]
    : GEMINI_MODELS

  let lastError: Error | null = null
  const modelNotFound = new Set<string>()

  for (const modelId of modelsToTry) {
    let modelFailed = false

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await client.models.generateContent({
          model: modelId,
          contents: prompt,
          config: { temperature: 0 },
        })
        const usage = response.usageMetadata

        return {
          text: response.text ?? "",
          tokensUsed: {
            input: usage?.promptTokenCount || 0,
            output: usage?.candidatesTokenCount || 0,
          },
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))

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

        if (
          lastError.message.includes("429") ||
          lastError.message.includes("RESOURCE_EXHAUSTED")
        ) {
          const backoff = RETRY_DELAY_MS * Math.pow(2, attempt)
          console.warn(
            `[WARN] Rate limited (${modelId}). Waiting ${backoff / 1000}s...`
          )
          await delay(backoff)
          continue
        }

        if (attempt < MAX_RETRIES) {
          console.warn(
            `[WARN] Attempt ${attempt} (${modelId}) failed: ${lastError.message}. Retrying...`
          )
          await delay(RETRY_DELAY_MS * attempt)
          continue
        }
      }
    }

    if (!modelFailed) break
  }

  if (modelNotFound.size === modelsToTry.length) {
    throw new Error(
      `All Gemini models unavailable (${[...modelNotFound].join(", ")}). ` +
        `Update GEMINI_MODELS in gemini-translate.ts or set GEMINI_MODEL env var.`
    )
  }

  throw lastError || new Error("Translation failed")
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
