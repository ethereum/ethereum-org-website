import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants"

import { isLocaleValidISO639_1 } from "./translations"
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
export const getOgImage = (
  slug: string[],
  params?: {
    title?: string
    description?: string
    author?: string
    timeToRead?: string
    skill?: string
    tags?: string[]
  }
): string => {
  const { title, description, author, timeToRead, skill, tags } = params || {}

  if (slug.includes("tutorials") && slug.length > 2) {
    const ogImageSrc = new URL("og/tutorial", SITE_URL)
    title && ogImageSrc.searchParams.set("title", title)
    description && ogImageSrc.searchParams.set("subtitle", description)
    author && ogImageSrc.searchParams.set("author", author)
    timeToRead && ogImageSrc.searchParams.set("timeToRead", timeToRead)
    skill && ogImageSrc.searchParams.set("skill", skill)
    tags && ogImageSrc.searchParams.set("tags", tags?.join(", "))
    return ogImageSrc.toString()
    console.log({ image: ogImageSrc.toString() })
  }
  for (const item of imageForSlug) {
    if (slug.includes(item.section)) return item.image
  }

  return DEFAULT_OG_IMAGE
}

export const getMetadata = async ({
  locale,
  slug,
  title,
  description: descriptionProp,
  image,
  author,
  tags,
  timeToRead,
}: {
  locale: string
  slug: string[]
  title: string
  description?: string
  image?: string
  author?: string
  tags?: string[]
  timeToRead?: string
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
  const params = { title, description, author, tags, timeToRead }
  const ogImage = image || getOgImage(slug, params)

  return {
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
