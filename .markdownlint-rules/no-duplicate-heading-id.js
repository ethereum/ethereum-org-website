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
    const allIds = new Set()
    let inCodeFence = false

    // First pass: collect all existing IDs
    for (const line of params.lines) {
      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        continue
      }
      if (inCodeFence) continue
      const m = HEADING_ID_RE.exec(line)
      if (m) allIds.add(m[1])
    }

    // Second pass: flag duplicates with fix info
    inCodeFence = false
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
        // Find next available suffix
        let suffix = 2
        while (allIds.has(`${id}-${suffix}`)) suffix++
        const newId = `${id}-${suffix}`
        allIds.add(newId)

        const col = line.indexOf(`{#${id}}`)
        onError({
          lineNumber: i + 1,
          detail: `Duplicate {#${id}} -- first used on line ${prevLine}. Fix: {#${newId}}`,
          context: line.trim(),
          fixInfo: {
            lineNumber: i + 1,
            editColumn: col + 1,
            deleteCount: `{#${id}}`.length,
            insertText: `{#${newId}}`,
          },
        })
      } else {
        seenIds.set(id, i + 1)
      }
    }
  },
}
