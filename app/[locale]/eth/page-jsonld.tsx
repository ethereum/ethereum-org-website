import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function EthPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
}) {
  const t = await getTranslations({
    namespace: "page-eth",
  })

  const url = normalizeUrlForJsonLd(locale, `/eth/`)

  // JSON-LD structured data for the Ether/ETH page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-eth-whats-eth"),
    description: t("page-eth-is-money"),
    url: url,
    inLanguage: locale,
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
          name: t("page-eth-whats-eth"),
          item: normalizeUrlForJsonLd(locale, "/eth/"),
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  // JSON-LD for the article content about Ether
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-eth-whats-eth"),
    description: t("page-eth-is-money"),
    image: "https://ethereum.org/images/eth.png",
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
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    dateModified: lastEditLocaleTimestamp,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    about: {
      "@type": "DigitalCurrency",
      name: "Ether",
      alternateName: ["ETH", "Ethereum"],
      symbol: "ETH",
      blockchain: "Ethereum",
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
