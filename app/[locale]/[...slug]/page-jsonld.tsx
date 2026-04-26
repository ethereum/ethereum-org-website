import { FileContributor, Frontmatter } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"
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

  // Acronym overrides for slug-derived breadcrumb labels.
  // Slugs like "ai-agents" are naively title-cased to "Ai agents";
  // this map ensures known acronyms render correctly in JSON-LD.
  const BREADCRUMB_LABEL_OVERRIDES: Record<string, string> = {
    "ai-agents": "AI agents",
  }

  // Add breadcrumb items for each part of the slug path
  const slugParts = slug.split("/").filter(Boolean)
  let currentPath = ""

  slugParts.forEach((part, index) => {
    currentPath += "/" + part
    const defaultName =
      part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")
    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name: BREADCRUMB_LABEL_OVERRIDES[part] ?? defaultName,
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
        "@type": "Article",
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
      ...(frontmatter.faqItems?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: frontmatter.faqItems.map(
                (item: { question: string; answer: string }) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })
              ),
            },
          ]
        : []),
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
