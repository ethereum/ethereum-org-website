/**
 * Build translation prompts for Gemini direct translation.
 *
 * Philosophy: Gemini is the language expert. We provide:
 * 1. Site-specific context (glossary, conventions)
 * 2. Structural expectations (frontmatter, markdown)
 * 3. Lightweight guardrails (what our sanitizer checks for)
 *
 * We do NOT micromanage linguistics -- Gemini knows RTL, BiDi,
 * transliteration norms, etc. better than any regex.
 */

import { getLanguageGroup, getSiteSpecificNotes } from "./language-groups"

interface PromptOptions {
  filePath: string
  fileContent: string
  fileType: "markdown" | "json"
  targetLanguage: string
  languageName: string
  glossaryTerms: Map<string, string>
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
  } = options

  const group = getLanguageGroup(targetLanguage)
  const siteNotes = getSiteSpecificNotes(group)
  const glossarySection = formatGlossary(glossaryTerms)
  const formatRules = getFormatRules(fileType)
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

function getFormatRules(fileType: "markdown" | "json"): string {
  if (fileType === "json") {
    return `Format rules:
- Output valid JSON with identical key structure.
- Translate only string values. Never translate keys.
- Preserve HTML tags within values exactly (<a href="...">, <strong>, etc.).
- Preserve interpolation variables exactly ({count}, {{name}}, etc.).
- Internal href paths (/developers/docs/...) must stay in English.`
  }

  return `Format rules:
- Preserve all frontmatter fields and structure exactly.
- Preserve all markdown syntax (headings, lists, links, code blocks).
- Preserve all JSX/HTML components and their attributes exactly.
- Preserve heading anchor IDs exactly as in English ({#anchor-id}).
- Never translate content inside code fences (\`\`\` blocks).
- Code comments inside code fences may be translated.
- Internal links (href starting with /) must match English exactly.
- Image paths must match English exactly.`
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
