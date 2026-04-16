/**
 * Core file translation via Gemini (direct, no Crowdin).
 *
 * Sends whole files (no segmentation) with site-specific context.
 * Gemini handles the linguistics; we handle the guardrails.
 */

import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai"

import i18nConfig from "../../../../../i18n.config.json"
import { GEMINI_MODELS } from "../../config"
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
import { type ContentNode, normalizeContent } from "./content-normalizer"
import {
  mergeJsonBatches,
  prepareJsonBatches,
  restoreJsonBatch,
} from "./json-batcher"
import {
  validateTranslatedJson,
  validateTranslatedMarkdown,
  type ValidationResult,
} from "./output-validation"
import { buildTranslationPrompt } from "./prompt-builder"

/**
 * Check if Gemini API is available (API key present)
 */
export function isGeminiAvailable(): boolean {
  return Boolean(process.env.GEMINI_API_KEY)
}

// GEMINI_MODELS imported from ../../config
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 5000

/**
 * Disable safety filters for all categories. Translation content (educational
 * blockchain docs) should never be blocked. Without this, Gemini silently
 * returns empty candidates for content that triggers false positives (e.g.,
 * mining/attack descriptions in certain non-Latin languages).
 */
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

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
  /** Set by JSON batching when HTML tags have been extracted to placeholders */
  htmlExtracted?: boolean
  /** Use the content normalizer for placeholder-based translation */
  useNormalizer?: boolean
  /** Content has been normalized with HTML-PLACEHOLDER tags (set internally) */
  normalized?: boolean
}

/** Inert value associated with a placeholder (URL, path, className, etc.) */
export interface PlaceholderInert {
  type: string
  values: Record<string, string>
}

export interface TranslateFileResult {
  translatedContent: string
  tokensUsed: { input: number; output: number }
  /** Placeholder IDs in the order they appear in the translated output */
  placeholderOrder?: string[]
  /** Map of placeholder ID -> inert values (URLs, paths, classNames) */
  placeholderMap?: Record<string, PlaceholderInert>
}

/** Optional metadata for richer Gemini API call logging */
interface GeminiCallMetadata {
  filePath?: string
  targetLanguage?: string
  chunkIndex?: number
  totalChunks?: number
  label?: string
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

  // JSON files: batch large files, extract HTML from values
  if (fileType === "json") {
    return translateJsonFile(options)
  }

  // Markdown with normalizer: placeholder-based translation
  if (options.useNormalizer) {
    return translateNormalizedMarkdown(options)
  }

  // Markdown legacy path: extract code blocks first
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
    const result = await callGemini(
      { ...options, fileContent: prose },
      { filePath, targetLanguage }
    )
    translatedProse = result.translatedContent
    totalTokens = result.tokensUsed
  } else {
    // Multiple chunks: translate each, reassemble
    console.log(`  [chunk] ${filePath}: split into ${chunks.length} chunks`)
    const translatedChunks: string[] = []
    for (let i = 0; i < chunks.length; i++) {
      const result = await callGemini(
        { ...options, fileContent: chunks[i] },
        { filePath, targetLanguage, chunkIndex: i, totalChunks: chunks.length }
      )
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
        glossaryTerms,
        filePath
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
 * Translate markdown using the content normalizer.
 *
 * Flow:
 *   1. Normalize: replace non-translatable content with placeholders
 *   2. Chunk if needed (same heading-based chunking as legacy path)
 *   3. Send normalized prose to Gemini (with placeholder rules in prompt)
 *   4. Verify all placeholders survived in response
 *   5. Reconstruct: replace block placeholders with originals,
 *      rebuild wrapper placeholders with translated text
 *   6. Translate code comments separately (from normalizer tree)
 */
async function translateNormalizedMarkdown(
  options: TranslateFileOptions
): Promise<TranslateFileResult> {
  const { filePath, fileContent, targetLanguage, glossaryTerms } = options

  // Step 1: Normalize
  const { normalized, tree, extractions } = normalizeContent(fileContent)

  const blockCount = Array.from(extractions.keys()).filter(
    (k) => !k.startsWith("LINK:") && !k.startsWith("HTMLTAG:")
  ).length
  const wrapperCount = extractions.size - blockCount

  console.log(
    `  [normalize] ${filePath}: ${blockCount} block + ${wrapperCount} wrapper placeholders ` +
      `(${fileContent.length} -> ${normalized.length} chars)`
  )

  // Step 2: Chunk if needed
  const chunks = chunkProse(normalized, PROSE_SIZE_THRESHOLD)
  let translatedProse: string
  let totalTokens = { input: 0, output: 0 }

  if (chunks.length === 1) {
    const result = await callGemini(
      { ...options, fileContent: normalized, normalized: true },
      { filePath, targetLanguage }
    )
    translatedProse = result.translatedContent
    totalTokens = result.tokensUsed
  } else {
    console.log(`  [chunk] ${filePath}: split into ${chunks.length} chunks`)
    const translatedChunks: string[] = []
    for (let i = 0; i < chunks.length; i++) {
      const result = await callGemini(
        { ...options, fileContent: chunks[i], normalized: true },
        { filePath, targetLanguage, chunkIndex: i, totalChunks: chunks.length }
      )
      translatedChunks.push(result.translatedContent)
      totalTokens.input += result.tokensUsed.input
      totalTokens.output += result.tokensUsed.output
    }
    translatedProse = translatedChunks.join("\n\n")
  }

  // Step 4: Verify placeholders survived
  const missingPlaceholders = verifyPlaceholders(normalized, translatedProse)
  if (missingPlaceholders.length > 0) {
    console.warn(
      `  [normalize] ${filePath}: ${missingPlaceholders.length} placeholder(s) missing in translation:\n` +
        missingPlaceholders.map((p) => `    - ${p}`).join("\n")
    )
  }

  // Step 5: Capture placeholderOrder from Gemini's response (before reconstruction)
  const placeholderOrder = extractPlaceholderOrder(translatedProse)

  // Step 6: Build placeholderMap from the normalizer tree
  const placeholderMap = buildPlaceholderMap(tree)

  // Step 7: Reconstruct
  let finalContent = reconstructFromPlaceholders(translatedProse, extractions)

  // Step 8: Restore heading anchor IDs from English source.
  finalContent = restoreHeadingIds(finalContent, fileContent)

  // Step 9: Translate code comments (from normalizer tree)
  const commentNodes = collectCommentNodes(tree)
  if (commentNodes.length > 0) {
    try {
      finalContent = await translateNormalizedComments(
        finalContent,
        commentNodes,
        targetLanguage,
        glossaryTerms,
        filePath
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
    placeholderOrder,
    placeholderMap,
  }
}

/**
 * Extract placeholder IDs from translated text in the order they appear.
 * Called BEFORE reconstruction so the tags are still present.
 */
function extractPlaceholderOrder(translated: string): string[] {
  const order: string[] = []
  // Match all placeholder tags (self-closing and wrapper open tags, not close tags)
  const re = /<HTML-PLACEHOLDER-([A-Z]+-[a-f0-9]+)(?:\s\/)?>/g
  let match
  while ((match = re.exec(translated)) !== null) {
    order.push(match[1])
  }
  return order
}

/**
 * Build a map from placeholder ID to its inert values.
 *
 * Sources data from the normalizer tree nodes, keyed by the same
 * placeholder IDs that appear in the normalized output.
 */
function buildPlaceholderMap(
  tree: ContentNode[]
): Record<string, PlaceholderInert> {
  const map: Record<string, PlaceholderInert> = {}

  function visit(node: ContentNode): void {
    if (node.type === "link" && "meta" in node) {
      // Extract hash from placeholder: "<HTML-PLACEHOLDER-LINK-abc123>...</...>"
      const hashMatch = node.placeholder.match(/LINK-([a-f0-9]+)/)
      if (hashMatch) {
        map[`LINK-${hashMatch[1]}`] = {
          type: "link",
          values: { url: node.meta.url },
        }
      }
    }

    if (node.type === "image" && "meta" in node) {
      const hashMatch = node.placeholder.match(/IMAGE-([a-f0-9]+)/)
      if (hashMatch) {
        map[`IMAGE-${hashMatch[1]}`] = {
          type: "image",
          values: { path: node.meta.path },
        }
      }
    }

    if (node.type === "html-tag" && "meta" in node) {
      const hashMatch = node.placeholder.match(/HTMLTAG-([a-f0-9]+)/)
      if (hashMatch) {
        map[`HTMLTAG-${hashMatch[1]}`] = {
          type: "html-tag",
          values: { tagName: node.meta.tagName, ...node.meta.inertAttributes },
        }
      }
    }

    if (node.type === "component" && "meta" in node) {
      const hashMatch = node.placeholder.match(/COMPONENT-([a-f0-9]+)/)
      if (hashMatch) {
        map[`COMPONENT-${hashMatch[1]}`] = {
          type: "component",
          values: {
            componentName: node.meta.componentName,
            ...node.meta.inertAttributes,
          },
        }
      }
    }

    if (node.type === "code-fence") {
      const hashMatch = node.placeholder.match(/CODEBLOCK-([a-f0-9]+)/)
      if (hashMatch) {
        map[`CODEBLOCK-${hashMatch[1]}`] = {
          type: "code-fence",
          values: {},
        }
      }
    }

    if (node.type === "inline-code") {
      const hashMatch = node.placeholder.match(/CODE-([a-f0-9]+)/)
      if (hashMatch) {
        map[`CODE-${hashMatch[1]}`] = {
          type: "inline-code",
          values: { content: node.content },
        }
      }
    }

    if ("children" in node && node.children) {
      for (const child of node.children) {
        visit(child)
      }
    }
  }

  for (const node of tree) {
    visit(node)
  }

  return map
}

/**
 * Restore heading anchor IDs from the English source onto translated headings.
 *
 * Matches by heading level and sequential position. The normalizer strips
 * {#anchor-id} before sending to Gemini; this copies them back from English.
 */
function restoreHeadingIds(translated: string, english: string): string {
  const HEADING_RE = /^(#{1,6})\s+/gm
  const HEADING_ID_RE = /^(#{1,6}\s+.+?)[ \t]*(\{#[^}]+\})[ \t]*$/gm

  // Extract IDs from English in order
  const englishIds: string[] = []
  let match
  while ((match = HEADING_ID_RE.exec(english)) !== null) {
    englishIds.push(match[2])
  }

  if (englishIds.length === 0) return translated

  // Find headings in translated text (without IDs) and append the English ID.
  // Skip lines inside code fences to avoid matching # comments as headings.
  let idIndex = 0
  let inFence = false
  const lines = translated.split("\n")
  for (let i = 0; i < lines.length; i++) {
    if (idIndex >= englishIds.length) break
    if (lines[i].startsWith("```")) inFence = !inFence
    if (inFence) continue
    HEADING_RE.lastIndex = 0
    if (HEADING_RE.test(lines[i]) && !lines[i].includes("{#")) {
      lines[i] = `${lines[i].trimEnd()} ${englishIds[idIndex]}`
      idIndex++
    }
  }

  if (idIndex < englishIds.length) {
    console.warn(
      `  [heading-ids] Restored ${idIndex}/${englishIds.length} heading IDs (translated file has fewer headings)`
    )
  }

  return lines.join("\n")
}

/**
 * Verify all placeholder tags from the normalized input survive in the translation.
 * Returns a list of missing placeholders.
 */
function verifyPlaceholders(normalized: string, translated: string): string[] {
  const missing: string[] = []

  // Block placeholders (self-closing)
  const blockRe = /<HTML-PLACEHOLDER-(?:CODE|IMAGE)-[a-f0-9]+ \/>/g
  let match
  while ((match = blockRe.exec(normalized)) !== null) {
    if (!translated.includes(match[0])) {
      missing.push(match[0])
    }
  }

  // Self-closing CODEBLOCK (true code) and COMPONENT (childless)
  const selfClosingRe =
    /<HTML-PLACEHOLDER-(?:CODEBLOCK|COMPONENT)-[a-f0-9]+ \/>/g
  while ((match = selfClosingRe.exec(normalized)) !== null) {
    if (!translated.includes(match[0])) {
      missing.push(match[0])
    }
  }

  // Wrapper open tags
  const wrapperOpenRe =
    /<HTML-PLACEHOLDER-(?:CODEBLOCK|LINK|HTMLTAG|COMPONENT)-[a-f0-9]+>/g
  while ((match = wrapperOpenRe.exec(normalized)) !== null) {
    if (!translated.includes(match[0])) {
      missing.push(match[0])
    }
  }

  // Wrapper close tags
  const wrapperCloseRe =
    /<\/HTML-PLACEHOLDER-(?:CODEBLOCK|LINK|HTMLTAG|COMPONENT)-[a-f0-9]+>/g
  while ((match = wrapperCloseRe.exec(normalized)) !== null) {
    if (!translated.includes(match[0])) {
      missing.push(match[0])
    }
  }

  return missing
}

/**
 * Reconstruct final markdown from Gemini's translated output and the extraction map.
 *
 * Block placeholders are replaced with their originals.
 * Wrapper placeholders are rebuilt with the (potentially translated) text
 * that Gemini placed between the tags.
 */
function reconstructFromPlaceholders(
  translated: string,
  extractions: Map<string, string>
): string {
  let result = translated

  // Block placeholders: replace ALL occurrences with originals.
  // Content-addressed placeholders can appear multiple times when the
  // same inline code/image appears repeatedly (e.g., `base fee` x5).
  extractions.forEach((original, placeholder) => {
    if (
      placeholder.startsWith("LINK:") ||
      placeholder.startsWith("HTMLTAG:") ||
      placeholder.startsWith("COMPONENT:") ||
      placeholder.startsWith("CODEBLOCK:")
    ) {
      return
    }
    result = result.split(placeholder).join(original)
  })

  // Wrapper placeholders: LINK
  // Loop to handle duplicate content-addressed placeholders (same link text+URL)
  extractions.forEach((original, key) => {
    if (!key.startsWith("LINK:")) return
    const hash = key.slice(5)
    const openTag = `<HTML-PLACEHOLDER-LINK-${hash}>`
    const closeTag = `</HTML-PLACEHOLDER-LINK-${hash}>`
    const urlMatch = original.match(/\]\(([^)]+)\)/)
    if (!urlMatch) return

    let openIdx = result.indexOf(openTag)
    while (openIdx >= 0) {
      const closeIdx = result.indexOf(closeTag, openIdx)
      if (closeIdx < 0) break
      const translatedText = result.slice(openIdx + openTag.length, closeIdx)
      const rebuilt = `[${translatedText}](${urlMatch[1]})`
      result =
        result.slice(0, openIdx) +
        rebuilt +
        result.slice(closeIdx + closeTag.length)
      openIdx = result.indexOf(openTag)
    }
  })

  // Wrapper placeholders: HTMLTAG
  extractions.forEach((original, key) => {
    if (!key.startsWith("HTMLTAG:")) return
    const hash = key.slice(8)
    const openTag = `<HTML-PLACEHOLDER-HTMLTAG-${hash}>`
    const closeTag = `</HTML-PLACEHOLDER-HTMLTAG-${hash}>`
    const tagMatch = original.match(/<(\w+)(\s[^>]*)?>/)
    const closingMatch = original.match(/<\/(\w+)>/)
    if (!tagMatch || !closingMatch) return

    let openIdx = result.indexOf(openTag)
    while (openIdx >= 0) {
      const closeIdx = result.indexOf(closeTag, openIdx)
      if (closeIdx < 0) break
      const translatedText = result.slice(openIdx + openTag.length, closeIdx)
      const rebuilt = `<${tagMatch[1]}${tagMatch[2] || ""}>${translatedText}</${closingMatch[1]}>`
      result =
        result.slice(0, openIdx) +
        rebuilt +
        result.slice(closeIdx + closeTag.length)
      openIdx = result.indexOf(openTag)
    }
  })

  // Wrapper placeholders: COMPONENT (components with children)
  extractions.forEach((original, key) => {
    if (!key.startsWith("COMPONENT:")) return
    const hash = key.slice(10)
    const openTag = `<HTML-PLACEHOLDER-COMPONENT-${hash}>`
    const closeTag = `</HTML-PLACEHOLDER-COMPONENT-${hash}>`
    const openingTagMatch = original.match(/<([A-Z][a-zA-Z0-9]*)(\s[^>]*)?>/)
    const closingTagMatch = original.match(/<\/([A-Z][a-zA-Z0-9]*)>/)
    if (!openingTagMatch || !closingTagMatch) return

    let openIdx = result.indexOf(openTag)
    while (openIdx >= 0) {
      const closeIdx = result.indexOf(closeTag, openIdx)
      if (closeIdx < 0) break
      const translatedChildren = result.slice(
        openIdx + openTag.length,
        closeIdx
      )
      const rebuilt = `<${openingTagMatch[1]}${openingTagMatch[2] || ""}>${translatedChildren}</${closingTagMatch[1]}>`
      result =
        result.slice(0, openIdx) +
        rebuilt +
        result.slice(closeIdx + closeTag.length)
      openIdx = result.indexOf(openTag)
    }
  })

  // Wrapper placeholders: CODEBLOCK (prose/markdown fences)
  extractions.forEach((original, key) => {
    if (!key.startsWith("CODEBLOCK:")) return
    const hash = key.slice(10)
    const openTag = `<HTML-PLACEHOLDER-CODEBLOCK-${hash}>`
    const closeTag = `</HTML-PLACEHOLDER-CODEBLOCK-${hash}>`
    const fenceMatch = original.match(/^([ \t]*)(```|~~~)([^\n]*)/)
    if (!fenceMatch) return

    let openIdx = result.indexOf(openTag)
    while (openIdx >= 0) {
      const closeIdx = result.indexOf(closeTag, openIdx)
      if (closeIdx < 0) break
      const translatedContent = result.slice(openIdx + openTag.length, closeIdx)
      const rebuilt = `${fenceMatch[1]}${fenceMatch[2]}${fenceMatch[3]}\n${translatedContent.trim()}\n${fenceMatch[1]}${fenceMatch[2]}`
      result =
        result.slice(0, openIdx) +
        rebuilt +
        result.slice(closeIdx + closeTag.length)
      openIdx = result.indexOf(openTag)
    }
  })

  return result
}

/**
 * Collect code comment nodes from the normalizer tree.
 */
function collectCommentNodes(tree: ContentNode[]): Array<{
  text: string
  language: string
  line: string
  commentType: string
}> {
  const comments: Array<{
    text: string
    language: string
    line: string
    commentType: string
  }> = []

  function visit(node: ContentNode): void {
    if (node.type === "code-comment") {
      comments.push({
        text: node.content,
        language: node.meta.language,
        line: node.meta.line,
        commentType: node.meta.commentType,
      })
    }
    if ("children" in node && node.children) {
      for (const child of node.children) {
        visit(child)
      }
    }
  }

  for (const node of tree) {
    visit(node)
  }
  return comments
}

/**
 * Translate code comments using data from the normalizer tree.
 * Same approach as translateCodeComments but sources from the tree.
 */
async function translateNormalizedComments(
  content: string,
  commentNodes: Array<{
    text: string
    language: string
    line: string
    commentType: string
  }>,
  targetLanguage: string,
  glossaryTerms: Map<string, string>,
  filePath: string
): Promise<string> {
  if (commentNodes.length === 0) return content

  const commentPayload: Record<string, string> = {}
  for (let i = 0; i < commentNodes.length; i++) {
    commentPayload[`c${i}`] = commentNodes[i].text
  }

  const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage
  const glossaryLines: string[] = []
  glossaryTerms.forEach((loc, en) => glossaryLines.push(`  ${en} = ${loc}`))
  const glossaryHint =
    glossaryLines.length > 0
      ? `\nUse these exact translations for glossary terms:\n${glossaryLines.slice(0, 30).join("\n")}`
      : ""

  const commentPrompt = `Translate these code comments to ${languageName}. Return ONLY a JSON object with the same keys and translated values. Do not add explanations.${glossaryHint}

${JSON.stringify(commentPayload, null, 2)}`

  const result = await callGeminiRaw(commentPrompt, {
    filePath,
    targetLanguage,
    label: "code-comments",
  })

  let translatedMap: Record<string, string>
  try {
    const cleaned = stripCodeBlockWrapping(result.text, "json")
    translatedMap = JSON.parse(cleaned)
  } catch {
    console.warn("  [comments] Could not parse comment translation response")
    return content
  }

  // Replace English comments with translated ones in the final content
  for (let i = 0; i < commentNodes.length; i++) {
    const original = commentNodes[i].text
    const translated = translatedMap[`c${i}`]
    if (translated && translated !== original) {
      // Replace first occurrence (comments may repeat, handle one at a time)
      content = content.replace(original, translated)
    }
  }

  return content
}

/**
 * Translate a JSON file with batching and HTML placeholder extraction.
 *
 * 1. Parse and split into ~100-key batches (if large)
 * 2. Extract HTML tags from values into numbered placeholders
 * 3. Translate each batch via Gemini
 * 4. Restore HTML tags from placeholders
 * 5. Merge batches and validate against full English source
 */
async function translateJsonFile(
  options: TranslateFileOptions
): Promise<TranslateFileResult> {
  const { filePath, fileContent, targetLanguage } = options

  const prepared = prepareJsonBatches(fileContent)
  const totalTokens = { input: 0, output: 0 }

  if (prepared.batchContents.length > 1) {
    console.log(
      `  [json-batch] ${filePath}: ${prepared.totalKeys} keys -> ${prepared.batchContents.length} batches (${prepared.batchSizes.join(", ")})`
    )
  }
  if (prepared.htmlExtracted) {
    console.log(
      `  [html-extract] ${filePath}: HTML tags replaced with placeholders`
    )
  }

  const translatedBatches: string[] = []

  for (let i = 0; i < prepared.batchContents.length; i++) {
    const batchContent = prepared.batchContents[i]
    const isMultiBatch = prepared.batchContents.length > 1

    // Translate this batch (callGemini handles retries and validation)
    const result = await callGemini(
      {
        ...options,
        fileContent: batchContent,
        htmlExtracted: prepared.htmlExtracted,
      },
      {
        filePath,
        targetLanguage,
        chunkIndex: isMultiBatch ? i : undefined,
        totalChunks: isMultiBatch ? prepared.batchContents.length : undefined,
        label: isMultiBatch ? "json-batch" : undefined,
      }
    )

    totalTokens.input += result.tokensUsed.input
    totalTokens.output += result.tokensUsed.output

    // Restore HTML placeholders in translated output
    const placeholderMap = prepared.placeholderMaps[i]
    if (placeholderMap.size > 0) {
      const { content, failures } = restoreJsonBatch(
        result.translatedContent,
        placeholderMap
      )
      if (failures.length > 0) {
        console.warn(
          `  [html-restore] ${filePath}${isMultiBatch ? ` batch ${i + 1}` : ""}: ${failures.length} placeholder(s) missing:\n` +
            failures.map((f) => `    - ${f}`).join("\n")
        )
      }
      translatedBatches.push(content)
    } else {
      translatedBatches.push(result.translatedContent)
    }
  }

  // Merge batches into final JSON
  const finalContent = mergeJsonBatches(translatedBatches)

  // Final validation: merged result against original English
  if (prepared.batchContents.length > 1) {
    const validation = validateTranslatedJson(finalContent, fileContent)
    if (!validation.valid) {
      console.warn(
        `  [json-batch] ${filePath}: merged validation warning: ${validation.error}`
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
  glossaryTerms: Map<string, string>,
  filePath: string
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
  const glossaryLines: string[] = []
  glossaryTerms.forEach((loc, en) => glossaryLines.push(`  ${en} = ${loc}`))
  const glossaryHint =
    glossaryLines.length > 0
      ? `\nUse these exact translations for glossary terms:\n${glossaryLines.slice(0, 30).join("\n")}`
      : ""

  const commentPrompt = `Translate these code comments to ${languageName}. Return ONLY a JSON object with the same keys and translated values. Do not add explanations.${glossaryHint}

${JSON.stringify(commentPayload, null, 2)}`

  const result = await callGeminiRaw(commentPrompt, {
    filePath,
    targetLanguage,
    label: "code-comments",
  })
  let translatedMap: Record<string, string>

  try {
    const cleaned = stripCodeBlockWrapping(result.text, "json")
    translatedMap = JSON.parse(cleaned)
  } catch {
    console.warn("  [comments] Could not parse comment translation response")
    return content
  }

  // Restore translated comments into the code blocks within content
  for (const { block, strippedCode, comments } of blockData) {
    if (comments.length === 0) continue

    const syntax = getCommentSyntax(block.language)

    // Map translated text back onto comment objects
    const translatedComments = comments.map((c) => {
      const key = `c${allComments.indexOf(c)}`
      return { ...c, text: translatedMap[key] || c.text }
    })

    // Find and replace the code block in content
    // Use strippedCode (English comments removed) instead of block.content
    // to avoid duplicating English comments alongside translated ones
    const fence = "```"
    const ind = block.indent || ""
    const originalBlock = `${fence}${block.language}\n${block.content}\n${ind}${fence}`
    const restoredCode = restoreComments(
      strippedCode,
      translatedComments,
      syntax
    )
    const newBlock = `${fence}${block.language}\n${restoredCode}\n${ind}${fence}`
    content = content.replace(originalBlock, newBlock)
  }

  return content
}

/**
 * Core Gemini API call with retries and model fallback.
 * Used by both prose translation and comment translation.
 */
async function callGemini(
  options: TranslateFileOptions,
  metadata?: GeminiCallMetadata
): Promise<TranslateFileResult> {
  const {
    filePath,
    fileContent,
    fileType,
    targetLanguage,
    glossaryTerms,
    htmlExtracted,
    normalized,
  } = options

  const languageName = LANGUAGE_NAMES[targetLanguage] || targetLanguage
  const prompt = buildTranslationPrompt({
    filePath,
    fileContent,
    fileType,
    targetLanguage,
    languageName,
    glossaryTerms,
    htmlExtracted,
    normalized,
  })

  // Retry loop for validation failures (API call retries are in callGeminiRaw)
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const result = await callGeminiRaw(prompt, metadata)

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
 * Raw Gemini API call with retries, model fallback, and verbose logging.
 *
 * Logging behavior:
 * - Always: timestamped REQUEST/RESPONSE lines with model, duration, tokens
 * - Verbose: full prompt content between === PROMPT START/END === markers
 *
 * Returns the raw text response and token usage.
 */
export async function callGeminiRaw(
  prompt: string,
  metadata?: GeminiCallMetadata
): Promise<{ text: string; tokensUsed: { input: number; output: number } }> {
  const client = getGeminiClient()
  const verbose = process.env.VERBOSE === "true"
  const ts = () => new Date().toISOString()

  const modelsToTry = GEMINI_MODELS

  // Build context string for log lines
  const ctx = [
    metadata?.filePath && `file=${metadata.filePath}`,
    metadata?.targetLanguage && `lang=${metadata.targetLanguage}`,
    metadata?.chunkIndex != null &&
      `chunk=${(metadata.chunkIndex ?? 0) + 1}/${metadata.totalChunks}`,
    metadata?.label,
  ]
    .filter(Boolean)
    .join(" ")

  let lastError: Error | null = null
  const modelNotFound = new Set<string>()

  for (const modelId of modelsToTry) {
    let modelFailed = false

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      const startTime = Date.now()

      console.log(
        `[${ts()}] [gemini] REQUEST model=${modelId} ${ctx}${attempt > 1 ? ` attempt=${attempt}` : ""}`
      )

      if (verbose) {
        // Split prompt into sections for collapsible groups
        const sourceMatch = prompt.match(
          /([\s\S]*?)(=== SOURCE FILE ===[\s\S]*?=== END SOURCE FILE ===)([\s\S]*)/
        )
        if (sourceMatch) {
          const [, preamble, sourceFile] = sourceMatch
          console.log(
            `::group::Prompt preamble: ${ctx} (rules, glossary, hints)`
          )
          console.log(preamble.trim())
          console.log("::endgroup::")
          console.log(`::group::Source file: ${ctx} (${prompt.length} chars)`)
          console.log(sourceFile)
          console.log("::endgroup::")
        } else {
          console.log(`::group::Prompt: ${ctx} (${prompt.length} chars)`)
          console.log(prompt)
          console.log("::endgroup::")
        }
      }

      try {
        const GEMINI_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS)
        const response = await client.models
          .generateContent({
            model: modelId,
            contents: prompt,
            config: { temperature: 0, safetySettings: SAFETY_SETTINGS },
          })
          .finally(() => clearTimeout(timeout))
        const usage = response.usageMetadata
        const duration = ((Date.now() - startTime) / 1000).toFixed(1)

        // Inspect response for non-obvious failure modes before accessing .text
        const candidate = (
          response as unknown as {
            candidates?: Array<{
              finishReason?: string
              safetyRatings?: Array<{ category?: string; probability?: string }>
            }>
          }
        ).candidates?.[0]
        const finishReason: string | undefined = candidate?.finishReason

        // Log non-STOP finish reasons (these explain silent failures)
        if (finishReason && finishReason !== "STOP") {
          const safetyInfo = candidate?.safetyRatings
            ?.map(
              (r: { category?: string; probability?: string }) =>
                `${r.category}=${r.probability}`
            )
            .join(", ")
          console.warn(
            `[${ts()}] [gemini] FINISH_REASON model=${modelId} ${ctx} ` +
              `duration=${duration}s reason=${finishReason}` +
              (safetyInfo ? ` safety=[${safetyInfo}]` : "")
          )
        }

        // Check prompt-level blocking
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blockReason = (response as any).promptFeedback?.blockReason
        if (blockReason) {
          console.warn(
            `[${ts()}] [gemini] PROMPT_BLOCKED model=${modelId} ${ctx} ` +
              `duration=${duration}s reason=${blockReason}`
          )
        }

        console.log(
          `[${ts()}] [gemini] RESPONSE model=${modelId} ${ctx} ` +
            `duration=${duration}s ` +
            `tokens_in=${usage?.promptTokenCount || 0} ` +
            `tokens_out=${usage?.candidatesTokenCount || 0}` +
            (finishReason && finishReason !== "STOP"
              ? ` finishReason=${finishReason}`
              : "")
        )

        // Access .text -- may be empty/undefined if blocked
        const text = response.text ?? ""
        if (!text && finishReason && finishReason !== "STOP") {
          throw new Error(
            `Gemini returned no content (finishReason=${finishReason}). ` +
              `This file/language combination may be triggering content filters.`
          )
        }

        return {
          text,
          tokensUsed: {
            input: usage?.promptTokenCount || 0,
            output: usage?.candidatesTokenCount || 0,
          },
        }
      } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(1)
        lastError = error instanceof Error ? error : new Error(String(error))

        if (
          lastError.message.includes("404") ||
          lastError.message.includes("not found") ||
          lastError.message.includes("deprecated")
        ) {
          console.warn(
            `[${ts()}] [gemini] MODEL_UNAVAILABLE model=${modelId} duration=${duration}s error="${lastError.message}"`
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
            `[${ts()}] [gemini] RATE_LIMITED model=${modelId} ${ctx} duration=${duration}s backoff=${backoff / 1000}s`
          )
          await delay(backoff)
          continue
        }

        if (attempt < MAX_RETRIES) {
          console.warn(
            `[${ts()}] [gemini] ERROR model=${modelId} ${ctx} attempt=${attempt} duration=${duration}s error="${lastError.message.slice(0, 200)}"`
          )
          await delay(RETRY_DELAY_MS * attempt)
          continue
        }

        console.error(
          `[${ts()}] [gemini] FAILED model=${modelId} ${ctx} duration=${duration}s error="${lastError.message.slice(0, 200)}"`
        )
      }
    }

    if (!modelFailed) break
  }

  if (modelNotFound.size === modelsToTry.length) {
    throw new Error(
      `All Gemini models unavailable (${[...modelNotFound].join(", ")}). ` +
        `Update GEMINI_MODELS in config.ts or set GEMINI_MODEL env var.`
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
