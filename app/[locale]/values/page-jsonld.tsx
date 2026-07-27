import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function ValuesPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-values")
  const tCommon = await getTranslations("common")

  const url = normalizeUrlForJsonLd(locale, `/values/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#values` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-values-meta-title"),
        description: t("page-values-meta-description"),
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
              name: tCommon("home"),
              item: normalizeUrlForJsonLd(locale, "/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: t("page-values-meta-title"),
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
        headline: t("page-values-hero-header"),
        description: t("page-values-meta-description"),
        image: "https://ethereum.org/images/heroes/layer-2-hub-hero.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: {
          "@type": "Thing",
          name: t("page-values-meta-title"),
          description: t("page-values-meta-description"),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#values-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: t("page-values-faq-1-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-values-faq-1-p1"),
            },
          },
          {
            "@type": "Question",
            name: t("page-values-faq-2-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-values-faq-2-p1"),
            },
          },
          {
            "@type": "Question",
            name: t("page-values-faq-3-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-values-faq-3-p1"),
            },
          },
          {
            "@type": "Question",
            name: t("page-values-faq-4-title"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-values-faq-4-p1"),
            },
          },
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
