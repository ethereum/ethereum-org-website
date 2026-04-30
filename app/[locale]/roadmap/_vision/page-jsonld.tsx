import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function RoadmapVisionPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string | null
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-roadmap-vision")

  const url = normalizeUrlForJsonLd(locale, `/roadmap/vision/`)

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
        name: t("page-roadmap-vision-title"),
        description: t("page-roadmap-vision-subtitle"),
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
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#roadmap-vision` },
      },
      {
        "@type": "Article",
        "@id": `${url}#roadmap-vision`,
        headline: t("page-roadmap-vision-title"),
        description: t("page-roadmap-vision-subtitle"),
        image: "https://ethereum.org/images/upgrades/oldship.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: {
          "@type": "Thing",
          name: "Ethereum Vision",
          description:
            "The vision for Ethereum's future development and capabilities",
        },
        ...(lastEditLocaleTimestamp && {
          dateModified: lastEditLocaleTimestamp,
        }),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
