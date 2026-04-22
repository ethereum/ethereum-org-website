import { getTranslations } from "next-intl/server"

import type { EventItem, FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { getLocaleYear } from "@/lib/utils/date"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

function eventTypeFor(
  event: EventItem
): "ConferenceEvent" | "Hackathon" | "Event" {
  if (event.eventTypes?.includes("conference")) return "ConferenceEvent"
  if (event.eventTypes?.includes("hackathon")) return "Hackathon"
  return "Event"
}

function toEventNode(event: EventItem) {
  return {
    "@type": eventTypeFor(event),
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

export default async function ConferencesJsonLD({
  locale,
  contributors,
  conferences,
}: {
  locale: string
  contributors: FileContributor[]
  conferences: EventItem[]
}) {
  const t = await getTranslations("page-community-events")
  const common = await getTranslations("common")

  const year = getLocaleYear(locale)
  const url = normalizeUrlForJsonLd(locale, `/community/events/conferences/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const datedConferences = conferences.filter((c) => c.startTime)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-events-conferences-hero-title", { year }),
        description: t("page-events-meta-description", { year }),
        url: url,
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
              name: t("page-events-section-upcoming-conferences"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#conferences` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#conferences`,
        name: t("page-events-section-upcoming-conferences"),
        numberOfItems: datedConferences.length,
        itemListElement: datedConferences.map((event, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: toEventNode(event),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
