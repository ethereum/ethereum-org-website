import { getTranslations } from "next-intl/server"

import type { CatalogNetwork, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import type { NetworkCardData } from "@/lib/utils/networkData"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { getBreadcrumbListJsonLd } from "@/lib/jsonld/breadcrumbs"
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function Layer2NetworksPageJsonLD({
  locale,
  networks,
  cards,
  contributors,
}: {
  locale: string
  networks: CatalogNetwork[]
  /** Index-aligned with `networks` */
  cards: NetworkCardData[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-layer-2-networks")

  const url = normalizeUrlForJsonLd(locale, `/layer-2/networks/`)

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
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-layer-2-networks-meta-title"),
        description: t("page-layer-2-networks-hero-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: await getBreadcrumbListJsonLd(locale, "layer-2/networks"),
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#networks-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#networks-list`,
        name: t("page-layer-2-networks-meta-title"),
        description: t("page-layer-2-networks-hero-description"),
        numberOfItems: networks.length,
        itemListElement: networks.map((network, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: network.name,
            description: cards[index].description,
            url: network.website,
            applicationCategory: "Blockchain Network",
            operatingSystem: "Ethereum",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Network Type",
                value: network.networkType,
              },
              {
                "@type": "PropertyValue",
                name: "Maturity Level",
                value: network.networkMaturity,
              },
              {
                "@type": "PropertyValue",
                name: "Total Value Locked (TVL)",
                value: network.tvl ? `$${network.tvl.toLocaleString()}` : "N/A",
              },
              {
                "@type": "PropertyValue",
                name: "Daily Transaction Cost",
                value: network.txCosts
                  ? `$${network.txCosts.toFixed(2)}`
                  : "N/A",
              },
              {
                "@type": "PropertyValue",
                name: "Supported Wallets",
                value: cards[index].walletSupport,
              },
            ],
          },
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
