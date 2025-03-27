import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { DEFAULT_OG_IMAGE } from "@/lib/constants"

import { getFullUrl } from "./url"

import { routing } from "@/i18n/routing"
/**
 * List of default og images for different sections
 */
const imageForSlug = [
  { section: "developers", image: "/images/heroes/developers-hub-hero.jpg" },
  { section: "roadmap", image: "/images/heroes/roadmap-hub-hero.jpg" },
  { section: "guides", image: "/images/heroes/guides-hub-hero.jpg" },
  { section: "community", image: "/images/heroes/community-hero.png" },
  { section: "staking", image: "/images/upgrades/upgrade_rhino.png" },
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
  image,
  author,
}: {
  locale: string
  slug: string[]
  title: string
  description?: string
  image?: string
  author?: string
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

  return {
    title,
    description,
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
      languages: {
        "x-default": xDefault,
        ...Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            getFullUrl(locale, slugString),
          ])
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
      description,
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
}
