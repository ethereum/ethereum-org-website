import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StartPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-start",
  })

  const url = normalizeUrlForJsonLd(locale, `/start/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Start page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-start-meta-title"),
    description: t("page-start-meta-description"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [ethereumFoundationOrganization],
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
          name: t("page-start-meta-title"),
          item: url,
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the start guide article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-start-title"),
    description: t("page-start-meta-description"),
    image: "https://ethereum.org/images/heroes/developers-hub-hero.jpg",
    author: [ethereumFoundationOrganization],
    publisher: ethereumFoundationOrganization,
    contributor: contributorList,
    reviewedBy: ethereumFoundationOrganization,
    about: {
      "@type": "Thing",
      name: "Getting Started with Ethereum",
      description:
        "Beginner's guide to getting started with Ethereum, crypto wallets, and web3",
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
