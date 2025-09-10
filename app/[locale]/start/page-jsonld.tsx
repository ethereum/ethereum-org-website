import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StartPageJsonLD({
  locale,
}: {
  locale: Lang | undefined
}) {
  const t = await getTranslations({
    namespace: "page-start",
  })

  const url = normalizeUrlForJsonLd(locale, `/start/`)

  // JSON-LD structured data for the Start page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-start-meta-title"),
    description: t("page-start-meta-description"),
    url: url,
    inLanguage: locale,
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
          name: t("page-start-meta-title"),
          item: url,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
  }

  // JSON-LD for the start guide article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-start-title"),
    description: t("page-start-meta-description"),
    image: "https://ethereum.org/images/heroes/developers-hub-hero.jpg",
    author: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    about: {
      "@type": "Thing",
      name: "Getting Started with Ethereum",
      description:
        "Beginner's guide to getting started with Ethereum, crypto wallets, and web3",
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
