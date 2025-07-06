import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/constants"

import { isLocaleValidISO639_1 } from "./translations"
import { getFullUrl } from "./url"

import { routing } from "@/i18n/routing"

type MetadataProps = {
  locale: string
  slug: string[]
  title: string
  description: string
  author?: string
  tags?: string[]
  skill?: string
  timeToRead?: string
  image?: string
}

/**
 * Get the default OG image for a page based on the slug
 * @param slug - the slug of the page
 * @returns relative path of image
 */
export const getOgImage = (props: MetadataProps): string => {
  const { title, description, author, slug, timeToRead, skill, tags } = props

  // List of default og images for different sections
  const imageForSlug = [
    { section: "developers", image: "/images/heroes/developers-hub-hero.jpg" },
    { section: "roadmap", image: "/images/heroes/roadmap-hub-hero.jpg" },
    { section: "guides", image: "/images/heroes/guides-hub-hero.jpg" },
    { section: "community", image: "/images/heroes/community-hero.png" },
    { section: "staking", image: "/images/upgrades/upgrade_rhino.png" },
    { section: "10years", image: "/images/10-year-anniversary/10-year-og.png" },
  ] as const

  if (slug.includes("tutorials") && slug.length > 2) {
    const ogImageSrc = new URL(`${props.locale}/og/tutorial`, SITE_URL)
    title && ogImageSrc.searchParams.set("title", title)
    description && ogImageSrc.searchParams.set("subtitle", description)
    author && ogImageSrc.searchParams.set("author", author)
    timeToRead && ogImageSrc.searchParams.set("timeToRead", timeToRead)
    skill && ogImageSrc.searchParams.set("skill", skill)
    tags && ogImageSrc.searchParams.set("tags", tags?.join(", "))
    return ogImageSrc.toString()
  }

  for (const item of imageForSlug) {
    if (slug.includes(item.section)) return item.image
  }

  return DEFAULT_OG_IMAGE
}

export const getMetadata = async (props: MetadataProps): Promise<Metadata> => {
  const {
    slug,
    author,
    locale,
    image,
    title,
    description: descriptionProps,
  } = props
  const slugString = slug.join("/")
  const t = await getTranslations({ locale, namespace: "common" })

  const description = descriptionProps || t("site-description")
  const siteTitle = t("site-title")

  // Set canonical URL w/ language path to avoid duplicate content
  const url = getFullUrl(locale, slugString)

  // Set x-default URL for hreflang
  const xDefault = getFullUrl(routing.defaultLocale, slugString)

  /* Set fallback ogImage based on path */
  const ogImage = image || getOgImage(props)

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
