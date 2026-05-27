import type { FileContributor, IBlogPost } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function BlogPageJsonLD({
  locale,
  blogPosts,
  contributors,
}: {
  locale: string
  blogPosts: IBlogPost[]
  contributors: FileContributor[]
}) {
  const url = normalizeUrlForJsonLd(locale, "/latest")

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const blogPostItems = blogPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: normalizeUrlForJsonLd(locale, post.href),
    name: post.title,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name: "Builder updates",
        description:
          "Builder resources, tools, and developments from the Ethereum ecosystem.",
        url,
        inLanguage: locale,
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
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
              item: normalizeUrlForJsonLd(locale, "/developers"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Builder updates",
              item: url,
            },
          ],
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: blogPosts.length,
          itemListElement: blogPostItems,
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
