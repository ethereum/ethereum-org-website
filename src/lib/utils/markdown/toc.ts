/**
 * Table of Contents Extraction
 *
 * Extracts TOC from raw markdown BEFORE preprocessing.
 * This is critical because preprocessing removes the {#custom-id} syntax.
 */

import type { ToCItem } from "@/lib/types"

import { parseHeadingId, trimmedTitle } from "@/lib/utils/toc"

interface ParsedHeading {
  depth: number
  id: string
  title: string
  line: number
}

/**
 * Parse all headings from raw markdown content.
 * Must be called BEFORE preprocessing removes custom IDs.
 */
function parseHeadings(content: string): ParsedHeading[] {
  const headings: ParsedHeading[] = []
  let lineNumber = 0

  // Track code block state to skip headings inside code blocks
  const lines = content.split("\n")
  let inCodeBlock = false

  for (const line of lines) {
    lineNumber++

    // Check for code block delimiters
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }

    // Skip headings inside code blocks
    if (inCodeBlock) continue

    // Check if this line is a heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const depth = headingMatch[1].length
      const rawTitle = headingMatch[2]

      // Use existing utilities to parse ID and clean title
      const id = parseHeadingId(rawTitle)
      const title = trimmedTitle(rawTitle)

      headings.push({
        depth,
        id,
        title,
        line: lineNumber,
      })
    }
  }

  return headings
}

/**
 * Build nested TOC structure from flat heading list.
 */
function buildTocTree(headings: ParsedHeading[], maxDepth: number): ToCItem[] {
  const result: ToCItem[] = []
  const stack: { item: ToCItem; depth: number }[] = []

  for (const heading of headings) {
    // Skip headings deeper than maxDepth
    if (heading.depth > maxDepth) continue

    const item: ToCItem = {
      title: heading.title,
      url: `#${heading.id}`,
    }

    // Find the appropriate parent
    while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
      stack.pop()
    }

    if (stack.length === 0) {
      // Top-level item
      result.push(item)
    } else {
      // Nested item - add to parent's items
      const parent = stack[stack.length - 1].item
      if (!parent.items) {
        parent.items = []
      }
      parent.items.push(item)
    }

    stack.push({ item, depth: heading.depth })
  }

  return result
}

/**
 * Extract table of contents from raw markdown content.
 *
 * IMPORTANT: This must be called BEFORE preprocessing, as preprocessing
 * removes the {#custom-id} syntax that we need for TOC IDs.
 *
 * @param rawContent - Raw markdown content (before preprocessing)
 * @param maxDepth - Maximum heading depth to include (default: 3 for h1-h3)
 * @returns Array of ToCItem representing the table of contents
 */
export function extractTableOfContents(
  rawContent: string,
  maxDepth: number = 3
): ToCItem[] {
  // Validate maxDepth
  const depth = Math.max(1, Math.min(6, maxDepth))

  // Parse all headings from raw content
  const headings = parseHeadings(rawContent)

  // Filter to only include h2 and below (h1 is usually the page title)
  const tocHeadings = headings.filter((h) => h.depth >= 2)

  // Build nested tree structure
  return buildTocTree(tocHeadings, depth + 1) // +1 because we filter h1, so h2 becomes "level 1"
}

/**
 * Get a flat list of all heading IDs for anchor validation
 */
export function getAllHeadingIds(rawContent: string): string[] {
  const headings = parseHeadings(rawContent)
  return headings.map((h) => h.id)
}
