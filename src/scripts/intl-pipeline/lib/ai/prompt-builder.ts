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
  const siteNotes = getSiteSpecificNotes(group)
  const glossarySection = formatGlossary(glossaryTerms)
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
- Frontmatter: translate the values of title, description, and breadcrumb. Translate concept tags but keep brand-name tags in Latin (per site rules above). ${authorRule} Change the \`lang\` field to \`${targetLanguage}\`. Keep all other fields (skill, published, sidebarDepth) unchanged. Preserve YAML structure exactly.
- Preserve all markdown syntax (headings, lists, links) and their indentation exactly.
- Preserve all JSX/HTML components and their attributes exactly.
- Preserve heading anchor IDs exactly as in English ({#anchor-id}).
- HTML comment placeholders like \`<!-- CODE_BLOCK_0 -->\` are code block stand-ins managed by our pipeline. You MUST preserve them EXACTLY as-is -- same text, same position, same line. Do NOT remove, translate, modify, or replace them with code. They will be restored automatically after translation.
- If a true code fence (\`\`\` block) is encountered in the source, never translate the functional code inside it. Only code comments (// or /* */ or #) within fences may be translated. Never change the language identifier after the opening fence (e.g. \`\`\`python, \`\`\`solidity, \`\`\`bash must stay exactly as-is).
- Internal links (href starting with /) must match English exactly.
- Image paths must match English exactly.`
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
- Frontmatter: translate the values of title, description, and breadcrumb. Translate concept tags but keep brand-name tags in Latin (per site rules above). ${authorRule} Change the \`lang\` field to \`${targetLanguage}\`. Keep all other fields (skill, published, sidebarDepth) unchanged. Preserve YAML structure exactly.
- Preserve heading anchor IDs exactly as in English ({#anchor-id}).
- Preserve all markdown formatting (headings, lists, bold, italic, blockquotes) and their indentation exactly.

PLACEHOLDER RULES (critical):
This content has been pre-processed. Non-translatable elements have been replaced with placeholder tags. You MUST follow these rules:

1. SELF-CLOSING placeholders -- preserve exactly, do not modify or translate:
   <HTML-PLACEHOLDER-CODEBLOCK-****** /> = code block (will be restored)
   <HTML-PLACEHOLDER-CODE-****** /> = inline code (will be restored)
   <HTML-PLACEHOLDER-IMAGE-****** /> = image (will be restored)
   <HTML-PLACEHOLDER-COMPONENT-****** /> = childless JSX component (will be restored)

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

function formatGlossary(terms: Map<string, string>): string {
  if (terms.size === 0) return ""

  const lines = Array.from(terms.entries())
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
- No translated heading anchor IDs
- No broken markdown link syntax
- Valid JSON structure (for JSON files)
Getting these right the first time avoids post-processing corrections.`
}
