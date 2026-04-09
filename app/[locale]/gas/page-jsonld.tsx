import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumCommunityReference,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
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
  const t = await getTranslations("page-gas")

  const url = normalizeUrlForJsonLd(locale, `/gas/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ethereumFoundationOrganization,
      ethereumCommunityOrganization,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-gas-meta-title"),
        description: t("page-gas-meta-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityReference],
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
              name: t("page-gas-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/gas/"),
            },
          ],
        },
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        mainEntity: { "@id": `${url}#gas` },
      },
      {
        "@type": "Article",
        "@id": `${url}#gas`,
        headline: t("page-gas-hero-title"),
        description: t("page-gas-meta-description"),
        contributor: contributorList,
        author: [ethereumCommunityReference],
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
