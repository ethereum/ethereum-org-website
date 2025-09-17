import { getTranslations } from "next-intl/server"

import { CommunityConference, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

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

  // JSON-LD structured data for the developers page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: t("page-developer-meta-title"),
    description: t("page-developers-meta-desc"),
    url: url,
    inLanguage: locale,
    contributor: contributorList,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
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
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
  }

  const learningResourcesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
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
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/images/eth-home-icon.png",
      },
    },
  }

  return (
    <PageJsonLD structuredData={[webPageJsonLd, learningResourcesJsonLd]} />
  )
}
