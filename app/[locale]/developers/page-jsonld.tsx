import { getTranslations } from "next-intl/server"

import { EventItem, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { DevelopersPath, VideoCourse } from "./types"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function DevelopersPageJsonLD({
  locale,
  paths,
  courses,
  hackathons,
  contributors,
}: {
  locale: string
  paths: DevelopersPath[]
  courses: VideoCourse[]
  hackathons: EventItem[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-developers-index")

  const url = normalizeUrlForJsonLd(locale, `/developers/`)

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
        "@type": "WebPage",
        "@id": url,
        name: t("page-developer-meta-title"),
        description: t("page-developers-meta-desc"),
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
              name: t("page-developer-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/developers/"),
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#developers` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#developers`,
        name: t("page-developer-meta-title"),
        description:
          "Comprehensive resources for building on Ethereum including tutorials, tools, documentation, and courses",
        url,
        numberOfItems: paths.length + courses.length + hackathons.length,
        itemListElement: [
          ...paths.map((path, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: path.title,
            description: path.description,
            url: path.href,
          })),
          ...courses.slice(0, 5).map((course, index) => ({
            "@type": "ListItem",
            position: paths.length + index + 1,
            name: course.title,
            description: course.description,
            url: course.href,
          })),
          ...hackathons.map((hackathon, index) => ({
            "@type": "ListItem",
            position: paths.length + courses.length + index + 1,
            name: hackathon.title,
            url: hackathon.link,
          })),
        ],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
