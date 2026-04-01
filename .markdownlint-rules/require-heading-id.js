// Custom markdownlint rule: require {#custom-id} on all h1-h4 headings
// ethereum.org uses custom header IDs for translation infrastructure,
// URL fragment stability, and section-level drift detection.

const HEADING_RE = /^(#{1,4})\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["heading-requires-id", "ethereum-heading-id"],
  description: "Headings h1-h4 must have a custom {#anchor-id}",
  tags: ["headings", "ethereum"],
  parser: "none",
  function: (params, onError) => {
    let inCodeFence = false

    for (let i = 0; i < params.lines.length; i++) {
      const line = params.lines[i]

      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue

      const match = HEADING_RE.exec(line)
      if (!match) continue

      const level = match[1].length
      const text = match[2].trim()
      const id = match[3]

      if (!id) {
        const suggested = slugify(text)
        onError({
          lineNumber: i + 1,
          detail: `h${level} missing {#id}. Suggested: {#${suggested}}`,
          context: line.trim(),
          fixInfo: {
            lineNumber: i + 1,
            editColumn: line.trimEnd().length + 1,
            insertText: ` {#${suggested}}`,
          },
        })
      }
    }
  },
}
