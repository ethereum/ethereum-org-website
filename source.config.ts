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

const docCollection = (dir: string, files: string[]) =>
  defineCollections({
    type: "doc",
    dir,
    files,
    schema: frontmatterSchema,
    mdxOptions: sharedMdxOptions,
  })

// PoC: 25 collections — one per locale. EN reads from `public/content/`
// (translations subtree excluded via glob); every other locale reads from
// `public/content/translations/<locale>/`. Each collection compiles its own
// MD files into `.source/` at build, and the route picks the right source
// via `params.locale`. JS identifiers must be hyphen-free, so the
// `pt-br`/`zh-tw` exports use underscores; `src/lib/poc-fumadocs/source.ts`
// maps locale codes back when wiring loaders.
export const content_en = docCollection("public/content", [
  "**/*.md",
  "**/*.mdx",
  "!translations/**",
])
export const content_ar = docCollection("public/content/translations/ar", [
  "**/*.md",
  "**/*.mdx",
])
export const content_bn = docCollection("public/content/translations/bn", [
  "**/*.md",
  "**/*.mdx",
])
export const content_cs = docCollection("public/content/translations/cs", [
  "**/*.md",
  "**/*.mdx",
])
export const content_de = docCollection("public/content/translations/de", [
  "**/*.md",
  "**/*.mdx",
])
export const content_es = docCollection("public/content/translations/es", [
  "**/*.md",
  "**/*.mdx",
])
export const content_fr = docCollection("public/content/translations/fr", [
  "**/*.md",
  "**/*.mdx",
])
export const content_hi = docCollection("public/content/translations/hi", [
  "**/*.md",
  "**/*.mdx",
])
export const content_id = docCollection("public/content/translations/id", [
  "**/*.md",
  "**/*.mdx",
])
export const content_it = docCollection("public/content/translations/it", [
  "**/*.md",
  "**/*.mdx",
])
export const content_ja = docCollection("public/content/translations/ja", [
  "**/*.md",
  "**/*.mdx",
])
export const content_ko = docCollection("public/content/translations/ko", [
  "**/*.md",
  "**/*.mdx",
])
export const content_mr = docCollection("public/content/translations/mr", [
  "**/*.md",
  "**/*.mdx",
])
export const content_pl = docCollection("public/content/translations/pl", [
  "**/*.md",
  "**/*.mdx",
])
export const content_pt_br = docCollection(
  "public/content/translations/pt-br",
  ["**/*.md", "**/*.mdx"]
)
export const content_ru = docCollection("public/content/translations/ru", [
  "**/*.md",
  "**/*.mdx",
])
export const content_sw = docCollection("public/content/translations/sw", [
  "**/*.md",
  "**/*.mdx",
])
export const content_ta = docCollection("public/content/translations/ta", [
  "**/*.md",
  "**/*.mdx",
])
export const content_te = docCollection("public/content/translations/te", [
  "**/*.md",
  "**/*.mdx",
])
export const content_tr = docCollection("public/content/translations/tr", [
  "**/*.md",
  "**/*.mdx",
])
export const content_uk = docCollection("public/content/translations/uk", [
  "**/*.md",
  "**/*.mdx",
])
export const content_ur = docCollection("public/content/translations/ur", [
  "**/*.md",
  "**/*.mdx",
])
export const content_vi = docCollection("public/content/translations/vi", [
  "**/*.md",
  "**/*.mdx",
])
export const content_zh_tw = docCollection(
  "public/content/translations/zh-tw",
  ["**/*.md", "**/*.mdx"]
)
export const content_zh = docCollection("public/content/translations/zh", [
  "**/*.md",
  "**/*.mdx",
])
