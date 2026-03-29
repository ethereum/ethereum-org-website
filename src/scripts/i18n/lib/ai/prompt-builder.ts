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
  } = options

  const group = getLanguageGroup(targetLanguage)
  const siteNotes = getSiteSpecificNotes(group)
  const glossarySection = formatGlossary(glossaryTerms)
  const formatRules = getFormatRules(fileType, group, targetLanguage, htmlExtracted)
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
      ? `- \`<!-- HTML_N -->\` placeholders are stand-ins for HTML tags managed by our pipeline. You MUST preserve them EXACTLY as-is -- same text, same position, same numbering. Do NOT remove, translate, modify, or renumber them. They will be restored to HTML tags automatically after translation.`
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
