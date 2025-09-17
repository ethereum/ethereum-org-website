import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function Layer2PageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-layer-2",
  })

  const url = normalizeUrlForJsonLd(locale, `/layer-2/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Layer 2 page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-layer-2-meta-title"),
    description: t("page-layer-2-meta-description"),
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
          name: t("page-layer-2-meta-title"),
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

  // JSON-LD for the article content about Layer 2
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-layer-2-hero-title"),
    description: t("page-layer-2-meta-description"),
    image: "https://ethereum.org/images/layer-2/learn-hero.png", // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
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
  }

  // JSON-LD for FAQ section
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("page-layer-2-faq-ExpandableCard-1-title"),
        acceptedAnswer: {
          "@type": "Answer",
          text: `${t("page-layer-2-faq-ExpandableCard-1-description-1")} ${t("page-layer-2-faq-ExpandableCard-1-description-2")}`,
        },
      },
      {
        "@type": "Question",
        name: t("page-layer-2-faq-ExpandableCard-2-title"),
        acceptedAnswer: {
          "@type": "Answer",
          text: `${t("page-layer-2-faq-ExpandableCard-2-description-1")} ${t("page-layer-2-faq-ExpandableCard-2-description-2")}`,
        },
      },
      {
        "@type": "Question",
        name: t("page-layer-2-faq-ExpandableCard-3-title"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("page-layer-2-faq-ExpandableCard-3-description"),
        },
      },
      {
        "@type": "Question",
        name: t("page-layer-2-faq-ExpandableCard-4-title"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("page-layer-2-faq-ExpandableCard-4-description"),
        },
      },
    ],
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd, faqJsonLd]} />
  )
}
