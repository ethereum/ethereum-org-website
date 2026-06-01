import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function RoadmapPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-roadmap")

  const url = normalizeUrlForJsonLd(locale, `/roadmap/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#roadmap` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-roadmap-meta-title"),
        description: t("page-roadmap-meta-description"),
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
              name: t("page-roadmap-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: t("page-roadmap-title"),
        description: t("page-roadmap-meta-description"),
        image:
          "https://ethereum.org/images/heroes/futuristic-night-cityscape-beacon-overlook-moon.jpg",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: {
          "@type": "Thing",
          name: "Ethereum Roadmap",
          description:
            "The future development and upgrade path of the Ethereum blockchain",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#roadmap-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: t("page-roadmap-faq-1-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-roadmap-faq-1-p1")} ${t("page-roadmap-faq-1-p1-continued")} ${t("page-roadmap-faq-1-p2")}`.replace(
                /<[^>]*>/g,
                ""
              ),
            },
          },
          {
            "@type": "Question",
            name: t("page-roadmap-faq-2-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-roadmap-faq-2-p1")} ${t("page-roadmap-faq-2-p1-strong")} ${t("page-roadmap-faq-2-p1-continued")} ${t("page-roadmap-faq-2-p2")}`.replace(
                /<[^>]*>/g,
                ""
              ),
            },
          },
          {
            "@type": "Question",
            name: t("page-roadmap-faq-3-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-roadmap-faq-3-p1").replace(/<[^>]*>/g, ""),
            },
          },
          {
            "@type": "Question",
            name: t("page-roadmap-faq-4-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-roadmap-faq-4-p1").replace(/<[^>]*>/g, ""),
            },
          },
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
