/**
 * JSX Attribute Translation Pass (Phase 4b in PIPELINE-SPEC.md)
 *
 * Translates the *values* of translatable JSX attributes (title, description,
 * alt, etc.) on JSX components, while preserving non-translatable attributes
 * (eventCategory, href, src) byte-for-byte. Runs after the main translation
 * pass, on the source english-B + post-Phase-4 locale content.
 *
 * The Phase 4 LLM prompt is instructed to preserve component tags and attr
 * names exactly to avoid breaking JSX. This separate, narrowly-scoped pass
 * with a hard-coded allow-list is safer than asking the main prompt to also
 * translate selected attribute values.
 */

import { parseMarkdown } from "intl-content-tree"

import {
  isTranslatableValue,
  TRANSLATABLE_ATTRIBUTES,
  type TranslatableAttribute,
} from "../shared-patterns"

const ALLOWED_ATTRIBUTES = new Set<string>(TRANSLATABLE_ATTRIBUTES)

/**
 * A single translatable JSX attribute occurrence in a source file.
 */
export interface AttributeLeaf {
  /** Stable id from the content tree (used for diff/manifest matching) */
  id: string
  /** Component tag name, e.g. "ExpandableCard" */
  componentName: string
  /** Attribute name, e.g. "title" */
  attributeName: string
  /** English value, e.g. "Why can't Ethereum just replace BLS?" */
  englishValue: string
}

/**
 * Walk the source content tree and return every component-attribute leaf
 * whose attribute name is in the allow-list AND whose value passes the
 * translatability heuristic.
 *
 * Inputs that fail the heuristic (URLs, identifiers, code) are dropped here
 * so callers don't need to re-check.
 */
export function extractAttributeLeaves(source: string): AttributeLeaf[] {
  const tree = parseMarkdown(source, {
    translatableAttributes: [...TRANSLATABLE_ATTRIBUTES],
  })
  const leaves: AttributeLeaf[] = []

  // Recursive tree walk. component-attribute nodes carry meta.name (the
  // attribute name) and value (the attribute value); the parent component
  // node carries meta.tagName (the component name). We pass the current
  // component context down through the walk so each leaf knows its parent.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const walk = (node: any, currentComponent: string | undefined) => {
    if (!node) return
    let nextComponent = currentComponent
    if (node.elementType === "component" && node.meta?.tagName) {
      nextComponent = node.meta.tagName
    }
    if (
      node.elementType === "component-attribute" &&
      node.meta?.name &&
      typeof node.value === "string" &&
      ALLOWED_ATTRIBUTES.has(node.meta.name) &&
      isTranslatableValue(node.value) &&
      currentComponent
    ) {
      leaves.push({
        id: node.id,
        componentName: currentComponent,
        attributeName: node.meta.name as TranslatableAttribute,
        englishValue: node.value,
      })
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child, nextComponent)
    }
  }

  walk(tree, undefined)
  return leaves
}

/**
 * Build the LLM prompt for a batch of attribute translations.
 *
 * Format the LLM is asked to return:
 *   1. <translation>
 *   2. <translation>
 *   ...
 * One per line, in the same order as the input list. This makes parsing
 * trivial and lets us detect count mismatches.
 */
export function buildAttributePrompt(
  leaves: AttributeLeaf[],
  targetLanguage: string,
  glossary: Map<string, string>
): string {
  const numbered = leaves
    .map(
      (l, i) =>
        `${i + 1}. [${l.componentName}.${l.attributeName}] "${l.englishValue}"`
    )
    .join("\n")

  const glossaryLines: string[] = []
  if (glossary.size > 0) {
    for (const [en, tr] of glossary) {
      glossaryLines.push(`- "${en}" -> "${tr}"`)
    }
  }
  const glossaryBlock = glossaryLines.length
    ? `\n\nGlossary (use these translations for terms when they appear):\n${glossaryLines.join("\n")}`
    : ""

  return `You are translating UI component attribute values for the Ethereum.org website into ${targetLanguage}.

These are JSX component attributes that contain human-readable text. Translate each value naturally and accurately while:
- Preserving brand names (Ethereum, Vitalik, etc.) and product names per the glossary
- Keeping technical identifiers (variable names, code references) untranslated when they appear
- Matching the register/tone of UI copy (concise, user-facing)
- Using Western Arabic numerals (0-9) for any digits. Exception: Urdu (ur) uses Urdu numerals (۰-۹).
- Returning ONE translation per input line, in the same order

Attributes to translate:
${numbered}${glossaryBlock}

Return ONLY a numbered list of translations, one per line, no explanations:
1. <translation of input 1>
2. <translation of input 2>
...`
}

/**
 * Parse the LLM response back into a list of translations aligned with the
 * input leaves. Returns null on count mismatch or unparseable response.
 */
export function parseAttributeResponse(
  response: string,
  expectedCount: number
): string[] | null {
  const lines = response
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

  const translations: string[] = []
  for (const line of lines) {
    // Strip leading "1." or "1)" numbering, then trim
    let text = line.replace(/^\d+[.)]\s*/, "").trim()
    // Strip surrounding quotes if present (LLMs often quote the value)
    if (
      (text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith("'") && text.endsWith("'"))
    ) {
      text = text.slice(1, -1)
    }
    translations.push(text)
  }

  if (translations.length !== expectedCount) return null
  return translations
}

/**
 * Replace each translated attribute value in the locale content using the
 * same regex shape as the existing component-attribute apply path
 * (pipeline.ts:340). Returns the updated content.
 *
 * If a leaf's English value isn't found in the locale content (e.g. because
 * an earlier translation pass already changed it), that leaf is silently
 * skipped -- we don't want to clobber an already-good translation.
 */
export function applyAttributeTranslations(
  localeContent: string,
  leaves: AttributeLeaf[],
  translations: string[]
): { content: string; appliedCount: number; skippedCount: number } {
  let result = localeContent
  let applied = 0
  let skipped = 0

  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i]
    const newValue = translations[i]
    if (!newValue || newValue === leaf.englishValue) {
      // No-op translations (LLM returned the English value) are skipped to
      // avoid logging noise; not counted as failures.
      continue
    }

    // Try double-quoted attr first, then single-quoted. Use HTML entity
    // escaping for any inner quotes that match the surrounding quote style
    // -- otherwise translations that contain quote marks (e.g. quoting an
    // English phrase) break JSX attribute syntax: title="ما هو "X"؟" is
    // invalid; title="ما هو &quot;X&quot;؟" is valid.
    const dqPattern = new RegExp(
      `(${escapeRegex(leaf.attributeName)}=")${escapeRegex(leaf.englishValue)}"`,
      "g"
    )
    if (dqPattern.test(result)) {
      const escaped = newValue.replace(/"/g, "&quot;")
      // Function replacer: the translated value may contain `$` sequences
      // (e.g. "$14"), which a string replacement would misinterpret as
      // capture-group refs ($1 -> group 1). A function replacer is literal.
      result = result.replace(dqPattern, (_m, p1) => `${p1}${escaped}"`)
      applied++
      continue
    }

    const sqPattern = new RegExp(
      `(${escapeRegex(leaf.attributeName)}=')${escapeRegex(leaf.englishValue)}'`,
      "g"
    )
    if (sqPattern.test(result)) {
      const escaped = newValue.replace(/'/g, "&apos;")
      result = result.replace(sqPattern, (_m, p1) => `${p1}${escaped}'`)
      applied++
      continue
    }

    skipped++
  }

  return { content: result, appliedCount: applied, skippedCount: skipped }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Orchestrator: translate a batch of attribute leaves for one locale and
 * write the translations into the locale content.
 *
 * The caller is responsible for choosing which leaves to pass. In practice
 * it passes all leaves from extractAttributeLeaves(); the self-healing
 * filter inside this function drops leaves whose English value no longer
 * appears in the locale (already translated), so re-runs are safe.
 *
 * Returns the updated locale content and counts. If the LLM call fails or
 * returns malformed output, the locale content is returned unchanged and
 * `appliedCount` is 0.
 */
export async function translateJsxAttributes(opts: {
  leaves: AttributeLeaf[]
  localeContent: string
  targetLanguage: string
  glossary: Map<string, string>
  filePath?: string
  /** Override for tests: replace the LLM call entirely. */
  llmOverride?: (prompt: string) => Promise<string>
}): Promise<{
  content: string
  appliedCount: number
  skippedCount: number
  failedCount: number
}> {
  const { leaves, localeContent, targetLanguage, glossary, filePath } = opts

  // Filter leaves to only those whose English value still appears verbatim
  // in the locale file. If the locale already has a translated value, the
  // English string won't match and there's nothing to do for that leaf.
  // This is the self-healing mechanism that makes the pass idempotent: it
  // translates first-time and skips subsequent runs without needing a flag.
  const untranslated = leaves.filter((l) => {
    const dq = new RegExp(
      `${escapeRegex(l.attributeName)}="${escapeRegex(l.englishValue)}"`
    )
    if (dq.test(localeContent)) return true
    const sq = new RegExp(
      `${escapeRegex(l.attributeName)}='${escapeRegex(l.englishValue)}'`
    )
    return sq.test(localeContent)
  })

  if (untranslated.length === 0) {
    return {
      content: localeContent,
      appliedCount: 0,
      skippedCount: 0,
      failedCount: 0,
    }
  }

  const prompt = buildAttributePrompt(untranslated, targetLanguage, glossary)

  let responseText: string
  try {
    if (opts.llmOverride) {
      responseText = await opts.llmOverride(prompt)
    } else {
      // Lazy import to keep this module testable without env-var side effects
      // from config-loading transitive imports.
      const { callGeminiRaw } = await import("./gemini")
      const { text } = await callGeminiRaw(prompt, {
        filePath,
        targetLanguage,
        label: "jsx-attrs",
      })
      responseText = text
    }
  } catch (err) {
    console.warn(
      `[jsx-attrs] LLM call failed for ${targetLanguage}${filePath ? ` ${filePath}` : ""}: ${err instanceof Error ? err.message : String(err)}`
    )
    return {
      content: localeContent,
      appliedCount: 0,
      skippedCount: 0,
      failedCount: untranslated.length,
    }
  }

  const translations = parseAttributeResponse(responseText, untranslated.length)
  if (!translations) {
    console.warn(
      `[jsx-attrs] Malformed LLM response for ${targetLanguage}${filePath ? ` ${filePath}` : ""} (expected ${untranslated.length} lines, got mismatched output); skipping ${untranslated.length} attrs`
    )
    return {
      content: localeContent,
      appliedCount: 0,
      skippedCount: 0,
      failedCount: untranslated.length,
    }
  }

  const { content, appliedCount, skippedCount } = applyAttributeTranslations(
    localeContent,
    untranslated,
    translations
  )

  return { content, appliedCount, skippedCount, failedCount: 0 }
}
