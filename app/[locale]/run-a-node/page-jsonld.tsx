import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function RunANodePageJsonLD({
  locale,
  lastEditLocaleTimestamp,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
}) {
  const t = await getTranslations({
    namespace: "page-run-a-node",
  })

  const url = normalizeUrlForJsonLd(locale, `/run-a-node/`)

  // JSON-LD structured data for the Run a Node page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-run-a-node-title"),
    description: t("page-run-a-node-hero-subtitle"),
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
          name: t("page-run-a-node-title"),
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

  // JSON-LD for the run a node article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-run-a-node-title"),
    description: t("page-run-a-node-hero-subtitle"),
    image: "https://ethereum.org/images/run-a-node/ethereum-inside.png",
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
      name: "Running an Ethereum Node",
      description:
        "Guide to running your own Ethereum node, benefits, and requirements",
    },
    dateModified: lastEditLocaleTimestamp,
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
