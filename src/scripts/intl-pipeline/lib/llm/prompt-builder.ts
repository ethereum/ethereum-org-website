/**
 * Build translation prompts for Gemini translation.
 *
 * Philosophy: Gemini is the language expert. We provide:
 * 1. Site-specific context (glossary, conventions)
 * 2. Structural expectations (frontmatter, markdown)
 * 3. Lightweight guardrails (what our sanitizer checks for)
 *
 * We do NOT micromanage linguistics -- Gemini knows RTL, BiDi,
 * transliteration norms, etc. better than any regex.
 */

import {
  getLanguageGroup,
  getSiteSpecificNotes,
  type LanguageGroup,
} from "./language-groups"

/**
 * Fetch ETHGlossary terms that appear anywhere in `fileContent` for `locale`.
 * Returns Map<english, translation>, notes appended in parentheses. Network
 * failure returns an empty map: a run without glossary beats no run.
 */
export async function loadGlossary(
  fileContent: string,
  fileType: "markdown" | "json",
  locale: string,
  apiUrl: string
): Promise<FileGlossary> {
  try {
    // Without fileType, /filter reads JSON as markdown and matches its keys
    const res = await fetch(`${apiUrl}/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: fileContent,
        language: locale,
        fileType,
      }),
    })
    if (!res.ok) {
      console.warn(
        `[glossary] API returned ${res.status} for ${locale}, continuing without glossary`
      )
      return new FileGlossary()
    }
    const data = (await res.json()) as {
      terms: Array<{
        english: string
        translation: string
        note?: string
        occurrences?: number
      }>
    }
    // Sanitize all glossary fields to prevent prompt injection
    // eslint-disable-next-line no-control-regex
    const controlCharRe = new RegExp("[\\u0000-\\u001f]", "g")
    const sanitize = (s: string, maxLen: number) =>
      s.replace(controlCharRe, "").replace(/\n/g, " ").slice(0, maxLen)

    const map = new FileGlossary()
    const occurrences = new Map<string, number>()
    for (const term of data.terms) {
      const safeEnglish = sanitize(term.english, 200)
      const safeTranslation = sanitize(term.translation, 500)
      const safeNote = term.note ? sanitize(term.note, 200) : ""
      const value = safeNote
        ? `${safeTranslation} (${safeNote})`
        : safeTranslation
      map.set(safeEnglish, value)
      occurrences.set(safeEnglish, term.occurrences ?? 0)
    }
    return map.attribute(fileContent, fileType, occurrences)
  } catch (err) {
    console.warn(
      `[glossary] Failed to fetch for ${locale}: ${err instanceof Error ? err.message : String(err)}`
    )
    return new FileGlossary()
  }
}

/**
 * ETHGlossary terms for one file+locale. `/filter` also matches aliases
 * ("ZK-rollups" -> "zero-knowledge rollup") that local forms cannot place; a
 * term it counted more often than local forms do rides in every prompt.
 */
export class FileGlossary extends Map<string, string> {
  readonly unattributed = new Set<string>()

  attribute(
    fileContent: string,
    fileType: "markdown" | "json",
    occurrences = new Map<string, number>()
  ) {
    const haystack = matchForms(countableText(fileContent, fileType))
    for (const en of this.keys()) {
      const local = localCount(en, haystack)
      if (local === 0 || local < (occurrences.get(en) ?? 0)) {
        this.unattributed.add(en)
      }
    }
    return this
  }
}

/** The text /filter scans (ETHGlossary extractSourceText) */
function countableText(content: string, fileType: "markdown" | "json"): string {
  if (fileType === "json") {
    try {
      const parsed: unknown = JSON.parse(content)
      if (parsed && typeof parsed === "object") {
        return Object.values(parsed)
          .filter((v) => typeof v === "string")
          .join(" ")
      }
    } catch {
      return content
    }
  }
  return content
    .replace(/^---[\s\S]*?---\n?/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\{#[^}]+\}/g, "")
}

const stemWords = (t: string) =>
  t
    .replace(/\b([a-z]{2,})ies\b/g, "$1y")
    .replace(/\b([a-z]{3,}?)(?:ing|ed|es|s|e)\b/g, "$1")

/** Spaced, separator-free and stemmed lower-case forms of `text` */
function matchForms(text: string): string[] {
  const spaced = text.toLowerCase().replace(/[-\s]+/g, " ")
  return [spaced, spaced.replace(/ /g, ""), stemWords(spaced)]
}

/** A "long form (ABBR)" entry's two parts, or the entry itself */
function termForms(en: string): string[][] {
  const parts = en
    .split(/\s*\(([^)]*)\)\s*/)
    .map((f) => f.trim())
    .filter(Boolean)
  return parts.map(matchForms)
}

function termMatches(en: string, haystack: string[]): boolean {
  return termForms(en).some((needles) =>
    needles.some((needle, i) => haystack[i].includes(needle))
  )
}

/** Mentions local forms find in `haystack`, by the most generous variant */
function localCount(en: string, haystack: string[]): number {
  const forms = termForms(en)
  return Math.max(
    ...haystack.map((hay, i) =>
      forms.reduce((sum, needles) => sum + hay.split(needles[i]).length - 1, 0)
    )
  )
}

/** The glossary terms `text` uses, plus any its file could not attribute */
export function relevantGlossary(
  terms: Map<string, string>,
  text: string
): Map<string, string> {
  const haystack = matchForms(countableText(text, "markdown"))
  const unattributed =
    terms instanceof FileGlossary ? terms.unattributed : new Set<string>()
  const relevant = new Map<string, string>()
  for (const [en, translated] of terms) {
    if (unattributed.has(en) || termMatches(en, haystack)) {
      relevant.set(en, translated)
    }
  }
  return relevant
}

interface PromptOptions {
  filePath: string
  fileContent: string
  fileType: "markdown" | "json"
  targetLanguage: string
  languageName: string
  glossaryTerms: Map<string, string>
  /** When true, HTML tags have been replaced with <!-- HTML_N --> placeholders */
  htmlExtracted?: boolean
  /** When true, content has been normalized with HTML-PLACEHOLDER tags */
  normalized?: boolean
}

/**
 * Build the prompt for the separate code-comment pass.
 *
 * Comments are the one translatable thing inside a code fence, and both
 * translation paths send them in their own small call rather than exposing the
 * fence body. Shared so the planner can render the real prompt it is about to
 * pay for instead of estimating it.
 */
export function buildCommentPrompt(options: {
  comments: string[]
  languageName: string
  glossaryTerms: Map<string, string>
}): string {
  const { comments, languageName, glossaryTerms } = options

  const payload: Record<string, string> = {}
  comments.forEach((text, i) => {
    payload[`c${i}`] = text
  })

  const glossaryLines: string[] = []
  relevantGlossary(glossaryTerms, comments.join("\n")).forEach((loc, en) =>
    glossaryLines.push(`  ${en} = ${loc}`)
  )
  const glossaryHint =
    glossaryLines.length > 0
      ? `\nUse these exact translations for glossary terms:\n${glossaryLines.slice(0, 30).join("\n")}`
      : ""

  return `Translate these code comments to ${languageName}. Return ONLY a JSON object with the same keys and translated values. Do not add explanations.${glossaryHint}

${JSON.stringify(payload, null, 2)}`
}

/**
 * Build the complete translation prompt for a single file.
 */
export function buildTranslationPrompt(options: PromptOptions): string {
  const {
    filePath,
    fileContent,
    fileType,
    targetLanguage,
    languageName,
    glossaryTerms,
    htmlExtracted,
    normalized,
  } = options

  const group = getLanguageGroup(targetLanguage)
  const siteNotes = getSiteSpecificNotes(group, fileType, targetLanguage)
  const glossarySection = formatGlossary(glossaryTerms, fileContent)
  const formatRules = normalized
    ? getNormalizedFormatRules(fileType, group, targetLanguage)
    : getFormatRules(fileType, group, targetLanguage, htmlExtracted)
  const sanitizerHints = getSanitizerHints()

  return `Translate this ${fileType} file from English to ${languageName} (${targetLanguage}).

File: ${filePath}

${formatRules}

${siteNotes}

${glossarySection}

${sanitizerHints}

=== SOURCE FILE ===
${fileContent}
=== END SOURCE FILE ===

Output ONLY the translated file content. No explanations, no markdown wrapping, no commentary.`
}

function getFormatRules(
  fileType: "markdown" | "json",
  group: LanguageGroup,
  targetLanguage: string,
  htmlExtracted?: boolean
): string {
  if (fileType === "json") {
    const htmlRule = htmlExtracted
      ? `- Some HTML tags have been replaced with placeholder tags:
  - Self-closing: \`<HTML-PLACEHOLDER-HTMLTAG-****** />\` -- preserve exactly, do not modify.
  - Wrapper: \`<HTML-PLACEHOLDER-HTMLTAG-******>text</HTML-PLACEHOLDER-HTMLTAG-******>\` -- translate the text between tags, keep the tags themselves. You may reorder wrapper pairs to match natural ${targetLanguage} word order.
  - Simple formatting tags (<strong>, <em>, etc.) are NOT placeholders -- preserve them around your translated text.
  - NEVER translate, modify, or remove placeholder tags. Every placeholder must appear exactly once in the output.`
      : `- Preserve HTML tags within values exactly (<a href="...">, <strong>, etc.).`

    return `Format rules:
- Output valid JSON with identical key structure.
- Translate only string values. Never translate keys.
${htmlRule}
- Preserve interpolation variables exactly ({count}, {{name}}, etc.).
- Internal href paths (/developers/docs/...) must stay in English.`
  }

  // Author handling differs by script family
  const authorRule =
    group === "latin"
      ? "Keep the author field unchanged."
      : "Transliterate the author field into the target script (phonetic, not semantic). Pseudonyms or GitHub handles (e.g., qbzzt, jdourlens) must stay in Latin."

  return `Format rules:
- Frontmatter -- per-field policy:
  TRANSLATE the values of: title, description, breadcrumb.
  TRANSLATE concept tags inside \`tags:\` arrays, but keep brand-name tags in Latin (per site rules above).
  KEEP UNCHANGED (must match the English value byte-for-byte): topic, uploadDate, duration, educationLevel, youtubeId, format, skill, published, sidebarDepth, template, sidebar, source, sourceUrl, address, emoji, image, blurDataURL. \`topic\` is a taxonomy-slug array -- never translate, transliterate, or reformat its values.
  ${authorRule}
  Set the \`lang\` field to \`${targetLanguage}\`.
  Preserve YAML structure exactly. NEVER use \`<span dir="ltr">\` inside any frontmatter value -- the inner double-quote on the dir attribute breaks YAML. For LTR fragments inside frontmatter values use Unicode bidi isolates U+2066 (LRI) and U+2069 (PDI) instead.
- Preserve all markdown syntax (headings, lists, links) and their indentation exactly.
- Preserve all JSX/HTML components and their attributes exactly.
- HTML comment placeholders like \`<!-- CODE_BLOCK_0 -->\` are code block stand-ins managed by our pipeline. You MUST preserve them EXACTLY as-is -- same text, same position, same line. Do NOT remove, translate, modify, or replace them with code. They will be restored automatically after translation.
- If a true code fence (\`\`\` block) is encountered in the source, never translate the functional code inside it. Only code comments (// or /* */ or #) within fences may be translated. Never change the language identifier after the opening fence (e.g. \`\`\`python, \`\`\`solidity, \`\`\`bash must stay exactly as-is).
- Internal links (href starting with /) must match English exactly.
- Image paths must match English exactly.
- Never translate the English word "or" when it appears as a substring inside a larger word, a URL, a domain, or an identifier (for example inside "tutorial", "uniform", "information", or the ".org" in "ethers.org"). Only translate "or" when it stands alone as a separate English word.`
}

/**
 * Format rules for content that has been pre-processed by the normalizer.
 *
 * The normalizer has already:
 * - Replaced code blocks with <HTML-PLACEHOLDER-CODEBLOCK-hash />
 * - Replaced inline code with <HTML-PLACEHOLDER-CODE-hash />
 * - Replaced images with <HTML-PLACEHOLDER-IMAGE-hash />
 * - Wrapped link text: <HTML-PLACEHOLDER-LINK-hash>text</HTML-PLACEHOLDER-LINK-hash>
 * - Wrapped HTML tag text: <HTML-PLACEHOLDER-HTMLTAG-hash>text</HTML-PLACEHOLDER-HTMLTAG-hash>
 * - Replaced JSX components with <HTML-PLACEHOLDER-COMPONENT-hash />
 *
 * Gemini only needs to translate the visible prose and wrapper-tag contents.
 */
function getNormalizedFormatRules(
  fileType: "markdown" | "json",
  group: LanguageGroup,
  targetLanguage: string
): string {
  if (fileType === "json") {
    // JSON normalization is not yet implemented; fall back
    return getFormatRules(fileType, group, targetLanguage, false)
  }

  const authorRule =
    group === "latin"
      ? "Keep the author field unchanged."
      : "Transliterate the author field into the target script (phonetic, not semantic). Pseudonyms or GitHub handles (e.g., qbzzt, jdourlens) must stay in Latin."

  return `Format rules:
- Frontmatter -- per-field policy:
  TRANSLATE the values of: title, description, breadcrumb.
  TRANSLATE concept tags inside \`tags:\` arrays, but keep brand-name tags in Latin (per site rules above).
  KEEP UNCHANGED (must match the English value byte-for-byte): topic, uploadDate, duration, educationLevel, youtubeId, format, skill, published, sidebarDepth, template, sidebar, source, sourceUrl, address, emoji, image, blurDataURL. \`topic\` is a taxonomy-slug array -- never translate, transliterate, or reformat its values.
  ${authorRule}
  Set the \`lang\` field to \`${targetLanguage}\`.
  Preserve YAML structure exactly. NEVER use \`<span dir="ltr">\` inside any frontmatter value -- the inner double-quote on the dir attribute breaks YAML. For LTR fragments inside frontmatter values use Unicode bidi isolates U+2066 (LRI) and U+2069 (PDI) instead.
- Preserve all markdown formatting (headings, lists, bold, italic, blockquotes) and their indentation exactly.

PLACEHOLDER RULES (critical):
This content has been pre-processed. Non-translatable elements have been replaced with placeholder tags. You MUST follow these rules:

1. SELF-CLOSING placeholders -- preserve exactly, do not modify or translate:
   <HTML-PLACEHOLDER-CODEBLOCK-****** /> = code block (will be restored)
   <HTML-PLACEHOLDER-CODE-****** /> = inline code (will be restored)
   <HTML-PLACEHOLDER-IMAGE-****** /> = image (will be restored)
   <HTML-PLACEHOLDER-COMPONENT-****** /> = childless JSX component (will be restored)
   <HTML-PLACEHOLDER-HTMLTAG-****** /> = self-closing HTML element (will be restored)

2. WRAPPER placeholders -- translate the text BETWEEN the tags, keep the tags themselves:
   <HTML-PLACEHOLDER-CODEBLOCK-******>translate this text</HTML-PLACEHOLDER-CODEBLOCK-******> = markdown/text fence (translate the prose inside)
   <HTML-PLACEHOLDER-LINK-******>translate this text</HTML-PLACEHOLDER-LINK-******>
   <HTML-PLACEHOLDER-HTMLTAG-******>translate this text</HTML-PLACEHOLDER-HTMLTAG-******>
   <HTML-PLACEHOLDER-COMPONENT-******>translate this text</HTML-PLACEHOLDER-COMPONENT-******>
   You MAY reorder wrapper placeholders within a sentence to match natural ${targetLanguage} word order.
   Do NOT split a wrapper pair or nest them differently.

3. NEVER translate, modify, or remove any placeholder tag. Every placeholder in the source must appear exactly once in the output.
4. NEVER invent new placeholder tags.
5. The text between wrapper tags is the only translatable content associated with that placeholder.`
}

/** Glossary block for a prompt, limited to the terms `sourceText` uses */
export function formatGlossary(
  terms: Map<string, string>,
  sourceText: string
): string {
  const relevant = relevantGlossary(terms, sourceText)
  if (relevant.size === 0) return ""

  const lines = Array.from(relevant.entries())
    .map(([en, translated]) => `- "${en}" -> "${translated}"`)
    .join("\n")

  return `Community-voted glossary (use these exact translations):
${lines}`
}

/**
 * Hints about what our post-processing sanitizer checks for.
 * This helps Gemini avoid patterns we'd just fix afterward.
 */
function getSanitizerHints(): string {
  return `Our automated sanitizer will check your output for:
- Brand names in frontmatter tags must stay Latin (Solidity, MetaMask, etc.)
- Ticker symbols (ETH, ERC-20) must stay Latin
- Internal hrefs must match English source exactly
- No broken markdown link syntax
- Valid JSON structure (for JSON files)
Getting these right the first time avoids post-processing corrections.`
}
