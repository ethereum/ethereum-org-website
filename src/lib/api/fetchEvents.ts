import type {
  Continent,
  EventItem,
  EventType,
  GeodeApiEventItem,
} from "@/lib/types"

import { slugify } from "@/lib/utils/url"

import communityMeetups from "@/data/community-meetups.json"

// Meetup group type from community-meetups.json
interface MeetupGroup {
  title: string
  location: string
  link: string
  logoImage?: string
  bannerImage?: string
}

// Continent → countries mapping (based on Geode Labs API "City, Country" format)
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
  if (!location || location.toLowerCase() === "online") {
    return null
  }

  // Split by comma, take last part as country
  const parts = location.split(/,\s*/)
  const country = parts[parts.length - 1]?.trim()

  if (!country) return null

  return COUNTRY_TO_CONTINENT[country] || null
}

function getEventType(tags: string[]): EventType {
  const lowerTags = tags.map((t) => t.toLowerCase())
  if (lowerTags.includes("hackathon")) return "hackathon"
  if (lowerTags.includes("meetup")) return "meetup"
  return "conference"
}

function transformEvent(event: GeodeApiEventItem): EventItem {
  return {
    ...event,
    id: slugify(event.title),
    eventType: getEventType(event.tags),
    isOnline: event.location.toLowerCase() === "online",
    continent: parseLocationToContinent(event.location),
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  const url =
    "https://pvvrtckedmrkyzfxubkk.supabase.co/rest/v1/v_events_ethereum"
  const key = process.env.SUPABASE_EVENTS_KEY

  if (!url || !key) {
    console.error("SUPABASE_EVENTS_KEY not set")
    return []
  }

  try {
    const response = await fetch(`${url}?select=*`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })

    if (!response.ok) {
      console.error(
        "Failed to fetch events:",
        response.status,
        response.statusText
      )
      return []
    }

    const data: GeodeApiEventItem[] = await response.json()

    // Transform and filter future events
    const now = new Date()
    return data
      .map(transformEvent)
      .filter((event) => {
        // Keep events that haven't ended yet
        const endTime = event.endTime
          ? new Date(event.endTime)
          : new Date(event.startTime)
        return endTime >= now
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

/**
 * Meetup Groups (from community-meetups.json)
 *
 * While the Geode Labs API contains sparse meetup event data, we supplement
 * with this curated list of active meetup groups from around the world.
 * Consider removal when API is serving a sufficient number of meetup events.
 *
 * These are ongoing community groups (not individual events with dates).
 * Groups are displayed alongside API events but with:
 * - No date (eventType: "group" triggers hiding the date in EventCard)
 * - "Group" tag to distinguish from dated events
 * - MapPin icon fallback if no image available
 *
 * Images: Most use allowlisted CDNs (meetupstatic.com, lumacdn.com, etc).
 * One-off domain images are downloaded locally to public/images/meetups/.
 * See scripts/download-meetup-images.js for the download process.
 */
function transformMeetupGroup(group: MeetupGroup): EventItem {
  return {
    title: group.title,
    logoImage: group.logoImage || "",
    bannerImage: group.bannerImage || "",
    startTime: "", // No dates for groups
    endTime: null,
    location: group.location,
    link: group.link,
    tags: ["meetup"],
    id: slugify(`${group.title}-${group.location}`), // Include location for uniqueness
    eventType: "group",
    isOnline: false,
    continent: parseLocationToContinent(group.location),
  }
}

export function getMeetupGroups(): EventItem[] {
  return (communityMeetups as MeetupGroup[])
    .map(transformMeetupGroup)
    .sort((a, b) => a.title.localeCompare(b.title))
}
