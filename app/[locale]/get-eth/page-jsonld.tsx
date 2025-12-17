import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function GetEthPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-get-eth",
  })

  const url = normalizeUrlForJsonLd(locale, `/get-eth/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the get-eth page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-get-eth-meta-title"),
    description: t("page-get-eth-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [ethereumCommunityOrganization],
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
          name: t("page-get-eth-meta-title"),
          item: normalizeUrlForJsonLd(locale, "/get-eth/"),
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the article content about getting ETH
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-get-eth-where-to-buy-title"),
    description: t("page-get-eth-meta-description"),
    image: "https://ethereum.org/images/get-eth.png", // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
    contributor: contributorList,
    author: [ethereumCommunityOrganization],
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
    dateModified: lastEditLocaleTimestamp,
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
