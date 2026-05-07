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
  const url = normalizeUrlForJsonLd(locale, `/${slug}`)

  // Generate breadcrumb items for the slug path
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: normalizeUrlForJsonLd(locale, "/"),
    },
  ]

  // Add breadcrumb items for each part of the slug path
  const slugParts = slug.split("/").filter(Boolean)
  let currentPath = ""

  slugParts.forEach((part, index) => {
    currentPath += "/" + part
    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      ...authorGraphNodes,
      {
        "@type": "WebPage",
        "@id": url,
        name: frontmatter.title,
        description: frontmatter.description,
        url: url,
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
        mainEntity: { "@id": `${url}#article` },
      },
      {
        "@type": slug.startsWith("developers/blog") ? "BlogPosting" : "Article",
        "@id": `${url}#article`,
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
