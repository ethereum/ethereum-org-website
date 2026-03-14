import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { getLocaleYear } from "@/lib/utils/date"
import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
  ethereumFoundationReference,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { communityHubSchemas } from "@/data/community-hub-schemas"
import communityHubs from "@/data/community-hubs"

function buildHubSchemaNodes(
  hub: (typeof communityHubs)[number],
  description: string
) {
  const schema = communityHubSchemas[hub.id]
  if (!schema) return []

  const placeId = `#hub-location-${hub.id}`
  const seriesId = `#coworking-series-${hub.id}`

  const serviceNode = {
    "@type": "Service" as const,
    name: "Ethereum Community Coworking and Events",
    description,
    provider: ethereumFoundationReference,
    areaServed: {
      "@type": "City" as const,
      name: hub.location,
    },
  }

  const placeNode: Record<string, unknown> = {
    "@type": "Place" as const,
    "@id": placeId,
    name: schema.hubName ?? `Ethereum Community Hub (${hub.location})`,
  }

  if (schema.address) {
    placeNode.address = {
      "@type": "PostalAddress" as const,
      streetAddress: schema.address.streetAddress,
      addressLocality: schema.address.addressLocality,
      ...(schema.address.postalCode && {
        postalCode: schema.address.postalCode,
      }),
      addressCountry: schema.address.addressCountry,
    }
  }

  if (schema.containedInPlace) {
    placeNode.containedInPlace = {
      "@type": "LocalBusiness" as const,
      name: schema.containedInPlace.name,
      ...(schema.containedInPlace.url && {
        url: schema.containedInPlace.url,
      }),
    }
  }

  const eventNode = {
    "@type": ["EventSeries", "Event"] as const,
    "@id": seriesId,
    name: schema.eventSeriesName ?? "Open Ethereum Coworking Hours",
    description: schema.eventDescription,
    isAccessibleForFree: true,
    url: hub.coworkingSignupUrl,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: ethereumFoundationReference,
    location: { "@id": placeId },
    eventSchedule: {
      "@type": "Schedule" as const,
      ...(schema.schedule.startDate && {
        startDate: schema.schedule.startDate,
      }),
      ...(schema.schedule.startTime && {
        startTime: schema.schedule.startTime,
      }),
      ...(schema.schedule.endTime && {
        endTime: schema.schedule.endTime,
      }),
      repeatFrequency: schema.schedule.repeatFrequency,
      byDay: schema.schedule.byDay,
      scheduleTimezone: schema.schedule.scheduleTimezone,
    },
  }

  return [serviceNode, placeNode, eventNode]
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

  const hubSchemaNodes = communityHubs.flatMap((hub) =>
    buildHubSchemaNodes(hub, t(hub.descriptionKey))
  )

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
      ...hubSchemaNodes,
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
