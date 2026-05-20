import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function StakingPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-staking")

  const url = normalizeUrlForJsonLd(locale, `/staking/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#staking` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-staking-meta-title"),
        description: t("page-staking-meta-description"),
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
              name: t("page-staking-meta-title"),
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
        headline: t("page-staking-hero-title"),
        description: t("page-staking-meta-description"),
        image: "https://ethereum.org/images/upgrades/upgrade_rhino.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        contributor: contributorList,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        about: {
          "@type": "Thing",
          name: "Ethereum Staking",
          description:
            "Guide to staking ETH, earning rewards, and securing the Ethereum network",
        },
        dateModified: lastEditLocaleTimestamp,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#staking-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: t("page-staking-faq-4-question"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-staking-faq-4-answer-p1")} ${t("page-staking-faq-4-answer-p2")} ${t("page-staking-faq-4-answer-p3")}`.replace(
                /<[^>]*>/g,
                ""
              ),
            },
          },
          {
            "@type": "Question",
            name: t("page-staking-faq-5-question"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-staking-faq-5-answer-p1")} ${t("page-staking-faq-5-answer-p2")}`.replace(
                /<[^>]*>/g,
                ""
              ),
            },
          },
          {
            "@type": "Question",
            name: t("page-staking-faq-1-question"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-staking-faq-1-answer").replace(/<[^>]*>/g, ""),
            },
          },
          {
            "@type": "Question",
            name: t("page-staking-faq-2-question"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("page-staking-faq-2-answer").replace(/<[^>]*>/g, ""),
            },
          },
          {
            "@type": "Question",
            name: t("page-staking-faq-3-question"),
            acceptedAnswer: {
              "@type": "Answer",
              text: `${t("page-staking-faq-3-answer-p1")} ${t("page-staking-faq-3-answer-p2")}`.replace(
                /<[^>]*>/g,
                ""
              ),
            },
          },
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
