import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function TranslatathonLeaderboardJsonLD({
  locale,
  contributors,
}: {
  contributors: FileContributor[]
  locale: string
}) {
  const url = normalizeUrlForJsonLd(
    locale,
    `/contributing/translation-program/translatathon/leaderboard/`
  )

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
        name: "2025 Ethereum.org Translatathon Leaderboard",
        description:
          "Leaderboard for the 2025 Ethereum.org Translatathon showing translation progress and participant rankings",
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
              name: "Contributing",
              item: normalizeUrlForJsonLd(locale, "/contributing/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Translation Program",
              item: normalizeUrlForJsonLd(
                locale,
                "/contributing/translation-program/"
              ),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Translatathon",
              item: normalizeUrlForJsonLd(
                locale,
                "/contributing/translation-program/translatathon/"
              ),
            },
            {
              "@type": "ListItem",
              position: 5,
              name: "Leaderboard",
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
