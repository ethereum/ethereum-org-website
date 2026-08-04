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

function transformMeetupGroup(
  group: MeetupGroup,
  locale: string,
  imageMap: Record<string, string>
): EventItem {
  return {
    title: group.title,
    logoImage: resolveMeetupImage(group.logoImage, imageMap),
    bannerImage: resolveMeetupImage(group.bannerImage, imageMap),
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
 * Swap a hot-linked meetup image for its S3-hosted copy. Falls back to the
 * original URL so a meetup added since the last image sync still renders.
 */
function resolveMeetupImage(
  url: string | undefined,
  imageMap: Record<string, string>
): string {
  if (!url) return ""
  return imageMap[url] || url
}

/**
 * Get meetup groups from community-meetups.json
 * These are ongoing community groups (not individual events with dates)
 *
 * imageMap comes from getMeetupImages(). It is passed in rather than fetched
 * here because this module is also imported by client components, which must
 * not pull the data-layer (and its node built-ins) into the browser bundle.
 */
export function getMeetupGroups(
  locale: string,
  imageMap: Record<string, string> = {}
): EventItem[] {
  return (communityMeetups as MeetupGroup[])
    .map((group) => transformMeetupGroup(group, locale, imageMap))
    .sort((a, b) => a.title.localeCompare(b.title))
}
