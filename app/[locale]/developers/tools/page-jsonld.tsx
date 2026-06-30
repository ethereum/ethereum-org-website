import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function DevelopersToolsJsonLD({
  locale,
  contributors,
  categories,
  categoryLabels,
}: {
  locale: string
  contributors: FileContributor[]
  categories: { id: string; name: string; description: string }[]
  categoryLabels: Record<string, string>
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const url = normalizeUrlForJsonLd(locale, "/developers/tools/")

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
        name: t("page-developers-tools-meta-title"),
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
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#developer-tools` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#developer-tools`,
        name: t("page-developers-tools-categories-title"),
        description: t("page-developers-tools-meta-description"),
        url: url,
        numberOfItems: categories.length,
        itemListElement: categories.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: categoryLabels[category.id] || category.name,
          description: category.description,
          url: normalizeUrlForJsonLd(
            locale,
            `/developers/tools/${category.id}/`
          ),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
