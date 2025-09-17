import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function WhatIsEthereumPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-what-is-ethereum",
  })

  const url = normalizeUrlForJsonLd(locale, `/what-is-ethereum/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the What is Ethereum page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-what-is-ethereum-meta-title"),
    description: t("page-what-is-ethereum-meta-description"),
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
          name: "Learn",
          item: normalizeUrlForJsonLd(locale, "/learn/"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-what-is-ethereum-meta-title"),
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

  // JSON-LD for the what is ethereum article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-what-is-ethereum-title"),
    description: t("page-what-is-ethereum-meta-description"),
    image: "https://ethereum.org/images/what-is-ethereum.png",
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    contributor: contributorList,
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
      name: "Ethereum",
      description:
        "Comprehensive guide to Ethereum, its network, capabilities, and how it works",
    },
    dateModified: lastEditLocaleTimestamp,
  }

  // JSON-LD for FAQ-style content covering common Ethereum questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Ethereum?",
        acceptedAnswer: {
          "@type": "Answer",
          text: t("page-what-is-ethereum-hero-description-1").replace(
            /<[^>]*>/g,
            ""
          ),
        },
      },
      {
        "@type": "Question",
        name: "How does the Ethereum network work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ethereum is a decentralized network of computers that work together to run applications and store data without a central authority.",
        },
      },
      {
        "@type": "Question",
        name: "What is Ether (ETH)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ether is the native cryptocurrency of the Ethereum network, used to pay for transactions and computational services.",
        },
      },
      {
        "@type": "Question",
        name: "What can you do with Ethereum?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ethereum enables decentralized applications, smart contracts, financial services, gaming, collectibles, and much more.",
        },
      },
      {
        "@type": "Question",
        name: "How is Ethereum different from Bitcoin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While Bitcoin is primarily digital money, Ethereum is a programmable blockchain that can run applications and smart contracts.",
        },
      },
    ],
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd, faqJsonLd]} />
  )
}
