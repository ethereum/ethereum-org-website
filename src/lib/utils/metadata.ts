import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants"

import { areNamespacesTranslated } from "../i18n/translationStatus"

import {
  getPrimaryNamespaceForPath,
  isLocaleValidISO639_1,
} from "./translations"
import { getFullUrl } from "./url"

import { routing } from "@/i18n/routing"
/**
 * List of default og images for different sections
 */
const imageForSlug = [
  { section: "developers", image: "/images/heroes/developers-hub-hero.png" },
  { section: "roadmap", image: "/images/heroes/roadmap-hub-hero.jpg" },
  { section: "guides", image: "/images/heroes/guides-hub-hero.jpg" },
  { section: "community", image: "/images/heroes/community-hero.png" },
  { section: "staking", image: "/images/upgrades/upgrade_rhino.png" },
  { section: "10years", image: "/images/10-year-anniversary/10-year-og.png" },
] as const

/**
 * Get the default OG image for a page based on the slug
 * @param slug - the slug of the page
 * @returns relative path of image
 */
export const getOgImage = (slug: string[]): string => {
  let result = DEFAULT_OG_IMAGE
  for (const item of imageForSlug) {
    if (slug.includes(item.section)) {
      result = item.image
    }
  }
  return result
}

export const getMetadata = async ({
  locale,
  slug,
  title,
  description: descriptionProp,
  twitterDescription,
  image,
  author,
  noIndex = false,
}: {
  locale: string
  slug: string[]
  title: string
  description?: string
  twitterDescription?: string
  image?: string
  author?: string
  noIndex?: boolean
}): Promise<Metadata> => {
  const slugString = slug.join("/")
  const t = await getTranslations({ locale, namespace: "common" })

  const description = descriptionProp || t("site-description")
  const siteTitle = t("site-title")

  // Set canonical URL w/ language path to avoid duplicate content
  const url = getFullUrl(locale, slugString)

  // Set x-default URL for hreflang
  const xDefault = getFullUrl(routing.defaultLocale, slugString)

  /* Set fallback ogImage based on path */
  const ogImage = image || getOgImage(slug)

  const base: Metadata = {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        "x-default": xDefault,
        ...Object.fromEntries(
          routing.locales
            .filter(isLocaleValidISO639_1)
            .map((locale) => [locale, getFullUrl(locale, slugString)])
        ),
      },
    },
    openGraph: {
      title,
      description,
      locale,
      type: "website",
      url,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      title,
      description: twitterDescription || description,
      card: "summary_large_image",
      creator: author || siteTitle,
      site: author || siteTitle,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    other: {
      "docsearch:description": description,
    },
  }

  if (noIndex) {
    return { ...base, robots: { index: false } }
  }

  // Check if the page is translated by checking only the primary namespace
  const primaryNamespace = getPrimaryNamespaceForPath(slugString)
  const isTranslated = await areNamespacesTranslated(locale, [
    primaryNamespace || "",
  ])

  // If the page is not translated, do not index the page
  return isTranslated ? base : { ...base, robots: { index: false } }
}
