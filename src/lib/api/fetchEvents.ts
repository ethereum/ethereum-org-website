import type { Continent, EventItem, GeodeApiEventItem } from "@/lib/types"

import { slugify } from "@/lib/utils/url"

// Continent → countries mapping (based on Geode Labs API "City, Country" format)
const CONTINENT_COUNTRIES: Record<Continent, string[]> = {
  europe: [
    "France",
    "Germany",
    "Portugal",
    "Italy",
    "Spain",
    "The Netherlands",
    "Netherlands",
    "Switzerland",
    "Czechia",
    "Czech Republic",
    "Romania",
    "Slovakia",
    "Ukraine",
    "Turkey",
    "Belgium",
    "Austria",
    "Poland",
    "Ireland",
    "UK",
    "United Kingdom",
    "England",
    "Greece",
    "Croatia",
    "Slovenia",
    "Serbia",
    "Montenegro",
  ],
  asia: [
    "Japan",
    "India",
    "China",
    "Korea",
    "South Korea",
    "Thailand",
    "Vietnam",
    "Singapore",
    "Malaysia",
    "Indonesia",
    "Philippines",
    "Taiwan",
    "Hong Kong",
    "Hong Kong SAR",
  ],
  "north-america": ["USA", "United States", "Canada", "Mexico"],
  "south-america": [
    "Brazil",
    "Argentina",
    "Colombia",
    "Chile",
    "Peru",
    "Ecuador",
  ],
  africa: ["Kenya", "Nigeria", "South Africa", "Ghana", "Ethiopia", "Rwanda"],
  "middle-east": [
    "UAE",
    "United Arab Emirates",
    "Israel",
    "Qatar",
    "Saudi Arabia",
    "Bahrain",
    "Kuwait",
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

function getEventType(tags: string[]): "conference" | "hackathon" | "meetup" {
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
