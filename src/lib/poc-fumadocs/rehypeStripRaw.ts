// PoC adapter: under `.md` mode, MDX preserves inline HTML (`<sup>`, `<Emoji>`)
// as hast `raw` nodes. Fumadocs' `rehype-toc` calls `hast-util-to-estree` on
// heading content, which has no handler for `raw` and throws
// "Cannot handle unknown node `raw`".
//
// Strip those nodes here so the build completes. The visible artifact is that
// `<Emoji>`/`<sup>`/etc. disappear from rendered headings and paragraphs —
// the same parity gap already documented in fumadocs-evaluation.md for JSX
// components in `.md` files.

const rehypeStripRaw = () => (tree: unknown) => {
  const walk = (node: { children?: { type?: string }[] } | undefined) => {
    if (!node || !Array.isArray(node.children)) return
    node.children = node.children.filter((c) => c?.type !== "raw")
    for (const child of node.children) walk(child as never)
  }
  walk(tree as never)
}

export default rehypeStripRaw
