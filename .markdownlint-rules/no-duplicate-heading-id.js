// Custom markdownlint rule: no duplicate {#custom-id} within a file
// Two headings with the same anchor ID break URL fragments and
// the translation manifest's section-keyed merkle trie.

const HEADING_ID_RE = /^#{1,4}\s+.+?\s*\{#([^}]+)\}\s*$/

/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["no-duplicate-heading-id", "ethereum-unique-heading-id"],
  description: "Heading {#id} anchors must be unique within a file",
  tags: ["headings", "ethereum"],
  parser: "none",
  function: (params, onError) => {
    const seenIds = new Map()
    let inCodeFence = false

    for (let i = 0; i < params.lines.length; i++) {
      const line = params.lines[i]

      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue

      const match = HEADING_ID_RE.exec(line)
      if (!match) continue

      const id = match[1]
      const prevLine = seenIds.get(id)

      if (prevLine !== undefined) {
        onError({
          lineNumber: i + 1,
          detail: `Duplicate {#${id}} -- first used on line ${prevLine}`,
          context: line.trim(),
        })
      } else {
        seenIds.set(id, i + 1)
      }
    }
  },
}
