// Syntax tree validation for JSON and Markdown files

export interface JsonValidationResult {
  isValid: boolean
  expectedKeyCount: number
  actualKeyCount: number
  missingKeys: string[]
  extraKeys: string[]
  orderMatches: boolean
}

export interface MarkdownValidationResult {
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

export interface JsxAttributeValidationResult {
  isValid: boolean
  untranslatedCount: number
  totalCount: number
  untranslatedPercentage: number
  untranslatedAttributes: Array<{
    attributeName: string
    componentName: string
    value: string
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

/** Attributes that should be translated */
const TRANSLATABLE_ATTRIBUTES = [
  "title",
  "description",
  "alt",
  "label",
  "aria-label",
  "placeholder",
  "buttonLabel",
  "text",
  "name",
  "caption",
  "contentPreview",
  "location",
]

/** JSX component regex for validation */
const JSX_COMPONENT_REGEX = /<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)(?:\/>|>)/g

/** Attribute regex for validation */
const ATTRIBUTE_REGEX =
  /\b([a-zA-Z][\w-]*)\s*=\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g

/**
 * Check if text appears to be English (heuristic)
 */
function looksLikeEnglish(value: string): boolean {
  if (!value || value.length < 3) return false
  if (/^https?:\/\//.test(value)) return false
  if (/^[/.]/.test(value) || /\.(png|jpg|svg|gif|json|md)$/i.test(value))
    return false
  if (/^\{.*\}$/.test(value)) return false
  if (/^[a-z][a-zA-Z0-9-]*$/.test(value) && !value.includes(" ")) return false
  if (/^[\p{Emoji}\s]+$/u.test(value)) return false
  if (/^[\d.,\s%$€£]+$/.test(value)) return false

  // Check for common English patterns
  if (value.includes(" ")) return true
  if (/^[A-Z][a-z]+(?:ing|ed|er|est|ly|tion|ness)?$/.test(value)) return true

  return false
}

/**
 * Validate JSX attributes for potential untranslated English content
 */
export function validateJsxAttributes(
  content: string,
  threshold = 5
): JsxAttributeValidationResult {
  const untranslatedAttributes: JsxAttributeValidationResult["untranslatedAttributes"] =
    []
  let totalCount = 0

  const lines = content.split("\n")
  let currentLine = 0
  let currentPos = 0

  let componentMatch: RegExpExecArray | null
  JSX_COMPONENT_REGEX.lastIndex = 0

  while ((componentMatch = JSX_COMPONENT_REGEX.exec(content)) !== null) {
    const componentName = componentMatch[1]
    const attributeString = componentMatch[2]
    const componentStartPos = componentMatch.index

    // Calculate line number
    while (currentPos < componentStartPos && currentLine < lines.length) {
      currentPos += lines[currentLine].length + 1
      currentLine++
    }
    const componentLine = currentLine + 1

    let attrMatch: RegExpExecArray | null
    ATTRIBUTE_REGEX.lastIndex = 0

    while ((attrMatch = ATTRIBUTE_REGEX.exec(attributeString)) !== null) {
      const attrName = attrMatch[1]
      const attrValue = attrMatch[2] || attrMatch[3]

      if (!TRANSLATABLE_ATTRIBUTES.includes(attrName)) continue

      totalCount++

      if (looksLikeEnglish(attrValue)) {
        untranslatedAttributes.push({
          attributeName: attrName,
          componentName,
          value: attrValue,
          line: componentLine,
        })
      }
    }
  }

  const untranslatedPercentage =
    totalCount > 0 ? (untranslatedAttributes.length / totalCount) * 100 : 0

  return {
    isValid: untranslatedPercentage <= threshold,
    untranslatedCount: untranslatedAttributes.length,
    totalCount,
    untranslatedPercentage,
    untranslatedAttributes,
  }
}

/**
 * Format validation results into a markdown comment
 */
export function formatValidationComment(
  validationResults: Array<{
    path: string
    type: "json" | "markdown" | "jsx-attributes"
    result:
      | JsonValidationResult
      | MarkdownValidationResult
      | JsxAttributeValidationResult
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
    } else if (issue.type === "markdown") {
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
    } else if (issue.type === "jsx-attributes") {
      const result = issue.result as JsxAttributeValidationResult
      comment += `**Potentially Untranslated JSX Attributes:**\n`
      comment += `- Untranslated: ${result.untranslatedCount} / ${result.totalCount} (${result.untranslatedPercentage.toFixed(1)}%)\n`

      if (result.untranslatedAttributes.length > 0) {
        comment += `\n**Attributes that may need translation:**\n`
        // Show up to 10 examples
        const examples = result.untranslatedAttributes.slice(0, 10)
        for (const attr of examples) {
          const truncatedValue =
            attr.value.length > 50
              ? attr.value.slice(0, 47) + "..."
              : attr.value
          comment += `- Line ${attr.line}: \`<${attr.componentName} ${attr.attributeName}="${truncatedValue}">\`\n`
        }
        if (result.untranslatedAttributes.length > 10) {
          comment += `- ... and ${result.untranslatedAttributes.length - 10} more\n`
        }
      }
    }

    comment += `\n`
  }

  comment += `\n---\n`
  comment += `*This validation check ensures translated files maintain the same structure as the English source.*`

  return comment
}
