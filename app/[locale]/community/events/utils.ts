import type { useTranslations } from "next-intl"

import type { EventItem, EventType } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

import { localizeLocation } from "@/lib/utils/geography"

import { getEventTypes } from "@/data-layer/fetchers/fetchEvents"

// Map EventType to Tag component status colors
export const TAG_STATUS_MAPPING: Record<EventType, TagProps["status"]> = {
  conference: "accent-a",
  hackathon: "accent-b",
  meetup: "accent-c",
  popup: "tag-yellow",
  group: "primary",
  other: "normal",
}

export const sanitize = (s: string) =>
  s.toLowerCase().replace(/\W+/g, " ").replace(/\s+/g, " ")

export const mapEventTranslations = (
  events: EventItem[],
  t: ReturnType<typeof useTranslations>,
  locale: string
): EventItem[] =>
  events.map((event) => {
    // Use existing eventTypes if they have values, otherwise compute from tags
    const eventTypes: EventType[] = event.eventTypes?.length
      ? event.eventTypes
      : event.tags?.length
        ? getEventTypes(event.tags)
        : ["other"]
    return {
      ...event,
      eventTypes,
      eventTypesLabels: eventTypes.map((type) => t(`page-events-tag-${type}`)),
      location: localizeLocation(event.location, locale),
    }
  })
