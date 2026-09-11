import type { EventItem } from "@/lib/types"

import {
  localizeLocation,
  parseLocationToContinent,
} from "@/lib/utils/geography"
import { slugify } from "@/lib/utils/url"

import communityMeetups from "@/data/community-meetups.json"

import "server-only"

import { getMeetupImages } from "@/lib/data"

// Meetup group type from community-meetups.json
interface MeetupGroup {
  title: string
  location: string
  link: string
  logoImage?: string
  bannerImage?: string
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
 * Get meetup groups from community-meetups.json
 * These are ongoing community groups (not individual events with dates)
 *
 * server-only: this module reaches the data-layer for the mirrored image URLs,
 * which pulls in node built-ins. Client components import the pure helpers from
 * ./utils instead.
 */
export async function getMeetupGroups(locale: string): Promise<EventItem[]> {
  const imageMap = (await getMeetupImages()) ?? {}
  return (communityMeetups as MeetupGroup[])
    .map((group) => transformMeetupGroup(group, locale, imageMap))
    .sort((a, b) => a.title.localeCompare(b.title))
}
