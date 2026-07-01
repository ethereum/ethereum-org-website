import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  type DeveloperTool,
  getToolKey,
  getToolPrimaryUrl,
} from "@/lib/utils/developerToolsData"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function DevelopersToolsCategoryJsonLD({
  locale,
  category,
  categoryLabel,
  categoryDescription,
  categoryTools,
  contributors,
}: {
  locale: string
  category: string
  categoryLabel: string
  categoryDescription: string
  categoryTools: DeveloperTool[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/developers/tools/categories/${category}`
  )

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
        description: categoryDescription,
        url: url,
        // Total size of the list; itemListElement below is a truncated subset.
        numberOfItems: categoryTools.length,
        itemListElement: categoryTools.slice(0, 10).map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            // Prefer the tool's own site, fall back to its top repo, and as a
            // last resort its canonical page here (some tools have neither a
            // website nor a repo).
            url:
              getToolPrimaryUrl(tool) ||
              normalizeUrlForJsonLd(
                locale,
                `/developers/tools/${getToolKey(tool)}/`
              ),
            applicationCategory: "DeveloperApplication",
            applicationSubCategory: categoryLabel,
            ...(tool.thumbnail_url || tool.banner_url
              ? { image: tool.thumbnail_url || tool.banner_url }
              : {}),
          },
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
