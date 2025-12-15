import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { ethereumFoundationOrganization } from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function EnterprisePageJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-enterprise",
  })

  const url = normalizeUrlForJsonLd(locale, `/enterprise/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // JSON-LD structured data for the enterprise page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-enterprise-hero-title"),
    description: t("page-enterprise-metadata-description"),
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
          name: t("page-enterprise-hero-breadcrumb"),
          item: normalizeUrlForJsonLd(locale, "/enterprise/"),
        },
      ],
    },
    publisher: ethereumFoundationOrganization,
    reviewedBy: ethereumFoundationOrganization,
  }
  return <PageJsonLD structuredData={[webPageJsonLd]} />
}
