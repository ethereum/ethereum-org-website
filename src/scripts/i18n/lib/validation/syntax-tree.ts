// Syntax tree validation for JSON and Markdown files

interface JsonValidationResult {
  isValid: boolean
  expectedKeyCount: number
  actualKeyCount: number
  missingKeys: string[]
  extraKeys: string[]
  orderMatches: boolean
}

interface MarkdownValidationResult {
  isValid: boolean
  expectedHeadingCount: number
  actualHeadingCount: number
  mismatchedHeadings: Array<{
    level: number
    expectedId: string
    actualId: string | null
    line: number
  }>
}

/**
 * Extract JSON keys in order from a JSON string
 */
function extractJsonKeys(jsonContent: string): string[] {
  try {
    const obj = JSON.parse(jsonContent)
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
      return []
    }
    return Object.keys(obj)
  } catch {
    return []
  }
}

/**
 * Validate JSON file structure against English source
 */
export function validateJsonStructure(
  englishContent: string,
  translatedContent: string
): JsonValidationResult {
  const englishKeys = extractJsonKeys(englishContent)
  const translatedKeys = extractJsonKeys(translatedContent)

  const englishKeySet = new Set(englishKeys)
  const translatedKeySet = new Set(translatedKeys)

  const missingKeys = englishKeys.filter((key) => !translatedKeySet.has(key))
  const extraKeys = translatedKeys.filter((key) => !englishKeySet.has(key))

  const orderMatches =
    JSON.stringify(englishKeys) === JSON.stringify(translatedKeys)

  return {
    isValid: missingKeys.length === 0 && extraKeys.length === 0,
    expectedKeyCount: englishKeys.length,
    actualKeyCount: translatedKeys.length,
    missingKeys,
    extraKeys,
    orderMatches,
  }
}

/**
 * Extract markdown headings with their custom IDs
 */
function extractMarkdownHeadings(
  content: string
): Array<{ level: number; id: string | null; line: number }> {
  const lines = content.split("\n")
  const headings: Array<{ level: number; id: string | null; line: number }> = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)

    if (headingMatch) {
      const level = headingMatch[1].length
      const headingText = headingMatch[2]

      // Extract custom ID if present (e.g., "Heading text {#custom-id}")
      const idMatch = headingText.match(/\{#([^}]+)\}\s*$/)
      const customId = idMatch ? idMatch[1] : null

      headings.push({
        level,
        id: customId,
        line: i + 1,
      })
    }
  }

  return headings
}

/**
 * Validate markdown heading structure against English source
 */
export function validateMarkdownStructure(
  englishContent: string,
  translatedContent: string
): MarkdownValidationResult {
  const englishHeadings = extractMarkdownHeadings(englishContent)
  const translatedHeadings = extractMarkdownHeadings(translatedContent)

  const mismatchedHeadings: Array<{
    level: number
    expectedId: string
    actualId: string | null
    line: number
  }> = []

  // Check if heading counts match
  if (englishHeadings.length !== translatedHeadings.length) {
    return {
      isValid: false,
      expectedHeadingCount: englishHeadings.length,
      actualHeadingCount: translatedHeadings.length,
      mismatchedHeadings: [],
    }
  }

  // Compare each heading
  for (let i = 0; i < englishHeadings.length; i++) {
    const englishHeading = englishHeadings[i]
    const translatedHeading = translatedHeadings[i]

    // Check if level matches
    if (englishHeading.level !== translatedHeading.level) {
      mismatchedHeadings.push({
        level: translatedHeading.level,
        expectedId: englishHeading.id || "(no id)",
        actualId: translatedHeading.id,
        line: translatedHeading.line,
      })
      continue
    }

    // Check if custom IDs match (if present in English)
    if (englishHeading.id && englishHeading.id !== translatedHeading.id) {
      mismatchedHeadings.push({
        level: translatedHeading.level,
        expectedId: englishHeading.id,
        actualId: translatedHeading.id,
        line: translatedHeading.line,
      })
    }
  }

  return {
    isValid: mismatchedHeadings.length === 0,
    expectedHeadingCount: englishHeadings.length,
    actualHeadingCount: translatedHeadings.length,
    mismatchedHeadings,
  }
}

/**
 * Format validation results into a markdown comment
 */
export function formatValidationComment(
  validationResults: Array<{
    path: string
    type: "json" | "markdown"
    result: JsonValidationResult | MarkdownValidationResult
  }>
): string | null {
  const issues = validationResults.filter((v) => !v.result.isValid)

  if (issues.length === 0) {
    return null
  }

  let comment = "## ⚠️ Syntax Tree Validation Issues\n\n"
  comment +=
    "The following files have structural differences from their English source:\n\n"

  for (const issue of issues) {
    comment += `### \`${issue.path}\`\n\n`

    if (issue.type === "json") {
      const result = issue.result as JsonValidationResult
      comment += `**JSON Structure Issues:**\n`
      comment += `- Expected keys: ${result.expectedKeyCount}\n`
      comment += `- Actual keys: ${result.actualKeyCount}\n`

      if (result.missingKeys.length > 0) {
        comment += `- Missing keys: ${result.missingKeys.map((k) => `\`${k}\``).join(", ")}\n`
      }

      if (result.extraKeys.length > 0) {
        comment += `- Extra keys: ${result.extraKeys.map((k) => `\`${k}\``).join(", ")}\n`
      }

      if (
        !result.orderMatches &&
        result.missingKeys.length === 0 &&
        result.extraKeys.length === 0
      ) {
        comment += `- ⚠️ Key order differs from English version\n`
      }
    } else {
      const result = issue.result as MarkdownValidationResult
      comment += `**Markdown Structure Issues:**\n`
      comment += `- Expected headings: ${result.expectedHeadingCount}\n`
      comment += `- Actual headings: ${result.actualHeadingCount}\n`

      if (result.mismatchedHeadings.length > 0) {
        comment += `\n**Mismatched Headings:**\n`
        for (const mismatch of result.mismatchedHeadings) {
          comment += `- Line ${mismatch.line}: Expected ID \`${mismatch.expectedId}\`, found \`${mismatch.actualId || "(none)"}\`\n`
        }
      }
    }

    comment += `\n`
  }

  comment += `\n---\n`
  comment += `*This validation check ensures translated files maintain the same structure as the English source.*`

  return comment
}
