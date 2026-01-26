/**
 * MDX v1 → v2 Preprocessing
 *
 * Transforms MDX v1 content to be compatible with the stricter MDX v2 parser.
 * This must be called AFTER TOC extraction, as it removes syntax needed for TOC.
 */

// Regex patterns for transformations
const CUSTOM_ID_REGEX = /\s*\{#[a-zA-Z0-9_-]+\}\s*$/gm
const HTML_COMMENT_REGEX = /<!--[\s\S]*?-->/g
const SELF_CLOSING_VOID_TAGS =
  /(<(?:br|hr|img|input|meta|link|area|base|col|embed|param|source|track|wbr)(?:\s[^>]*)?)(?<!\/)\s*>/gi

/**
 * Remove HTML comments from content.
 * MDX v2 does not support HTML comments.
 */
function removeHtmlComments(content: string): string {
  return content.replace(HTML_COMMENT_REGEX, "")
}

/**
 * Fix self-closing void tags.
 * Example: "<br>" → "<br />"
 *
 * Uses negative lookbehind to avoid double-closing already self-closed tags.
 */
function fixSelfClosingTags(content: string): string {
  return content.replace(SELF_CLOSING_VOID_TAGS, "$1 />")
}

/**
 * Process content line by line, tracking code block state
 * to avoid transforming content inside code blocks.
 */
function processWithCodeBlockAwareness(
  content: string,
  transform: (line: string) => string
): string {
  const lines = content.split("\n")
  let inCodeBlock = false
  const processedLines: string[] = []

  for (const line of lines) {
    // Check for code block delimiters
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      processedLines.push(line)
      continue
    }

    // Only transform lines outside of code blocks
    if (inCodeBlock) {
      processedLines.push(line)
    } else {
      processedLines.push(transform(line))
    }
  }

  return processedLines.join("\n")
}

/**
 * Remove custom heading IDs with code block awareness.
 */
function removeCustomHeadingIdsWithAwareness(content: string): string {
  return processWithCodeBlockAwareness(content, (line) =>
    line.replace(/\s*\{#[a-zA-Z0-9_-]+\}\s*$/, "")
  )
}

/**
 * Preprocess markdown content for MDX v2 compatibility.
 *
 * IMPORTANT: This must be called AFTER TOC extraction, as it removes
 * the {#custom-id} syntax that is needed for TOC IDs.
 *
 * Transformations applied:
 * 1. Remove custom heading IDs: {#custom-id} syntax
 * 2. Remove HTML comments: <!-- ... -->
 * 3. Fix self-closing void tags: <br> → <br />
 *
 * @param content - Raw markdown content (after TOC extraction)
 * @returns Preprocessed content compatible with MDX v2
 */
export function preprocessContent(content: string): string {
  let processed = content

  // 1. Remove custom heading IDs (with code block awareness)
  processed = removeCustomHeadingIdsWithAwareness(processed)

  // 2. Remove HTML comments (can span multiple lines, handled globally)
  processed = removeHtmlComments(processed)

  // 3. Fix self-closing void tags
  processed = fixSelfClosingTags(processed)

  return processed
}

/**
 * Check if content contains MDX v1 patterns that need preprocessing
 */
export function needsPreprocessing(content: string): boolean {
  return (
    CUSTOM_ID_REGEX.test(content) ||
    HTML_COMMENT_REGEX.test(content) ||
    SELF_CLOSING_VOID_TAGS.test(content)
  )
}
