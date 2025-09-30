import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

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

  // JSON-LD structured data for the translatathon leaderboard page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: "2025 Ethereum.org Translatathon Leaderboard",
    description:
      "Leaderboard for the 2025 Ethereum.org Translatathon showing translation progress and participant rankings",
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

  return <PageJsonLD structuredData={[webPageJsonLd]} />
}
