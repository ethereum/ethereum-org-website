import { existsSync } from "fs"
import { join } from "path"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { getPostSlugs } from "../utils/md"
import { getStaticPagePaths } from "../utils/staticPages"
import { getPrimaryNamespaceForPath } from "../utils/translations"
import { addSlashes } from "../utils/url"
import { getVideoSlugs } from "../utils/videos"

import { areNamespacesTranslated } from "./translationStatus"

const CONTENT_ROOT = "public/content"
const TRANSLATIONS_ROOT = "public/content/translations"

function normalizeContentSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "")
}

/**
 * Whether the markdown source for a slug exists on disk for a given locale.
 * Slug must be normalized (no leading/trailing slashes).
 */
export function hasContentForLocale(
  locale: string,
  contentSlug: string
): boolean {
  const file =
    locale === DEFAULT_LOCALE
      ? join(CONTENT_ROOT, contentSlug, "index.md")
      : join(TRANSLATIONS_ROOT, locale, contentSlug, "index.md")
  return existsSync(file)
}

// Cache of translated locales per slug, ensuring consistent results across
// all pages rendered during a single build. Without this cache, filesystem
// checks via existsSync() could return different results for the same slug
// at different points in the build, breaking hreflang reciprocity.
const translatedLocalesCache = new Map<string, string[]>()

/**
 * Get all translated locales for a given page slug.
 *
 * Resolution is content-first:
 *   1. If English markdown exists at public/content/<slug>/index.md, the page
 *      is content-driven. Translation status = does the localized markdown
 *      exist for that locale (UI string fallback is acceptable).
 *   2. Otherwise the page is UI-driven; translation status = does the primary
 *      namespace mapped to this path exist for that locale.
 *   3. If neither source is found, only the default locale is returned.
 *
 * Results are cached per slug for build-time consistency.
 *
 * @param slug - Page slug/path (with or without surrounding slashes)
 * @returns Promise resolving to array of locale codes that have translations
 * @example
 *   await getTranslatedLocales("about")        // => ["en", "es", "fr"]
 *   await getTranslatedLocales("/wallets/")    // => ["en", "es", ...]
 *   await getTranslatedLocales("videos/foo")   // => ["en", "ar", "de", ...]
 */
export async function getTranslatedLocales(slug: string): Promise<string[]> {
  const cached = translatedLocalesCache.get(slug)
  if (cached) return cached

  const contentSlug = normalizeContentSlug(slug)
  const translatedLocales: string[] = []

  if (hasContentForLocale(DEFAULT_LOCALE, contentSlug)) {
    for (const locale of LOCALES_CODES) {
      if (hasContentForLocale(locale, contentSlug)) {
        translatedLocales.push(locale)
      }
    }
  } else {
    const primaryNamespace = getPrimaryNamespaceForPath(addSlashes(slug))
    if (primaryNamespace) {
      for (const locale of LOCALES_CODES) {
        if (await areNamespacesTranslated(locale, [primaryNamespace])) {
          translatedLocales.push(locale)
        }
      }
    } else {
      translatedLocales.push(DEFAULT_LOCALE)
    }
  }

  translatedLocalesCache.set(slug, translatedLocales)
  return translatedLocales
}

type PageWithTranslations = {
  slug: string
  translatedLocales: string[]
}

async function getDynamicIntlPagePaths(): Promise<string[]> {
  // Imports are deferred so test environments that don't transform SVG /
  // Next.js-only modules can still load this file to test getTranslatedLocales.
  const [
    { appsCategories },
    { getAppsData, getDeveloperToolsData },
    { normalizeDeveloperToolsData },
    { slugify },
  ] = await Promise.all([
    import("@/data/apps/categories"),
    import("@/lib/data"),
    import("@/lib/utils/developerToolsData"),
    import("../utils/url"),
  ])

  // discoverStaticPages() excludes dynamic segments, so add known
  // generateStaticParams() routes that should be present in sitemap output.
  const toolsData = normalizeDeveloperToolsData(await getDeveloperToolsData())
  const devToolPaths =
    toolsData?.taxonomy.categories.definitions.map(
      (category) => `/developers/tools/categories/${category.id}/`
    ) || []

  // App category pages
  const appCategoryPaths = Object.values(appsCategories).map(
    (category) => `/apps/categories/${category.slug}/`
  )

  // Individual app pages
  const appsData = await getAppsData()
  const appPaths = appsData
    ? Object.values(appsData)
        .flat()
        .map((app) => `/apps/${slugify(app.name)}/`)
    : []

  return [...devToolPaths, ...appCategoryPaths, ...appPaths]
}

export async function getAllPagesWithTranslations(): Promise<
  PageWithTranslations[]
> {
  const pages: PageWithTranslations[] = []

  const mdSlugs = await getPostSlugs("/")

  // Video detail pages live under public/content/videos/ but are excluded from
  // getPostSlugs() because they have a dedicated [slug] route. Surface them
  // here so they flow through the same content-driven translation resolution.
  const videoSlugs = (await getVideoSlugs()).map((slug) => `videos/${slug}`)

  const intlPaths = [
    ...getStaticPagePaths(),
    ...(await getDynamicIntlPagePaths()),
  ]
  const uniqueIntlPaths = Array.from(new Set(intlPaths))

  for (const slug of [...mdSlugs, ...videoSlugs]) {
    const translatedLocales = await getTranslatedLocales(slug)
    pages.push({ slug, translatedLocales })
  }

  for (const path of uniqueIntlPaths) {
    const translatedLocales = await getTranslatedLocales(path)
    pages.push({ slug: path, translatedLocales })
  }

  return pages
}
