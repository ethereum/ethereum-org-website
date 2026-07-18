import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function Layer2NetworksPageJsonLD({
  locale,
  layer2Data,
  contributors,
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
              name: "Layer 2",
              item: normalizeUrlForJsonLd(locale, "/layer-2/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-layer-2-networks-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#networks-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#networks-list`,
        name: t("page-layer-2-networks-meta-title"),
        description: t("page-layer-2-networks-hero-description"),
        numberOfItems: layer2Data.length,
        itemListElement: layer2Data.map((network, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: network.name,
            description:
              network.description ||
              `${network.name} Layer 2 network on Ethereum`,
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
                value: network.rollupType || "Layer 2",
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
                value: network.walletsSupportedCount || "N/A",
              },
            ],
          },
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
