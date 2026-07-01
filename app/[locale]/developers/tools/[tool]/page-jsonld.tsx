import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  type DeveloperToolWithCategory,
  getToolKey,
  getToolPackageHrefs,
  getToolPrimaryUrl,
  getToolRepoHrefs,
} from "@/lib/utils/developerToolsData"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function DevelopersToolsToolJsonLD({
  locale,
  tool,
  categoryLabel,
  contributors,
}: {
  locale: string
  tool: DeveloperToolWithCategory
  categoryLabel: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/developers/tools/${getToolKey(tool)}/`
  )
  const categoryUrl = normalizeUrlForJsonLd(
    locale,
    `/developers/tools/categories/${tool.categoryId}/`
  )

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const repoHrefs = getToolRepoHrefs(tool)
  const externalUrl = getToolPrimaryUrl(tool)
  // Other web presences of the tool: socials, repos, packages.
  const sameAs = [
    tool.twitter,
    ...repoHrefs,
    ...getToolPackageHrefs(tool),
  ].filter(Boolean)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: tool.name,
        description: tool.description,
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
              item: categoryUrl,
            },
            {
              "@type": "ListItem",
              position: 5,
              name: tool.name,
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#tool` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#tool`,
        name: tool.name,
        description: tool.description,
        ...(externalUrl ? { url: externalUrl } : {}),
        ...(tool.thumbnail_url || tool.banner_url
          ? { image: tool.thumbnail_url || tool.banner_url }
          : {}),
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: categoryLabel,
        ...(repoHrefs[0] ? { codeRepository: repoHrefs[0] } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
