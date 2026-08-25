import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { isExternal, isPdf, normalizeUrlForJsonLd } from "@/lib/utils/url"

import { SITE_URL } from "@/lib/constants"

import type { Report } from "./data"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"
import { resolveKnownEntities } from "@/lib/jsonld/utils"

/**
 * Known entities for a report's publisher(s), resolved through the same
 * alias map as markdown `authors:` frontmatter. Mirrors the
 * `authors ?? author` convention: the `publishers` array wins over the
 * `publisher` display string.
 */
const reportPublisherEntities = (report: Report) =>
  resolveKnownEntities(report.publishers ?? report.publisher)

/**
 * Publisher value for a report item. Resolved publishers are emitted as
 * @id references to the full Organization nodes in the page @graph;
 * unresolved ones fall back to an anonymous name-only node.
 */
const reportPublisher = (report: Report) => {
  const refs = reportPublisherEntities(report).map((entity) => ({
    "@id": entity["@id"],
  }))
  if (!refs.length) return { "@type": "Organization", name: report.publisher }
  return refs.length === 1 ? refs[0] : refs
}

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
      publisher: reportPublisher(report),
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

  // Full entity nodes for every resolved report publisher, so the @id
  // references inside the ItemList resolve within this graph. Deduplicated
  // across reports and against BASE_GRAPH_NODES (EF is both a publisher
  // here and a base node).
  const baseGraphIds = new Set<string>(
    BASE_GRAPH_NODES.map((node) => node["@id"])
  )
  const publisherNodes = [
    ...new Map(
      reports
        .flatMap(reportPublisherEntities)
        .map((entity) => [entity["@id"], entity] as const)
    ).values(),
  ].filter((entity) => !baseGraphIds.has(entity["@id"]))

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      ...publisherNodes,
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
