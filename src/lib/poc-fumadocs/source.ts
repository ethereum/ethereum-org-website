import { loader } from "fumadocs-core/source"
import { toFumadocsSource } from "fumadocs-mdx/runtime/server"

import {
  content_ar,
  content_bn,
  content_cs,
  content_de,
  content_en,
  content_es,
  content_fr,
  content_hi,
  content_id,
  content_it,
  content_ja,
  content_ko,
  content_mr,
  content_pl,
  content_pt_br,
  content_ru,
  content_sw,
  content_ta,
  content_te,
  content_tr,
  content_uk,
  content_ur,
  content_vi,
  content_zh,
  content_zh_tw,
} from "../../../.source/server"

// PoC: one Fumadocs loader per locale. Each loader's source is the
// collection compiled from that locale's md tree at build time.
// `baseUrl: "/<locale>"` ensures generated URLs match today's routes.
//
// Locale codes use hyphens (`pt-br`, `zh-tw`), but JS identifiers can't —
// the `_` <-> `-` mapping happens here, not in source.config.ts.
const mk = (entries: unknown, locale: string) =>
  loader({
    source: toFumadocsSource(entries as never, []),
    baseUrl: `/${locale}`,
  })

// Build the full per-locale source map first. Honouring
// `NEXT_PUBLIC_BUILD_LOCALES` happens via the `allSources` → `sources`
// filter below; the map keys still use the canonical hyphenated locale codes
// so the env var values pass through unchanged.
const allSources = {
  en: mk(content_en, "en"),
  ar: mk(content_ar, "ar"),
  bn: mk(content_bn, "bn"),
  cs: mk(content_cs, "cs"),
  de: mk(content_de, "de"),
  es: mk(content_es, "es"),
  fr: mk(content_fr, "fr"),
  hi: mk(content_hi, "hi"),
  id: mk(content_id, "id"),
  it: mk(content_it, "it"),
  ja: mk(content_ja, "ja"),
  ko: mk(content_ko, "ko"),
  mr: mk(content_mr, "mr"),
  pl: mk(content_pl, "pl"),
  "pt-br": mk(content_pt_br, "pt-br"),
  ru: mk(content_ru, "ru"),
  sw: mk(content_sw, "sw"),
  ta: mk(content_ta, "ta"),
  te: mk(content_te, "te"),
  tr: mk(content_tr, "tr"),
  uk: mk(content_uk, "uk"),
  ur: mk(content_ur, "ur"),
  vi: mk(content_vi, "vi"),
  zh: mk(content_zh, "zh"),
  "zh-tw": mk(content_zh_tw, "zh-tw"),
} as const

export type ContentLocale = keyof typeof allSources
export type ContentSource = (typeof allSources)[ContentLocale]

// `NEXT_PUBLIC_BUILD_LOCALES` (comma-separated) narrows which locales are
// served; unset = all. Matches the convention in `src/lib/constants.ts`.
// Disabled locales still have empty collections in `source.config.ts`
// (their `files` glob matches nothing), so they consume no compile budget.
const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES?.split(",")
const enabledLocales = new Set<string>(
  BUILD_LOCALES ?? (Object.keys(allSources) as ContentLocale[])
)

const sources = Object.fromEntries(
  (Object.entries(allSources) as [ContentLocale, ContentSource][]).filter(
    ([locale]) => enabledLocales.has(locale)
  )
) as Partial<Record<ContentLocale, ContentSource>>

const isContentLocale = (locale: string): locale is ContentLocale =>
  Object.prototype.hasOwnProperty.call(allSources, locale)

export const getContentSource = (locale: string): ContentSource | undefined =>
  isContentLocale(locale) ? sources[locale] : undefined

// `contentSource` retained as the EN source for places that haven't been
// locale-aware'd yet. When EN is disabled via NEXT_PUBLIC_BUILD_LOCALES,
// callers must handle the undefined case.
export const contentSource: ContentSource | undefined = sources.en

// Iterate every enabled locale's pages for `generateStaticParams`.
export const allLocaleParams = () =>
  (Object.entries(sources) as [ContentLocale, ContentSource][]).flatMap(
    ([locale, src]) => src.generateParams().map((p) => ({ ...p, locale }))
  )
