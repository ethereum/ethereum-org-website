import type { EventItem, EventType, GeodeApiEventItem } from "@/lib/types"

import { parseLocationToContinent } from "@/lib/utils/geography"
import { slugify } from "@/lib/utils/url"

export const FETCH_EVENTS_TASK_ID = "fetch-events"

// Priority order for eventTypes
const EVENT_TYPE_PRIORITY: EventType[] = [
  "conference",
  "hackathon",
  "meetup",
  "popup",
  "regional",
  "group",
]

// Map API tags to EventType values
const TAG_TO_TYPE: Record<string, EventType> = {
  conference: "conference",
  hackathon: "hackathon",
  meetup: "meetup",
  "popup village/city": "popup",
  "regional grassroots": "regional",
  group: "group",
}

function getEventTypes(tags: string[]): EventType[] {
  const lowerTags = tags.map((t) => t.toLowerCase())
  const types: EventType[] = []

  // Check each priority type in order
  for (const type of EVENT_TYPE_PRIORITY) {
    // Find if any tag maps to this type
    const hasType = lowerTags.some((tag) => TAG_TO_TYPE[tag] === type)
    if (hasType) {
      types.push(type)
    }
  }

  return types
}

function transformEvent(event: GeodeApiEventItem): EventItem {
  const eventTypes = getEventTypes(event.tags)
  return {
    ...event,
    id: slugify(event.title),
    eventTypes: eventTypes.length > 0 ? eventTypes : ["other"],
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
