import { getTranslations } from "next-intl/server"

import type { EventItem, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { getLocaleYear } from "@/lib/utils/date"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

function toEventNode(event: EventItem) {
  return {
    "@type": "Event",
    name: event.title,
    startDate: event.startTime,
    ...(event.endTime && { endDate: event.endTime }),
    url: event.link,
    ...((event.bannerImage || event.logoImage) && {
      image: event.bannerImage || event.logoImage,
    }),
    location: event.isOnline
      ? { "@type": "VirtualLocation", url: event.link }
      : { "@type": "Place", name: event.location },
    eventAttendanceMode: event.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  }
}

export default async function MeetupsJsonLD({
  locale,
  contributors,
  meetups,
}: {
  locale: string
  contributors: FileContributor[]
  meetups: EventItem[]
}) {
  const t = await getTranslations("page-community-events")
  const common = await getTranslations("common")

  const year = getLocaleYear(locale)
  const url = normalizeUrlForJsonLd(locale, `/community/events/meetups/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  // Only dated events belong in the Event ItemList; ongoing meetup groups
  // (no startTime) are rendered on the page but aren't schema.org Events.
  const datedMeetups = meetups.filter((m) => m.startTime)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-events-meetups-hero-title", { year }),
        description: t("page-events-meta-description", { year }),
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
              name: "Community",
              item: normalizeUrlForJsonLd(locale, "/community/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: common("events"),
              item: normalizeUrlForJsonLd(locale, "/community/events/"),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: t("page-events-section-local-meetups"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#meetups` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#meetups`,
        name: t("page-events-section-local-meetups"),
        numberOfItems: datedMeetups.length,
        itemListElement: datedMeetups.map((event, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: toEventNode(event),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
