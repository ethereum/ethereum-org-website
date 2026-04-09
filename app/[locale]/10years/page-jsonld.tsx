import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumCommunityReference,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function TenYearJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-10-year-anniversary")

  const url = normalizeUrlForJsonLd(locale, "/10years/")

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
        name: t("page-10-year-anniversary-meta-title"),
        description: t("page-10-year-anniversary-meta-description"),
        url: url,
        inLanguage: locale,
        author: [ethereumCommunityReference],
        contributor: contributorList,
        isPartOf: {
          "@type": "WebSite",
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
              name: t("page-10-year-anniversary-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
        mainEntity: { "@id": `${url}#video` },
      },
      {
        "@type": "VideoObject",
        name: "Ethereum: 10 Years Anniversary",
        description: t("page-10-year-anniversary-meta-description"),
        thumbnailUrl: "https://i.ytimg.com/vi/gjwr-7PgpTC/maxresdefault.jpg",
        uploadDate: "2024-07-30T00:00:00Z",
        duration: "PT5M30S",
        embedUrl: "https://www.youtube.com/embed/gjwr-7PgpTC",
        publisher: ethereumFoundationReference,
        reviewedBy: ethereumFoundationReference,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
