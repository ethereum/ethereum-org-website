import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function GasPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-gas",
  })

  const url = normalizeUrlForJsonLd(locale, `/gas/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the gas page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-gas-meta-title"),
    description: t("page-gas-meta-description"),
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
          name: t("page-gas-meta-title"),
          item: normalizeUrlForJsonLd(locale, "/gas/"),
        },
      ],
    },
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
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
  }

  // JSON-LD for the article content about gas
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-gas-hero-title"),
    description: t("page-gas-meta-description"),
    contributor: contributorList,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
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
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
    dateModified: lastEditLocaleTimestamp,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
