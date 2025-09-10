import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function RoadmapVisionPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
}) {
  const t = await getTranslations({
    namespace: "page-roadmap-vision",
  })

  const url = normalizeUrlForJsonLd(locale, `/roadmap/vision/`)

  // JSON-LD structured data for the Vision page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-roadmap-vision-title"),
    description: t("page-roadmap-vision-subtitle"),
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
          name: "Roadmap",
          item: normalizeUrlForJsonLd(locale, "/roadmap/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-roadmap-vision-title"),
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

  // JSON-LD for the vision article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-roadmap-vision-title"),
    description: t("page-roadmap-vision-subtitle"),
    image: "https://ethereum.org/images/upgrades/oldship.png",
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
      name: "Ethereum Vision",
      description:
        "The vision for Ethereum's future development and capabilities",
    },
    dateModified: lastEditLocaleTimestamp,
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
