import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function RoadmapVisionPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({
    namespace: "page-roadmap-vision",
  })

  const url = normalizeUrlForJsonLd(locale, `/roadmap/vision/`)

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
        name: t("page-roadmap-vision-title"),
        description: t("page-roadmap-vision-subtitle"),
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
              name: "Roadmap",
              item: normalizeUrlForJsonLd(locale, "/roadmap/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-roadmap-vision-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#roadmap-vision` },
      },
      {
        "@type": "Article",
        "@id": `${url}#roadmap-vision`,
        headline: t("page-roadmap-vision-title"),
        description: t("page-roadmap-vision-subtitle"),
        image: "https://ethereum.org/images/upgrades/oldship.png",
        author: [ethereumCommunityOrganization],
        publisher: ethereumFoundationOrganization,
        contributor: contributorList,
        reviewedBy: ethereumFoundationOrganization,
        about: {
          "@type": "Thing",
          name: "Ethereum Vision",
          description:
            "The vision for Ethereum's future development and capabilities",
        },
        dateModified: lastEditLocaleTimestamp,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
