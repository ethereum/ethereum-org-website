import { getTranslations } from "next-intl/server"

import { FileContributor, Frontmatter } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"
import { resolveAuthorsFromFrontmatter } from "@/lib/jsonld/utils"

export default async function SlugJsonLD({
  locale,
  slug,
  frontmatter,
  contributors,
}: {
  locale: string
  slug: string
  frontmatter: Frontmatter
  contributors: FileContributor[]
}) {
  const t = await getTranslations("common")

  const url = normalizeUrlForJsonLd(locale, `/${slug}`)

  // Breadcrumb labels are sourced from `common.json` (same keys the UI
  // Breadcrumbs component uses), falling back to a title-cased slug fragment
  // when no translation exists. This keeps JSON-LD localized and avoids
  // hand-maintained acronym overrides (e.g. "ai-agents" -> "AI agents").
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: t.has("home") ? t("home") : "Home",
      item: normalizeUrlForJsonLd(locale, "/"),
    },
  ]

  const slugParts = slug.split("/").filter(Boolean)
  let currentPath = ""

  slugParts.forEach((part, index) => {
    currentPath += "/" + part
    const defaultName =
      part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")
    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name: t.has(part) ? t(part) : defaultName,
      item: normalizeUrlForJsonLd(locale, currentPath),
    })
  })

  // Map contributors to schema.org format
  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const { authorGraphNodes, authorIds } = resolveAuthorsFromFrontmatter(
    frontmatter.authors ?? frontmatter.author
  )

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#article` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      ...authorGraphNodes,
      {
        "@type": "WebPage",
        ...webPageId,
        name: frontmatter.title,
        description: frontmatter.description,
        url,
        inLanguage: locale,
        author: authorIds,
        contributor: contributorList,
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: frontmatter.title,
        description: frontmatter.description,
        image: frontmatter.image
          ? `https://ethereum.org${frontmatter.image}`
          : undefined,
        author: authorIds,
        contributor: contributorList,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        dateModified: frontmatter.published,
        mainEntityOfPage: url,
        about: {
          "@type": "Thing",
          name: frontmatter.title,
          description: frontmatter.description,
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
