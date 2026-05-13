import type { Frontmatter } from "@/lib/types"

import manifestJson from "../../../.source/manifest.json"

// Hybrid PoC: routing + frontmatter come from `.source/manifest.json`
// (built at postinstall, see ./build-manifest.mjs). Bodies are still
// compiled at request time by the legacy `importMd` + `compile`
// pipeline. This file is the small adapter that gives the route handler
// fumadocs-like helpers without paying fumadocs-mdx's build-time cost.

type LocaleManifest = Record<string, Frontmatter>
type Manifest = Record<string, LocaleManifest>

const manifest = manifestJson as unknown as Manifest

export type ContentLocale = string

export type ContentSource = {
  getPage: (
    slugs: string[]
  ) => { data: Frontmatter; slugs: string[] } | undefined
  generateParams: () => { slug: string[] }[]
}

const buildSource = (locale: string): ContentSource => {
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
  Object.keys(manifest).map((locale) => [locale, buildSource(locale)])
)

export const getContentSource = (locale: string): ContentSource | undefined =>
  sources[locale]

// EN source — retained as the fallback for places (e.g. catch-all
// when a translation is missing) that want to read frontmatter from
// the canonical locale.
export const contentSource: ContentSource | undefined = sources.en

// Every enabled locale's `(locale, slug[])` pairs for
// `generateStaticParams`. Subject to NEXT_PUBLIC_PRERENDER_LOCALES via
// `prerenderLocaleParams` below.
export const allLocaleParams = (): { locale: string; slug: string[] }[] =>
  Object.entries(sources).flatMap(([locale, src]) =>
    src.generateParams().map((p) => ({ ...p, locale }))
  )

// Subset of locales pre-rendered at build time. Locales in the manifest
// but not in PRERENDER_LOCALES still resolve via the catch-all — they
// render on-demand on first request and are cached by Netlify Durable.
const PRERENDER_LOCALES = process.env.NEXT_PUBLIC_PRERENDER_LOCALES?.split(",")

export const prerenderLocaleParams = (): {
  locale: string
  slug: string[]
}[] => {
  if (!PRERENDER_LOCALES) return allLocaleParams()
  const set = new Set(PRERENDER_LOCALES)
  return Object.entries(sources)
    .filter(([locale]) => set.has(locale))
    .flatMap(([locale, src]) =>
      src.generateParams().map((p) => ({ ...p, locale }))
    )
}

export const isContentLocale = (locale: string): boolean =>
  Object.prototype.hasOwnProperty.call(manifest, locale)
