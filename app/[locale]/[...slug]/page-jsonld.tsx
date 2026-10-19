import { FileContributor, Frontmatter } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { getBreadcrumbListJsonLd } from "@/lib/jsonld/breadcrumbs"
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"
import { resolveAuthorsFromFrontmatter } from "@/lib/jsonld/utils"

const getUrlBreadcrumbItems = (locale: string, slug: string) => {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: normalizeUrlForJsonLd(locale, "/"),
    },
  ]
  let currentPath = ""
  slug
    .split("/")
    .filter(Boolean)
    .forEach((part, index) => {
      currentPath += "/" + part
      items.push({
        "@type": "ListItem",
        position: index + 2,
        name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
        item: normalizeUrlForJsonLd(locale, `${currentPath}/`),
      })
    })
  return items
}

export default async function SlugJsonLD({
  locale,
  slug,
  frontmatter,
  contributors,
  layout,
}: {
  locale: string
  slug: string
  layout: string
  frontmatter: Frontmatter
  contributors: FileContributor[]
}) {
  const url = normalizeUrlForJsonLd(locale, `/${slug}/`)

  // Docs pages render a sidebar instead of breadcrumbs, so their trail
  // follows the URL
  const breadcrumb =
    layout === "docs"
      ? {
          "@type": "BreadcrumbList",
          itemListElement: getUrlBreadcrumbItems(locale, slug),
        }
      : await getBreadcrumbListJsonLd(
          locale,
          slug,
          layout === "tutorial"
            ? frontmatter.breadcrumb || frontmatter.title
            : undefined
        )

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
        breadcrumb,
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
