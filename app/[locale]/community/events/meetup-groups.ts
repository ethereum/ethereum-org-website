import type { EventItem, MeetupGroup } from "@/lib/types"

import {
  localizeLocation,
  parseLocationToContinent,
} from "@/lib/utils/geography"
import { slugify } from "@/lib/utils/url"

import communityMeetups from "@/data/community-meetups.json"

import "server-only"

import { getMeetupImages } from "@/lib/data"

// Unsynced images fall back to the original URL
const resolveMeetupImage = (
  url: string | undefined,
  imageMap: Record<string, string>
) => (url ? imageMap[url] || url : "")

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

export async function getMeetupGroups(locale: string): Promise<EventItem[]> {
  const imageMap = (await getMeetupImages()) ?? {}
  return (communityMeetups as MeetupGroup[])
    .map((group) => transformMeetupGroup(group, locale, imageMap))
    .sort((a, b) => a.title.localeCompare(b.title))
}
