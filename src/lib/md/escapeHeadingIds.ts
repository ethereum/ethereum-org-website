/**
 * Escape heading ID syntax so MDX does not treat the braces as JSX expressions.
 * e.g. `## Title {#my-id}` -> `## Title \{#my-id\}`
 * The remark-heading-id plugin still recognises the escaped form.
 */
export function escapeHeadingIds(content: string) {
  return content.replace(/^(#{1,6}.*?)\{(#[\w-]+)\}/gm, "$1\\{$2\\}")
}
