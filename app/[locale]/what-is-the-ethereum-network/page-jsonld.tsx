import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function WhatIsTheEthereumNetworkPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-what-is-the-ethereum-network",
  })

  const url = normalizeUrlForJsonLd(locale, `/what-is-the-ethereum-network/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-what-is-ethereum-network-meta-title"),
        description: t("page-what-is-ethereum-network-meta-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ethereum.org/#website",
          name: "ethereum.org",
          url: "https://ethereum.org",
        },
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
              name: "Learn",
              item: normalizeUrlForJsonLd(locale, "/learn/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-what-is-ethereum-network-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#what-is-the-ethereum-network` },
      },
      {
        "@type": "Article",
        "@id": `${url}#what-is-the-ethereum-network`,
        headline: t("page-what-is-ethereum-network-title"),
        description: t("page-what-is-ethereum-network-meta-description"),
        image: "https://ethereum.org/images/what-is-ethereum-network.png",
        author: [ethereumCommunityOrganization],
        publisher: ethereumFoundationOrganization,
        contributor: contributorList,
        reviewedBy: ethereumFoundationOrganization,
        about: {
          "@type": "Thing",
          name: "Ethereum Network",
          description:
            "Comprehensive guide to the Ethereum network, including fees, staking, layer 2 solutions, and live network data",
        },
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
