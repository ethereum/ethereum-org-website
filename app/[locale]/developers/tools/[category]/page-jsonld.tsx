import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import type { DeveloperTool } from "../types"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function DevelopersToolsCategoryJsonLD({
  locale,
  category,
  categoryLabel,
  categoryTools,
  contributors,
}: {
  locale: string
  category: string
  categoryLabel: string
  categoryTools: DeveloperTool[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const url = normalizeUrlForJsonLd(locale, `/developers/tools/${category}`)

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
        name: categoryLabel,
        description: t("page-developers-tools-meta-description"),
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
              name: "Developers",
              item: normalizeUrlForJsonLd(locale, "/developers/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-developers-tools-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/developers/tools/"),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: categoryLabel,
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#category-tools` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#category-tools`,
        name: categoryLabel,
        description: t("page-developers-tools-meta-description"),
        url: url,
        numberOfItems: Math.min(categoryTools.length, 10),
        itemListElement: categoryTools.slice(0, 10).map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
          description: tool.description,
          url: tool.website,
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
