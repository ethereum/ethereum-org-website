import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { courseHref, COURSES, COURSES_HUB } from "@/data/courses"

import { getBreadcrumbListJsonLd } from "@/lib/jsonld/breadcrumbs"
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function CoursesPageJsonLD({
  locale,
}: {
  locale: string
}) {
  const t = await getTranslations({ locale, namespace: "page-courses" })

  const url = normalizeUrlForJsonLd(locale, COURSES_HUB)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-courses-meta-title"),
        description: t("page-courses-meta-description"),
        url,
        inLanguage: locale,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: await getBreadcrumbListJsonLd(locale, COURSES_HUB),
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#courses` },
      },
      // Summary page: each entry links to a course page carrying full Course markup
      {
        "@type": "ItemList",
        "@id": `${url}#courses`,
        name: t("page-courses-meta-title"),
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: COURSES.length,
        itemListElement: COURSES.map(({ id }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: t(`${id}-title`),
          url: normalizeUrlForJsonLd(locale, courseHref(id)),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
