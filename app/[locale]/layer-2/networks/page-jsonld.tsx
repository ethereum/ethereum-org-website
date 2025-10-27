import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function Layer2NetworksPageJsonLD({
  locale,
  layer2Data,
  contributors,
}) {
  const t = await getTranslations({
    namespace: "page-layer-2-networks",
  })

  const url = normalizeUrlForJsonLd(locale, `/layer-2/networks/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Layer 2 Networks page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-layer-2-networks-meta-title"),
    description: t("page-layer-2-networks-hero-description"),
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
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
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

  // JSON-LD for Layer 2 Networks listing
  const networksItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
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
          network.description || `${network.name} Layer 2 network on Ethereum`,
        url: network.website,
        applicationCategory: "Blockchain Network",
        operatingSystem: "Ethereum",
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
            value: network.txCosts ? `$${network.txCosts.toFixed(2)}` : "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Supported Wallets",
            value: network.walletsSupportedCount || "N/A",
          },
        ],
      },
    })),
  }

  return <PageJsonLD structuredData={[webPageJsonLd, networksItemListJsonLd]} />
}
