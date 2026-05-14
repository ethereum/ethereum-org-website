import type { Frontmatter, Layout } from "@/lib/types"

export type ContentManifestEntry = {
  slug: string
  locale: string
  layout: Layout
  frontmatter: Frontmatter
  bodyPath: string
  isTranslated: boolean
}

export type ContentManifest = Record<
  string,
  Record<string, ContentManifestEntry>
>
