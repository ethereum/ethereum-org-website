import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

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
          name: t("page-ethereum-vs-bitcoin-title"),
          item: url,
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

  // JSON-LD for the comparison article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-ethereum-vs-bitcoin-title"),
    description: t("page-ethereum-vs-bitcoin-meta-description"),
    image:
      "https://ethereum.org/images/ethereum-vs-bitcoin/bitcoin-vs-ethereum-robots.png",
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
    contributor: contributorList,
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
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
