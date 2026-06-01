import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import {
  DEFAULT_OG_IMAGE,
  IS_PRODUCTION_DEPLOY,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/constants"

import { getTranslatedLocales } from "../i18n/translationRegistry"

import { getFullUrl, toLanguageTag } from "./url"

import { routing } from "@/i18n/routing"

/**
 * List of default og images for different sections
 */
const imageForSlug = [
  {
    section: "developers",
    image: "/images/heroes/futuristic-community-center-glass-roof.png",
  },
  {
    section: "roadmap",
    image:
      "/images/heroes/futuristic-night-cityscape-beacon-overlook-moon.jpg",
  },
  {
    section: "guides",
    image:
      "/images/heroes/futuristic-marketplace-hub-counters-people-robots.jpg",
  },
  {
    section: "community",
    image: "/images/heroes/forest-deck-campfire-gathering-people-robot.png",
  },
  {
    section: "staking",
    image: "/images/upgrades/leslie-rhino-mascot-running.png",
  },
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
  translatedLocales,
}: {
  locale: string
  slug: string[]
  title: string
  description?: string
  twitterDescription?: string
  image?: string
  author?: string
  noIndex?: boolean
  translatedLocales?: string[]
}): Promise<Metadata> => {
  const slugString = slug.join("/")
  const t = await getTranslations("common")

  const description = descriptionProp || t("site-description")

  const titleAlreadyHasBrand = title
    .toLowerCase()
    .includes(SITE_TITLE.toLowerCase())

  const finalTitle = titleAlreadyHasBrand
    ? title
    : `${title} | \u2066${SITE_TITLE}\u2069`

  // Auto-detect translated locales if not provided
  const finalTranslatedLocales =
    translatedLocales ?? (await getTranslatedLocales(slugString))

  const isCurrentPageTranslated = finalTranslatedLocales.includes(locale)

  // Set canonical URL
  // If current locale is NOT translated, set canonical to English version
  const canonicalLocale = isCurrentPageTranslated
    ? locale
    : routing.defaultLocale
  const url = getFullUrl(canonicalLocale, slugString)

  // Set x-default URL for hreflang (always use default locale)
  const xDefault = getFullUrl(routing.defaultLocale, slugString)

  /* Set fallback ogImage based on path */
  const ogImage = image || getOgImage(slug)

  // Only include hreflang alternates if the current page is translated
  // Untranslated pages should not have hreflang tags
  const localesForHreflang = isCurrentPageTranslated
    ? routing.locales.filter((loc) => finalTranslatedLocales.includes(loc))
    : []

  const base: Metadata = {
    title: finalTitle,
    description,
    formatDetection: { telephone: false },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      ...(localesForHreflang.length > 0 && {
        languages: {
          "x-default": xDefault,
          ...Object.fromEntries(
            localesForHreflang.map((loc) => [
              toLanguageTag(loc),
              getFullUrl(loc, slugString),
            ])
          ),
        },
      }),
    },
    openGraph: {
      title: finalTitle,
      description,
      locale,
      type: "website",
      url,
      siteName: SITE_TITLE,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      title: finalTitle,
      description: twitterDescription || description,
      card: "summary_large_image",
      creator: author || SITE_TITLE,
      site: author || SITE_TITLE,
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

  if (!IS_PRODUCTION_DEPLOY) {
    return { ...base, robots: { index: false, follow: false } }
  }

  if (noIndex) {
    return { ...base, robots: { index: false } }
  }

  if (!isCurrentPageTranslated) {
    return { ...base, robots: { index: false, follow: true } }
  }

  return base
}
