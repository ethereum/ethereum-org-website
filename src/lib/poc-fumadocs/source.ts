import manifestJson from "../../../.source/manifest.json"
import type {
  ContentLocale,
  ContentSlug,
  Manifest,
  ManifestFrontmatter,
} from "../../../.source/types"

// Hybrid content layer: routing + frontmatter come from `.source/manifest.json`
// (built at postinstall by ./build-manifest.mjs). Bodies stay on disk and
// compile at request time via the legacy `importMd` + `next-mdx-remote`
// pipeline — see `getPageData()` in src/lib/md/data.ts. This file is the
// thin adapter that exposes manifest lookups with a stable shape so route
// handlers, layouts, and components don't reach into the JSON directly.

const manifest = manifestJson as unknown as Manifest

export type { ContentLocale, ContentSlug, ManifestFrontmatter }

export type ContentSource = {
  getPage: (
    slugs: string[]
  ) => { data: ManifestFrontmatter; slugs: string[] } | undefined
  generateParams: () => { slug: string[] }[]
}

const buildSource = (locale: ContentLocale): ContentSource => {
  const pages = manifest[locale] ?? {}
  return {
    getPage(slugs) {
      const data = pages[slugs.join("/")]
      return data ? { data, slugs } : undefined
    },
    generateParams() {
      return Object.keys(pages).map((slug) => ({ slug: slug.split("/") }))
    },
  }
}

const sources: Record<string, ContentSource> = Object.fromEntries(
  Object.keys(manifest).map((locale) => [
    locale,
    buildSource(locale as ContentLocale),
  ])
)

export const getContentSource = (locale: string): ContentSource | undefined =>
  sources[locale]

// EN source — the canonical fallback for slugs whose translation is missing
// (matches the legacy importMd fallback behaviour) and the source of truth
// for which slugs are valid pages. Translations whose EN source has been
// removed are orphans and must not be prerendered or routable.
export const contentSource: ContentSource | undefined = sources.en

// Existence check against the canonical EN set. Use this at the catch-all
// entry point so orphan translations (EN deleted, translation lingering)
// 404 the same way they did under the legacy fs-walk.
export const isCanonicalSlug = (slug: string[]): boolean =>
  contentSource?.getPage(slug) !== undefined

// Every enabled locale's `(locale, slug[])` pairs for
// `generateStaticParams`. Slug set is the canonical EN list — we don't
// prerender translations whose EN source is gone.
const enParams = (): { slug: string[] }[] =>
  contentSource?.generateParams() ?? []

export const allLocaleParams = (): { locale: string; slug: string[] }[] => {
  const params = enParams()
  return localesInBuild().flatMap((locale) =>
    params.map((p) => ({ ...p, locale }))
  )
}

// The manifest may contain more locales than this build targets (it's a
// shared on-disk artifact). BUILD_LOCALES is the build-time locale set —
// honour it here so the catch-all never tries to prerender a locale whose
// intl messages were excluded.
const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES?.split(",")
const localesInBuild = (): string[] =>
  BUILD_LOCALES
    ? Object.keys(sources).filter((l) => BUILD_LOCALES.includes(l))
    : Object.keys(sources)

// Subset of locales pre-rendered at build time. Locales in BUILD_LOCALES
// but not in PRERENDER_LOCALES still resolve via the catch-all — they
// render on-demand on first request and are cached by Netlify Durable.
const PRERENDER_LOCALES = process.env.NEXT_PUBLIC_PRERENDER_LOCALES?.split(",")

export const prerenderLocaleParams = (): {
  locale: string
  slug: string[]
}[] => {
  const built = localesInBuild()
  const targets = PRERENDER_LOCALES
    ? built.filter((l) => PRERENDER_LOCALES.includes(l))
    : built
  const params = enParams()
  return targets.flatMap((locale) => params.map((p) => ({ ...p, locale })))
}

export const isContentLocale = (locale: string): boolean =>
  Object.prototype.hasOwnProperty.call(manifest, locale)

// Hub-route helper: list every EN slug under a content subtree (e.g. "videos",
// "developers/tutorials") without touching the filesystem. Used by hub pages
// that previously did `readdir(public/content/<prefix>)` walks at build time.
// Returns the slug segments after the prefix, so callers can build paths or
// look up per-locale frontmatter via `getContentSource`.
export const listSlugsUnder = (prefix: string): string[] => {
  const root = prefix.replace(/^\/|\/$/g, "")
  const enSlugs =
    contentSource?.generateParams().map((p) => p.slug.join("/")) ?? []
  if (!root) return enSlugs
  const head = `${root}/`
  return enSlugs
    .filter((slug) => slug.startsWith(head))
    .map((slug) => slug.slice(head.length))
}
