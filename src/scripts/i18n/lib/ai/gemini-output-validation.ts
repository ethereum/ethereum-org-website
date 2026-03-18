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

  return { valid: true }
}

/**
 * Common validation checks.
 */
function validateCommon(translated: string): ValidationResult {
  if (!translated.trim()) {
    return { valid: false, error: "Empty output" }
  }

  // Gemini refusal patterns
  const refusals = [
    /^I cannot/i,
    /^I'm sorry/i,
    /^As an AI/i,
    /^I apologize/i,
    /^Sorry,/i,
    /^I'm unable/i,
  ]
  const firstLine = translated.trim().split("\n")[0]
  for (const re of refusals) {
    if (re.test(firstLine)) {
      return { valid: false, error: `Gemini refusal: "${firstLine.slice(0, 60)}"` }
    }
  }

  return { valid: true }
}
