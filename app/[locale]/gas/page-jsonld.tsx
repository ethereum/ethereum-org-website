import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function GasPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-gas",
  })

  const url = normalizeUrlForJsonLd(locale, `/gas/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the gas page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-gas-meta-title"),
    description: t("page-gas-meta-description"),
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
          name: t("page-gas-meta-title"),
          item: normalizeUrlForJsonLd(locale, "/gas/"),
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the article content about gas
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-gas-hero-title"),
    description: t("page-gas-meta-description"),
    contributor: contributorList,
    author: [ethereumFoundationOrganization],
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
    dateModified: lastEditLocaleTimestamp,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
