import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function EthereumVsBitcoinPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-ethereum-vs-bitcoin",
  })

  const url = normalizeUrlForJsonLd(locale, `/ethereum-vs-bitcoin/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Ethereum vs Bitcoin page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-ethereum-vs-bitcoin-meta-title"),
    description: t("page-ethereum-vs-bitcoin-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [ethereumFoundationOrganization],
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
          name: t("page-ethereum-vs-bitcoin-title"),
          item: url,
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the comparison article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-ethereum-vs-bitcoin-title"),
    description: t("page-ethereum-vs-bitcoin-meta-description"),
    image:
      "https://ethereum.org/images/ethereum-vs-bitcoin/bitcoin-vs-ethereum-robots.png",
    author: [ethereumFoundationOrganization],
    publisher: ethereumFoundationOrganization,
    contributor: contributorList,
    reviewedBy: ethereumFoundationOrganization,
    about: [
      {
        "@type": "Thing",
        name: "Ethereum",
        description:
          "A decentralized platform for applications and digital economies powered by smart contracts",
      },
      {
        "@type": "Thing",
        name: "Bitcoin",
        description:
          "A peer-to-peer digital currency system and the first decentralized cryptocurrency",
      },
    ],
    dateModified: lastEditLocaleTimestamp,
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
