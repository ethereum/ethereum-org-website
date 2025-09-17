import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

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

  // JSON-LD structured data for the Staking page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-staking-meta-title"),
    description: t("page-staking-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
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
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
  }

  // JSON-LD for the staking article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-staking-hero-title"),
    description: t("page-staking-meta-description"),
    image: "https://ethereum.org/images/upgrades/upgrade_rhino.png",
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    contributor: contributorList,
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
    about: {
      "@type": "Thing",
      name: "Ethereum Staking",
      description:
        "Guide to staking ETH, earning rewards, and securing the Ethereum network",
    },
    dateModified: lastEditLocaleTimestamp,
  }

  // JSON-LD for the FAQ section
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd, faqJsonLd]} />
  )
}
