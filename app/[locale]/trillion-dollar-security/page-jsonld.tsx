import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function TrillionDollarSecurityPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-trillion-dollar-security",
  })

  const url = normalizeUrlForJsonLd(locale, `/trillion-dollar-security/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the Trillion-Dollar Security page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-trillion-dollar-security-meta-title"),
    description: t("page-trillion-dollar-security-meta-description"),
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
          name: t("page-trillion-dollar-security-meta-title"),
          item: url,
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }

  // JSON-LD for the security report article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-trillion-dollar-security-title"),
    description: t("page-trillion-dollar-security-meta-description"),
    image: "https://ethereum.org/images/trillion-dollar-security/hero.png",
    author: [ethereumCommunityOrganization],
    contributor: contributorList,
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
    about: {
      "@type": "Thing",
      name: "Ethereum Security",
      description:
        "Comprehensive security analysis of Ethereum's trillion-dollar ecosystem",
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
