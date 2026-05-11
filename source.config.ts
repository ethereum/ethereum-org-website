import { applyMdxPreset, defineCollections } from "fumadocs-mdx/config"
import remarkHeadingId from "remark-heading-id"

import rehypeImgForFumadocs from "./src/lib/poc-fumadocs/rehypeImgForFumadocs"
import rehypeStripRaw from "./src/lib/poc-fumadocs/rehypeStripRaw"

// Minimal Standard Schema (https://standardschema.dev) so collection entries
// type as `DocCollectionEntry<…, Frontmatter, …>` and the inferred `Source`
// satisfies `loader()`'s `ResolvedInput` constraint (`pageData extends PageData`).
// No runtime validation — frontmatter parsing has already happened upstream.
type Frontmatter = {
  title?: string
  description?: string
  author?: string
  tags?: string[]
  skill?: string
  published?: string | Date
  lang?: string
  template?: string
}

const frontmatterSchema = {
  "~standard": {
    version: 1,
    vendor: "ethereum-org-poc",
    validate: (v: unknown) => ({ value: v as Frontmatter }),
    types: {
      input: {} as Frontmatter,
      output: {} as Frontmatter,
    },
  },
} as const

// When `collection.mdxOptions` is set, Fumadocs does NOT auto-apply its preset
// (TOC extraction, code highlighting), so we apply it explicitly with our
// extra plugins layered on top.
const sharedMdxOptions = applyMdxPreset({
  remarkPlugins: (v) => [remarkHeadingId, ...v],
  // `rehypeStripRaw` must run before Fumadocs' rehype-toc. The preset
  // resolver puts user-returned plugins at the END (the spread is
  // `[rehypeCode, ...preset, ...user]` after resolvePlugins runs), so we
  // can't append it after `v`. Prepending it makes it the first rehype
  // plugin in the chain, running before rehype-toc.
  rehypePlugins: (v) => [rehypeStripRaw, ...v, rehypeImgForFumadocs],
  // Disable Fumadocs' Shiki integration — our content uses langs like
  // `yul`/`zokrates` that aren't in Shiki's default set, and the existing
  // pipeline relies on its own `pre`/`code` components for highlighting.
  rehypeCodeOptions: false,
  // Disable preset's remarkImage — it converts `![](./img.png)` into ES
  // module imports (`useImport: true` in bundler env), which clashes with
  // our `rehypeImgForFumadocs` that expects raw `img` elements with
  // string `src` props read from the filesystem.
  remarkImageOptions: false,
})

// Expanded PoC: every English markdown page under public/content, excluding
// the translations subtree (7,726 files served via the existing pipeline).
// Resulting slug for `public/content/<a>/<b>/index.md` is `<a>/<b>`.
export const content = defineCollections({
  type: "doc",
  dir: "public/content",
  files: ["**/*.md", "**/*.mdx", "!translations/**"],
  schema: frontmatterSchema,
  mdxOptions: sharedMdxOptions,
})
