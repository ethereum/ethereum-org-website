import { existsSync } from "fs"
import { join } from "path"

import {
  DEFAULT_LOCALE,
  LOCALES_CODES,
  TRANSLATIONS_DIR,
} from "@/lib/constants"

import { getPostSlugs } from "../utils/md"
import {
  getAllIntlPagePaths,
  getPrimaryNamespaceForPath,
} from "../utils/translations"
import { addSlashes } from "../utils/url"

import { areNamespacesTranslated } from "./translationStatus"

async function isMdPageTranslated(
  locale: string,
  slug: string
): Promise<boolean> {
  if (locale === DEFAULT_LOCALE) {
    return true
  }

  const translationPath = join(TRANSLATIONS_DIR, locale, slug, "index.md")
  return existsSync(translationPath)
}

async function isIntlPageTranslated(
  locale: string,
  path: string
): Promise<boolean> {
  const primaryNamespace = getPrimaryNamespaceForPath(path)

  if (!primaryNamespace) {
    return true
  }

  return areNamespacesTranslated(locale, [primaryNamespace])
}

function getPageType(slug: string): "md" | "intl" {
  const normalizedSlug = addSlashes(slug)
  const primaryNamespace = getPrimaryNamespaceForPath(normalizedSlug)
  return primaryNamespace ? "intl" : "md"
}

/**
 * Get all translated locales for a given page slug.
 * Works for both MD pages and intl pages.
 *
 * @param slug - Page slug/path (e.g., "about" for MD or "/wallets/" for intl)
 * @returns Promise resolving to array of locale codes that have translations
 * @example
 *   await getTranslatedLocales("about") // => ["en", "es", "fr"]
 *   await getTranslatedLocales("/wallets/") // => ["en", "es"]
 */
export async function getTranslatedLocales(slug: string): Promise<string[]> {
  const pageType = getPageType(slug)
  const translatedLocales: string[] = []

  for (const locale of LOCALES_CODES) {
    let isTranslated: boolean

    if (pageType === "md") {
      const mdSlug = slug.replace(/^\/+|\/+$/g, "")
      isTranslated = await isMdPageTranslated(locale, mdSlug)
    } else {
      const normalizedPath = addSlashes(slug)
      isTranslated = await isIntlPageTranslated(locale, normalizedPath)
    }

    if (isTranslated) {
      translatedLocales.push(locale)
    }
  }

  return translatedLocales
}

type PageWithTranslations = {
  slug: string
  translatedLocales: string[]
  type: "md" | "intl"
}

export async function getAllPagesWithTranslations(): Promise<
  PageWithTranslations[]
> {
  const pages: PageWithTranslations[] = []

  const mdSlugs = await getPostSlugs("/")
  const intlPaths = getAllIntlPagePaths()

  for (const slug of mdSlugs) {
    const translatedLocales = await getTranslatedLocales(slug)
    pages.push({
      slug,
      translatedLocales,
      type: "md",
    })
  }

  for (const path of intlPaths) {
    const translatedLocales = await getTranslatedLocales(path)
    pages.push({
      slug: path,
      translatedLocales,
      type: "intl",
    })
  }

  return pages
}
