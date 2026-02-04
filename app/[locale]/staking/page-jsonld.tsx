import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StakingPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-staking",
  })

  const url = normalizeUrlForJsonLd(locale, `/staking/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-staking-meta-title"),
        description: t("page-staking-meta-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ethereum.org/#website",
          name: "ethereum.org",
          url: "https://ethereum.org",
        },
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#staking` },
      },
      {
        "@type": "Article",
        "@id": `${url}#staking`,
        headline: t("page-staking-hero-title"),
        description: t("page-staking-meta-description"),
        image: "https://ethereum.org/images/upgrades/upgrade_rhino.png",
        author: [ethereumCommunityOrganization],
        contributor: contributorList,
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
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
