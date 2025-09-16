import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function CommunityJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-community" })

  const url = normalizeUrlForJsonLd(locale, `/community/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the community page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
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
          name: t("page-community-meta-title"),
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

  const communityResourcesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
    url: url,
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("page-community-card-1-title"),
        description: t("page-community-card-1-description"),
        url: normalizeUrlForJsonLd(locale, "/community/online/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("page-community-card-2-title"),
        description: t("page-community-card-2-description"),
        url: normalizeUrlForJsonLd(locale, "/community/events/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("page-community-card-3-title"),
        description: t("page-community-card-3-description"),
        url: normalizeUrlForJsonLd(locale, "/community/get-involved/"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: t("page-community-card-4-title"),
        description: t("page-community-card-4-description"),
        url: normalizeUrlForJsonLd(locale, "/community/grants/"),
      },
    ],
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
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, communityResourcesJsonLd]} />
  )
}
