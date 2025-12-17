import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function RoadmapPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-roadmap",
  })

  const url = normalizeUrlForJsonLd(locale, `/roadmap/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Roadmap page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-roadmap-meta-title"),
    description: t("page-roadmap-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [ethereumCommunityOrganization],
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
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the roadmap article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-roadmap-title"),
    description: t("page-roadmap-meta-description"),
    image: "https://ethereum.org/images/heroes/roadmap-hub-hero.jpg",
    author: [ethereumCommunityOrganization],
    publisher: ethereumFoundationOrganization,
    contributor: contributorList,
    reviewedBy: ethereumFoundationOrganization,
    about: {
      "@type": "Thing",
      name: "Ethereum Roadmap",
      description:
        "The future development and upgrade path of the Ethereum blockchain",
    },
  }

  // JSON-LD for the FAQ section
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd, faqJsonLd]} />
  )
}
