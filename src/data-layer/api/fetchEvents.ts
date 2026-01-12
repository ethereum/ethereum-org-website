import type {
  Continent,
  EventItem,
  EventType,
  GeodeApiEventItem,
} from "@/lib/types"

import { slugify } from "@/lib/utils/url"

export const FETCH_EVENTS_TASK_ID = "fetch-events"

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

/**
 * Fetch events data from Geode Labs Supabase API.
 * Returns future events sorted by start time.
 */
export async function fetchEvents(): Promise<EventItem[]> {
  const url =
    "https://pvvrtckedmrkyzfxubkk.supabase.co/rest/v1/v_events_ethereum"
  const key = process.env.SUPABASE_EVENTS_KEY

  if (!key) {
    console.error("SUPABASE_EVENTS_KEY not set")
    throw new Error("SUPABASE_EVENTS_KEY not set")
  }

  console.log("Starting events data fetch from Geode Labs API")

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
      throw new Error(
        `Failed to fetch events: ${response.status} ${response.statusText}`
      )
    }

    const data: GeodeApiEventItem[] = await response.json()

    // Transform and filter future events
    const now = new Date()
    const events = data
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

    console.log(`Successfully fetched ${events.length} upcoming events`)

    return events
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}
