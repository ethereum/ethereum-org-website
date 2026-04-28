import type { useTranslations } from "next-intl"

import type { EventItem, EventType } from "@/lib/types"

import { TagProps } from "@/components/ui/tag"

import {
  localizeLocation,
  parseLocationToContinent,
} from "@/lib/utils/geography"
import { slugify } from "@/lib/utils/url"

import communityMeetups from "@/data/community-meetups.json"
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

// Meetup group type from community-meetups.json
interface MeetupGroup {
  title: string
  location: string
  link: string
  logoImage?: string
  bannerImage?: string
}

function transformMeetupGroup(group: MeetupGroup, locale: string): EventItem {
  return {
    title: group.title,
    logoImage: group.logoImage || "",
    bannerImage: group.bannerImage || "",
    startTime: "",
    endTime: null,
    location: localizeLocation(group.location, locale),
    link: group.link,
    tags: ["meetup"],
    id: slugify(`${group.title}-${group.location}`),
    eventTypes: ["group"],
    isOnline: false,
    continent: parseLocationToContinent(group.location),
  }
}

/**
 * Get meetup groups from community-meetups.json
 * These are ongoing community groups (not individual events with dates)
 */
export function getMeetupGroups(locale: string): EventItem[] {
  return (communityMeetups as MeetupGroup[])
    .map((group) => transformMeetupGroup(group, locale))
    .sort((a, b) => a.title.localeCompare(b.title))
}
