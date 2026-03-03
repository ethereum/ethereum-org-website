import { getTranslations } from "next-intl/server"

import communityHubs from "@/data/community-hubs"
import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { getLocaleYear } from "@/lib/utils/date"
import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

/**
 * Maps hub IDs to their known address locality and country.
 * Street addresses and geo coordinates can be added here once
 * collected from hub operators.
 */
const hubLocations: Record<
  string,
  { addressLocality: string; addressCountry: string }
> = {
  "hong-kong": { addressLocality: "Hong Kong", addressCountry: "HK" },
  rome: { addressLocality: "Rome", addressCountry: "IT" },
  london: { addressLocality: "London", addressCountry: "GB" },
  berlin: { addressLocality: "Berlin", addressCountry: "DE" },
  dubai: { addressLocality: "Dubai", addressCountry: "AE" },
  lagos: { addressLocality: "Lagos", addressCountry: "NG" },
  sf: { addressLocality: "San Francisco", addressCountry: "US" },
}

export default async function EventsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-community-events" })
  const common = await getTranslations({ namespace: "common" })

  const year = getLocaleYear(locale)
  const url = normalizeUrlForJsonLd(locale, `/community/events/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const hubPlaces = communityHubs.map((hub) => {
    const loc = hubLocations[hub.id]
    return {
      "@type": "Place",
      "@id": `${url}#hub-${hub.id}`,
      name: `${hub.location} Ethereum Community Hub`,
      description: t(hub.descriptionKey),
      url: `${url}#community-hubs`,
      image: `https://ethereum.org/images/community/hubs/${hub.id}-hub-banner.png`,
      sameAs: [hub.meetupUrl],
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.addressLocality,
        addressCountry: loc.addressCountry,
      },
    }
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-events-meta-title", { year }),
        description: t("page-events-meta-description", { year }),
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
              name: "Community",
              item: normalizeUrlForJsonLd(locale, "/community/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: common("events"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#sections` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#sections`,
        name: t("page-events-meta-title", { year }),
        description: t("page-events-meta-description", { year }),
        url: url,
        numberOfItems: 4,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("page-events-section-hubs"),
            description: t("page-events-section-hubs-subtitle"),
            url: `${url}#community-hubs`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("page-events-section-local-meetups"),
            description: t("page-events-section-local-meetups-subtitle"),
            url: normalizeUrlForJsonLd(locale, "/community/events/meetups/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("page-events-section-upcoming-conferences"),
            description: t("page-events-section-upcoming-conferences-subtitle"),
            url: normalizeUrlForJsonLd(
              locale,
              "/community/events/conferences/"
            ),
          },
          {
            "@type": "ListItem",
            position: 4,
            name: t("page-events-section-organizers"),
            description: t("page-events-section-organizers-subtitle"),
            url: `${url}#for-organizers`,
          },
        ],
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
      ...hubPlaces,
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
