import { getTranslations } from "next-intl/server"

import { CommunityConference, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { DevelopersPath, VideoCourse } from "./types"

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
  hackathons: CommunityConference[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-developers-index" })

  const url = normalizeUrlForJsonLd(locale, `/developers/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-developer-meta-title"),
        description: t("page-developers-meta-desc"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
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
              name: t("page-developer-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/developers/"),
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#developers` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#developers`,
        name: t("page-developer-meta-title"),
        description:
          "Comprehensive resources for building on Ethereum including tutorials, tools, documentation, and courses",
        url: url,
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
            description: hackathon.description,
            url: hackathon.href,
          })),
        ],
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
