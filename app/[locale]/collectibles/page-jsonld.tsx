import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { COLLECTIBLES_BASE_URL } from "./constants"
import type { Badge, Stats } from "./types"

export default async function CollectiblesJsonLD({
  locale,
  badges,
  stats,
  contributors,
}: {
  locale: string
  badges: Badge[]
  stats: Stats
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-collectibles" })

  const url = normalizeUrlForJsonLd(locale, `/collectibles/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the collectibles page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-collectibles-hero-header"),
    description: t("page-collectibles-hero-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: normalizeUrlForJsonLd(locale, "/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t("page-collectibles-hero-header"),
          item: url,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  const collectiblesCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-collectibles-hero-header"),
    description: t("page-collectibles-hero-description"),
    url: url,
    numberOfItems: stats.collectiblesCount || badges.length,
    itemListElement: badges.slice(0, 10).map((badge, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: badge.name || `Badge ${index + 1}`,
      description: badge.description || "Ethereum community badge",
      url: badge.link || `${COLLECTIBLES_BASE_URL}/badge/${badge.id}`,
      image: badge.image,
    })),
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Total Collectors",
        value: stats.uniqueAddressesCount || 0,
      },
      {
        "@type": "PropertyValue",
        name: "Total Minted",
        value: stats.collectorsCount || 0,
      },
      {
        "@type": "PropertyValue",
        name: "Unique Badges",
        value: stats.collectiblesCount || badges.length,
      },
    ],
  }

  return (
    <PageJsonLD
      structuredData={[webPageJsonLd, collectiblesCollectionJsonLd]}
    />
  )
}
