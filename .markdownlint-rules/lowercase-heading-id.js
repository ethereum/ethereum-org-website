// Custom markdownlint rule: heading IDs must be lowercase
// Enforces lower-kebab-case for all custom {#anchor-id} values.

const HEADING_ID_RE = /^(#{1,4})\s+(.+?)\s*\{#([^}]+)\}\s*$/

/** @type {import("markdownlint").Rule} */
module.exports = {
  names: ["lowercase-heading-id", "ethereum-lowercase-heading-id"],
  description: "Heading {#id} anchors must be lowercase",
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

      const match = HEADING_ID_RE.exec(line)
      if (!match) continue

      const id = match[3]
      const lowered = id.toLowerCase()

      if (id !== lowered) {
        const col = line.indexOf(`{#${id}}`)
        onError({
          lineNumber: i + 1,
          detail: `{#${id}} contains uppercase. Fix: {#${lowered}}`,
          context: line.trim(),
          fixInfo: {
            lineNumber: i + 1,
            editColumn: col + 1,
            deleteCount: `{#${id}}`.length,
            insertText: `{#${lowered}}`,
          },
        })
      }
    }
  },
}
