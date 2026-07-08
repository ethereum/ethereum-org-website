import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { isExternal, isPdf, normalizeUrlForJsonLd } from "@/lib/utils/url"

import { SITE_URL } from "@/lib/constants"

import type { Report } from "./data"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

const reportSchema = (
  report: Report,
  index: number,
  locale: string,
  pageUrl: string
) => {
  const itemUrl = isExternal(report.href)
    ? report.href
    : normalizeUrlForJsonLd(locale, report.href)
  const imageUrl = `${SITE_URL}${report.imgSrc.src}`

  return {
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Report",
      "@id": `${pageUrl}#${report.slug}`,
      name: report.title,
      url: itemUrl,
      image: imageUrl,
      datePublished: report.dateIso,
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: report.publisher,
      },
      ...(isPdf(report.href) && {
        encodingFormat: "application/pdf",
      }),
      ...(typeof report.fileSizeBytes === "number" && {
        contentSize: `${(report.fileSizeBytes / 1048576).toFixed(1)} MB`,
      }),
    },
  }
}

export default async function ReportsPageJsonLD({
  locale,
  contributors,
  reports,
}: {
  locale: string
  contributors: FileContributor[]
  reports: Report[]
}) {
  const t = await getTranslations("page-reports")

  const url = normalizeUrlForJsonLd(locale, "/reports/")
  const itemListId = `${url}#reports-list`

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-reports-title"),
        description: t("page-reports-description"),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
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
              name: t("page-reports-title"),
              item: normalizeUrlForJsonLd(locale, "/reports/"),
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: t("page-reports-title"),
        description: t("page-reports-description"),
        numberOfItems: reports.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: reports.map((report, index) =>
          reportSchema(report, index, locale, url)
        ),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
