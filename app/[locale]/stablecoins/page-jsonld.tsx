import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StablecoinsPageJsonLD({
  locale,
  features,
  contributors,
}) {
  const t = await getTranslations({
    namespace: "page-stablecoins",
  })

  const url = normalizeUrlForJsonLd(locale, `/stablecoins/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Stablecoins page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-stablecoins-meta-title"),
    description: t("page-stablecoins-meta-description"),
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
          name: t("page-stablecoins-meta-title"),
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
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  // JSON-LD for the stablecoins article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-stablecoins-title"),
    description: t("page-stablecoins-meta-description"),
    image: "https://ethereum.org/images/stablecoins/hero.png",
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    contributor: contributorList,
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
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    about: {
      "@type": "Thing",
      name: "Stablecoins",
      description:
        "Digital currencies pegged to stable assets like the US dollar",
    },
  }

  // JSON-LD for stablecoin types as ItemList
  const stablecoinTypesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Types of Stablecoins",
    description:
      "Different categories of stablecoins based on their backing mechanisms",
    numberOfItems: features.length,
    itemListElement: features.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: feature.title,
        description:
          typeof feature.description === "string"
            ? feature.description
            : feature.title,
        category: "Digital Currency",
        additionalType: "https://schema.org/FinancialProduct",
      },
    })),
  }

  return (
    <PageJsonLD
      structuredData={[webPageJsonLd, articleJsonLd, stablecoinTypesJsonLd]}
    />
  )
}
