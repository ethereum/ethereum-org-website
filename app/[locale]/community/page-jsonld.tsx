import { getTranslations } from "next-intl/server"

import { FileContributor, StoryPreview } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { SITE_URL } from "@/lib/constants"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function CommunityJsonLD({
  locale,
  contributors,
  featuredStories,
}: {
  locale: string
  contributors: FileContributor[]
  featuredStories: StoryPreview[]
}) {
  const t = await getTranslations("page-community")

  const url = normalizeUrlForJsonLd(locale, `/community/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // Featured stories surfaced by the "Community stories" section, modeled as
  // Articles so the curated set is discoverable from the hub's graph.
  const storyItems = featuredStories.map((story, index) => {
    const storyUrl = normalizeUrlForJsonLd(locale, `/stories/${story.slug}/`)
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        "@id": storyUrl,
        headline: story.title,
        description: story.description,
        url: storyUrl,
        ...(story.image && { image: `${SITE_URL}${story.image}` }),
        ...(story.published && { datePublished: story.published }),
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
      },
    }
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-community-meta-title"),
        description: t("page-community-meta-description"),
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
              name: t("page-community-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#resources` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#resources`,
        name: t("page-community-meta-title"),
        description: t("page-community-meta-description"),
        url,
        numberOfItems: 5,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("page-community-card-1-title"),
            description: t("page-community-card-1-description"),
            url: normalizeUrlForJsonLd(locale, "/community/online/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("page-community-conferences-title"),
            description: t("page-community-conferences-subtitle"),
            url: normalizeUrlForJsonLd(locale, "/community/events/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("page-community-why-get-involved-title"),
            description: t(
              "page-community-why-get-involved-card-3-description"
            ),
            url: normalizeUrlForJsonLd(locale, "/community/get-involved/"),
          },
          {
            "@type": "ListItem",
            position: 4,
            name: t("page-community-open-source"),
            description: t("page-community-get-paid-subtitle"),
            url: normalizeUrlForJsonLd(locale, "/community/grants/"),
          },
          {
            "@type": "ListItem",
            position: 5,
            name: t("page-community-contribute"),
            description: t("page-community-contribute-description"),
            url: normalizeUrlForJsonLd(locale, "/contributing/"),
          },
        ],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
      },
      ...(storyItems.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#community-stories`,
              name: t("page-community-stories-title"),
              description: t("page-community-stories-subtitle"),
              url,
              numberOfItems: storyItems.length,
              itemListElement: storyItems,
              publisher: REFERENCE.ETHEREUM_FOUNDATION,
            },
          ]
        : []),
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
