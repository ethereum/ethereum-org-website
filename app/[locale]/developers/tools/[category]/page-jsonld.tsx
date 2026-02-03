import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import type { DeveloperTool, DeveloperToolCategorySlug } from "../types"

export default async function DevelopersToolsCategoryJsonLD({
  locale,
  category,
  categoryTools,
  contributors,
}: {
  locale: string
  category: DeveloperToolCategorySlug
  categoryTools: DeveloperTool[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-developers-tools" })

  const url = normalizeUrlForJsonLd(locale, `/developers/tools/${category}`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t(`page-developers-tools-category-${category}-title`),
        description: t(
          `page-developers-tools-category-${category}-meta-description`
        ),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ethereum.org/#website",
          name: "ethereum.org",
          url: "https://ethereum.org",
        },
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
              name: t(`page-developers-tools-category-${category}-title`),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#category-tools` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#category-tools`,
        name: t(`page-developers-tools-category-${category}-title`),
        description: t(
          `page-developers-tools-category-${category}-description`
        ),
        url: url,
        numberOfItems: categoryTools.length,
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
