import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function TranslatathonLeaderboardJsonLD({
  locale,
}: {
  locale: string
}) {
  const url = normalizeUrlForJsonLd(
    locale,
    `/contributing/translation-program/translatathon/leaderboard/`
  )

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
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  const competitionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "2025 Ethereum.org Translatathon",
    description:
      "Translation competition for the Ethereum.org website with participant leaderboard and rankings",
    url: url,
    organizer: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    startDate: "2025-08-08T00:00:00",
    endDate: "2025-08-08T00:00:00",
    location: {
      "@type": "VirtualLocation",
      name: "Online",
      url: normalizeUrlForJsonLd(
        locale,
        "/contributing/translation-program/translatathon/"
      ),
    },
    image: ["https://ethereum.org/images/heroes/translatathon-hero.png"],
    award: "Recognition and prizes for top translators",
    eventStatus: "https://schema.org/EventScheduled",
  }

  return <PageJsonLD structuredData={[webPageJsonLd, competitionJsonLd]} />
}
