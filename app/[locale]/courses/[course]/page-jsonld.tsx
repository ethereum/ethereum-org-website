import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { type Course, courseHref } from "@/data/courses"

import { getBreadcrumbListJsonLd } from "@/lib/jsonld/breadcrumbs"
import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function CoursePageJsonLD({
  locale,
  course,
}: {
  locale: string
  course: Course
}) {
  const t = await getTranslations({ locale, namespace: "page-courses" })

  const path = courseHref(course.id)
  const url = normalizeUrlForJsonLd(locale, path)
  const name = t(`${course.id}-title`)
  const description = t(`${course.id}-description`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-courses-meta-course-title", { course: name }),
        description,
        url,
        inLanguage: locale,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        // Mirrors the visible breadcrumb on the course page
        breadcrumb: await getBreadcrumbListJsonLd(locale, path, name),
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#course` },
      },
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name,
        description,
        url,
        inLanguage: locale,
        provider: REFERENCE.ETHEREUM_FOUNDATION,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        educationalLevel: t(`page-courses-level-${course.level}`),
        isAccessibleForFree: true,
        // Self-paced and always open, so no schedule or dates to claim
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online" },
        // Lessons are kept from crawlers (robots.txt), so sections carry no URLs
        syllabusSections: course.lessons.map(({ id }) => ({
          "@type": "Syllabus",
          name: t(`${course.id}-${id}-title`),
          description: t(`${course.id}-${id}-summary`),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
