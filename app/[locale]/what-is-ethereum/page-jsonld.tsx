import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

export default async function WhatIsEthereumPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-what-is-ethereum")

  const url = normalizeUrlForJsonLd(locale, `/what-is-ethereum/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#what-is-ethereum` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-what-is-ethereum-meta-title"),
        description: t("page-what-is-ethereum-meta-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
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
              name: t("page-what-is-ethereum-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: t("page-what-is-ethereum-title"),
        description: t("page-what-is-ethereum-meta-description"),
        image: "https://ethereum.org/images/what-is-ethereum.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: {
          "@type": "Thing",
          name: "Ethereum",
          description:
            "Comprehensive guide to Ethereum, its network, capabilities, and how it works",
        },
        dateModified: lastEditLocaleTimestamp,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#what-is-ethereum-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Ethereum?",
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-what-is-ethereum-hero-description-1").replace(
                /<[^>]*>/g,
                ""
              ),
            },
          },
          {
            "@type": "Question",
            name: "How does the Ethereum network work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ethereum is a decentralized network of computers that work together to run applications and store data without a central authority.",
            },
          },
          {
            "@type": "Question",
            name: "What is Ether (ETH)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ether is the native cryptocurrency of the Ethereum network, used to pay for transactions and computational services.",
            },
          },
          {
            "@type": "Question",
            name: "What can you do with Ethereum?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ethereum enables decentralized applications, smart contracts, financial services, gaming, collectibles, and much more.",
            },
          },
          {
            "@type": "Question",
            name: "How is Ethereum different from Bitcoin?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While Bitcoin is primarily digital money, Ethereum is a programmable blockchain that can run applications and smart contracts.",
            },
          },
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
