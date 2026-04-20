import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  baseGraphNodes,
  ethereumCommunityReference,
  ethereumFoundationReference,
  ethereumOrgWebSiteReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function FoundersPageJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-founders")

  const url = normalizeUrlForJsonLd(locale, `/founders/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraphNodes,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-founders-metadata-title"),
        description: t("page-founders-metadata-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityReference],
        isPartOf: ethereumOrgWebSiteReference,
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
              name: t("page-founders-metadata-title"),
              item: normalizeUrlForJsonLd(locale, "/founders/"),
            },
          ],
        },
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
