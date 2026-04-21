import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"
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
  const t = await getTranslations("page-ethereum-history-founder-and-ownership")

  const url = normalizeUrlForJsonLd(
    locale,
    `/ethereum-history-founder-and-ownership/`
  )

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-ethereum-history-founder-and-ownership-meta-title"),
        description: t(
          "page-ethereum-history-founder-and-ownership-meta-description"
        ),
        url: url,
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
              name: t("page-ethereum-history-founder-and-ownership-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#ethereum-history-founder-and-ownership` },
      },
      {
        "@type": "Article",
        "@id": `${url}#ethereum-history-founder-and-ownership`,
        headline: t("page-ethereum-history-founder-and-ownership-title"),
        description: t(
          "page-ethereum-history-founder-and-ownership-meta-description"
        ),
        image:
          "https://ethereum.org/images/ethereum-history-founder-and-ownership/ethereum-history-founder-and-ownership-hero.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        editor: REFERENCE.ETHEREUM_FOUNDATION,
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
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
