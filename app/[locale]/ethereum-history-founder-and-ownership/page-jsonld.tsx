import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function EthereumHistoryFounderAndOwnershipPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-ethereum-history-founder-and-ownership",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/ethereum-history-founder-and-ownership/`
  )

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Ethereum History, Founder and Ownership page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-ethereum-history-founder-and-ownership-meta-title"),
    description: t(
      "page-ethereum-history-founder-and-ownership-meta-description"
    ),
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
          name: t("page-ethereum-history-founder-and-ownership-title"),
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

  // JSON-LD for the history and founder article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-ethereum-history-founder-and-ownership-title"),
    description: t(
      "page-ethereum-history-founder-and-ownership-meta-description"
    ),
    image:
      "https://ethereum.org/images/ethereum-history-founder-and-ownership/ethereum-history-founder-and-ownership-hero.png",
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
        "@type": "Person",
        name: "Vitalik Buterin",
        description:
          "The founder of Ethereum who conceived the idea in late 2013 and published the Ethereum whitepaper in 2014",
      },
      {
        "@type": "Thing",
        name: "Blockchain History",
        description:
          "The historical development and launch of the Ethereum blockchain network",
      },
    ],
    dateModified: lastEditLocaleTimestamp,
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
