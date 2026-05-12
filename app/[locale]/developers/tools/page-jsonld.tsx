import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { DEV_TOOL_CATEGORIES } from "./constants"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function DevelopersToolsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-developers-tools")

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
        url,
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
        url,
        numberOfItems: DEV_TOOL_CATEGORIES.length,
        itemListElement: DEV_TOOL_CATEGORIES.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: t(`page-developers-tools-category-${category.slug}-title`),
          description: t(
            `page-developers-tools-category-${category.slug}-description`
          ),
          url: normalizeUrlForJsonLd(
            locale,
            `/developers/tools/${category.slug}`
          ),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
