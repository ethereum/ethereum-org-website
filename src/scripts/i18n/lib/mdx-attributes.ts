import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { visit } from "unist-util-visit"

/**
 * Represents a translatable attribute extracted from MDX content.
 */
export interface ExtractedAttribute {
  component: string
  attribute: string
  value: string
  position: { line: number; column: number } | null
}

/**
 * MDX JSX attribute node type (from mdast-util-mdx-jsx).
 */
interface MdxJsxAttribute {
  type: "mdxJsxAttribute"
  name: string
  value: string | null | { type: string; value: string }
  position?: { start: { line: number; column: number } }
}

/**
 * MDX JSX element node type.
 */
interface MdxJsxElement {
  type: "mdxJsxFlowElement" | "mdxJsxTextElement"
  name: string | null
  attributes?: MdxJsxAttribute[]
}

/**
 * Check if a string value is likely translatable text.
 * Returns false for URLs, paths, code patterns, and emoji-only strings.
 */
function isTranslatable(value: string): boolean {
  // Must have spaces (likely English text)
  if (!/\s/.test(value)) return false

  // Skip URLs, paths, anchors, and code expressions
  if (/^(https?:|\/|#|\{|@)/.test(value)) return false

  // Skip email addresses
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false

  // Skip if all emoji/whitespace
  if (/^[\p{Emoji}\s]+$/u.test(value)) return false

  // Skip CSS-like values
  if (/^[\d.]+(px|em|rem|%|vh|vw)/.test(value)) return false

  // Skip hex colors
  if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return false

  return true
}

/**
 * Extract translatable attributes from MDX content using AST parsing.
 * This replaces regex-based extraction for more reliable results.
 */
export function extractTranslatableAttributes(
  content: string
): ExtractedAttribute[] {
  const attributes: ExtractedAttribute[] = []

  try {
    const tree = unified().use(remarkParse).use(remarkMdx).parse(content)

    visit(tree, ["mdxJsxFlowElement", "mdxJsxTextElement"], (node) => {
      const jsxNode = node as MdxJsxElement

      for (const attr of jsxNode.attributes || []) {
        if (attr.type !== "mdxJsxAttribute") continue

        // Get string value (handle both direct strings and expression values)
        let value: string | null = null
        if (typeof attr.value === "string") {
          value = attr.value
        } else if (attr.value && typeof attr.value === "object") {
          // Handle expression values like {`template string`}
          if (attr.value.type === "mdxJsxAttributeValueExpression") {
            // Skip complex expressions for now
            continue
          }
        }

        if (value && isTranslatable(value)) {
          attributes.push({
            component: jsxNode.name || "unknown",
            attribute: attr.name,
            value,
            position: attr.position?.start || null,
          })
        }
      }
    })
  } catch (error) {
    console.warn("[MDX] Failed to parse content:", error)
    // Fall back to empty - don't crash on parse errors
  }

  return attributes
}

/**
 * Common translatable attributes by component.
 * Used as a reference for what attributes typically need translation.
 */
export const TRANSLATABLE_ATTRIBUTES: Record<string, string[]> = {
  Card: ["title", "description", "emoji"],
  InfoBanner: ["title", "description"],
  ButtonLink: ["children"], // Note: children handled differently
  Alert: ["title"],
  AlertEmoji: ["text"],
  Tooltip: ["content"],
  ExpandableCard: ["title", "contentPreview"],
  DocLink: ["title"],
  YouTube: ["title"],
  // Add more as discovered
}

/**
 * Replace attribute values in MDX content.
 * Takes original content and a map of old -> new values.
 */
export function replaceAttributeValues(
  content: string,
  replacements: Map<string, string>
): string {
  let result = content

  for (const [oldValue, newValue] of replacements) {
    // Escape special regex characters in the old value
    const escaped = oldValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

    // Replace in attribute contexts: attr="value" or attr='value'
    result = result.replace(
      new RegExp(`(\\w+)=["']${escaped}["']`, "g"),
      `$1="${newValue}"`
    )
  }

  return result
}
