/**
 * Pre-commit validation for Gemini translation output.
 * Catches structural issues before committing to GitHub.
 */

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validate translated JSON output.
 */
export function validateTranslatedJson(
  translated: string,
  english: string
): ValidationResult {
  const base = validateCommon(translated)
  if (!base.valid) return base

  let parsedTranslated: Record<string, unknown>
  try {
    parsedTranslated = JSON.parse(translated)
  } catch {
    return { valid: false, error: "Invalid JSON output" }
  }

  let parsedEnglish: Record<string, unknown>
  try {
    parsedEnglish = JSON.parse(english)
  } catch {
    // If English doesn't parse, skip key comparison
    return { valid: true }
  }

  const translatedKeys = Object.keys(parsedTranslated).sort()
  const englishKeys = Object.keys(parsedEnglish).sort()

  if (translatedKeys.length !== englishKeys.length) {
    return {
      valid: false,
      error: `Key count mismatch: got ${translatedKeys.length}, expected ${englishKeys.length}`,
    }
  }

  // Check for missing keys
  const missing = englishKeys.filter((k) => !translatedKeys.includes(k))
  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing keys: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? "..." : ""}`,
    }
  }

  return { valid: true }
}

/**
 * Validate translated markdown output.
 */
export function validateTranslatedMarkdown(
  translated: string,
  english: string
): ValidationResult {
  const base = validateCommon(translated)
  if (!base.valid) return base

  // Frontmatter must exist if English has it
  if (english.startsWith("---") && !translated.startsWith("---")) {
    return { valid: false, error: "Missing frontmatter" }
  }

  // Check frontmatter closes
  if (translated.startsWith("---")) {
    const secondDash = translated.indexOf("---", 4)
    if (secondDash === -1) {
      return { valid: false, error: "Unclosed frontmatter" }
    }
  }

  // Suspiciously short (truncated output)
  if (translated.length < english.length * 0.3) {
    return {
      valid: false,
      error: `Suspiciously short: ${translated.length} chars vs ${english.length} English chars`,
    }
  }

  // Frontmatter title/description should be translated, not left in English
  const untranslatedFm = checkFrontmatterTranslated(translated, english)
  if (untranslatedFm) {
    return { valid: false, error: untranslatedFm }
  }

  // Code block placeholders must survive translation intact.
  // The pipeline extracts code blocks before sending to Gemini and restores
  // them afterward. If Gemini drops or corrupts a placeholder, the code
  // block is lost and Gemini may hallucinate replacement code.
  const expectedPlaceholders = english.match(/<!-- CODE_BLOCK_\d+ -->/g) || []
  for (const placeholder of expectedPlaceholders) {
    if (!translated.includes(placeholder)) {
      return {
        valid: false,
        error: `Missing code block placeholder: ${placeholder}`,
      }
    }
  }

  // Gemini must not introduce code fences -- all code was extracted
  if (expectedPlaceholders.length > 0) {
    const fenceCount = (translated.match(/^```/gm) || []).length
    if (fenceCount > 0) {
      return {
        valid: false,
        error: `Output contains ${fenceCount} code fences but code blocks were extracted -- Gemini is hallucinating code`,
      }
    }
  }

  return { valid: true }
}

/**
 * Common validation checks.
 */
function validateCommon(translated: string): ValidationResult {
  if (!translated.trim()) {
    return { valid: false, error: "Empty output" }
  }

  // Gemini refusal patterns -- check first line
  const startRefusals = [
    /^I cannot/i,
    /^I'm sorry/i,
    /^As an AI/i,
    /^I apologize/i,
    /^Sorry,/i,
    /^I'm unable/i,
  ]
  const firstLine = translated.trim().split("\n")[0]
  for (const re of startRefusals) {
    if (re.test(firstLine)) {
      return {
        valid: false,
        error: `Gemini refusal: "${firstLine.slice(0, 60)}"`,
      }
    }
  }

  // Mid-content refusal scan -- check full output for refusals embedded in translation
  const midRefusals = [
    /\nI cannot translate/i,
    /\nI'm sorry,? (?:but )?I/i,
    /\nAs an AI,? I/i,
    /\nI'm unable to translate/i,
    /\nI cannot provide/i,
    /\nThis (?:section|content) (?:cannot|could not) be translated/i,
  ]
  for (const re of midRefusals) {
    const match = re.exec(translated)
    if (match) {
      const snippet = translated.slice(
        Math.max(0, match.index),
        match.index + 80
      )
      return {
        valid: false,
        error: `Mid-content refusal detected: "${snippet.trim()}"`,
      }
    }
  }

  return { valid: true }
}

/**
 * Extract a frontmatter field value from raw markdown.
 * Returns undefined if the field is not found.
 */
function extractFrontmatterField(
  content: string,
  field: string
): string | undefined {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return undefined
  const re = new RegExp(`^${field}:\\s*"?(.+?)"?\\s*$`, "m")
  const match = fmMatch[1].match(re)
  return match?.[1]
}

/**
 * Check that key frontmatter fields (title, description) were actually
 * translated and not left identical to the English source.
 *
 * Only fails if BOTH title and description are identical to English.
 * Technical titles (e.g., "Ethash", "JSON-RPC API", "PeerDAS") are
 * legitimately kept in English, so a matching title alone is not a
 * failure -- as long as the description was translated.
 *
 * Returns an error string if untranslated, or undefined if OK.
 */
function checkFrontmatterTranslated(
  translated: string,
  english: string
): string | undefined {
  const enTitle = extractFrontmatterField(english, "title")
  const trTitle = extractFrontmatterField(translated, "title")
  const titleMatch = enTitle && trTitle && enTitle === trTitle

  const enDesc = extractFrontmatterField(english, "description")
  const trDesc = extractFrontmatterField(translated, "description")
  const descMatch = enDesc && trDesc && enDesc === trDesc

  if (titleMatch && descMatch) {
    return `Frontmatter "title" and "description" were both not translated (identical to English)`
  }

  return undefined
}
