import type { useTranslations } from "next-intl"

import type { Continent, EventItem } from "@/lib/types"

import { slugify } from "@/lib/utils/url"

import communityMeetups from "@/data/community-meetups.json"

export const sanitize = (s: string) =>
  s.toLowerCase().replace(/\W+/g, " ").replace(/\s+/g, " ")

export const mapEventTranslations = (
  events: EventItem[],
  t: ReturnType<typeof useTranslations>
): EventItem[] =>
  events.map((event) => ({
    ...event,
    eventTypeLabel: t(`page-events-tag-${event.eventType}`),
  }))

// Meetup group type from community-meetups.json
interface MeetupGroup {
  title: string
  location: string
  link: string
  logoImage?: string
  bannerImage?: string
}

// Continent → countries mapping for location parsing
const CONTINENT_COUNTRIES: Record<Continent, string[]> = {
  europe: [
    "Austria",
    "Belgium",
    "Croatia",
    "Czechia",
    "Czech Republic",
    "Denmark",
    "England",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Montenegro",
    "Netherlands",
    "The Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "UK",
    "Ukraine",
    "United Kingdom",
  ],
  asia: [
    "China",
    "Hong Kong",
    "Hong Kong SAR",
    "India",
    "Indonesia",
    "Japan",
    "Korea",
    "Malaysia",
    "Philippines",
    "Singapore",
    "South Korea",
    "Taiwan",
    "Thailand",
    "Vietnam",
  ],
  "north-america": [
    "Canada",
    "Costa Rica",
    "Honduras",
    "Mexico",
    "USA",
    "United States",
  ],
  "south-america": [
    "Argentina",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Peru",
    "Venezuela",
  ],
  africa: ["Ethiopia", "Ghana", "Kenya", "Nigeria", "Rwanda", "South Africa"],
  "middle-east": [
    "Bahrain",
    "Iran",
    "Israel",
    "Kuwait",
    "Qatar",
    "Saudi Arabia",
    "UAE",
    "United Arab Emirates",
  ],
  oceania: ["Australia", "New Zealand"],
}

// Derive reverse mapping for lookups
const COUNTRY_TO_CONTINENT: Record<string, Continent> = Object.entries(
  CONTINENT_COUNTRIES
).reduce(
  (acc, [continent, countries]) => {
    for (const country of countries) {
      acc[country] = continent as Continent
    }
    return acc
  },
  {} as Record<string, Continent>
)

function parseLocationToContinent(location: string): Continent | null {
  if (!location || location.toLowerCase() === "online") return null
  const parts = location.split(/,\s*/)
  const country = parts[parts.length - 1]?.trim()
  if (!country) return null
  return COUNTRY_TO_CONTINENT[country] || null
}

function transformMeetupGroup(group: MeetupGroup): EventItem {
  return {
    title: group.title,
    logoImage: group.logoImage || "",
    bannerImage: group.bannerImage || "",
    startTime: "",
    endTime: null,
    location: group.location,
    link: group.link,
    tags: ["meetup"],
    id: slugify(`${group.title}-${group.location}`),
    eventType: "group",
    isOnline: false,
    continent: parseLocationToContinent(group.location),
  }
}

/**
 * Get meetup groups from community-meetups.json
 * These are ongoing community groups (not individual events with dates)
 */
export function getMeetupGroups(): EventItem[] {
  return (communityMeetups as MeetupGroup[])
    .map(transformMeetupGroup)
    .sort((a, b) => a.title.localeCompare(b.title))
}
