import type { EventItem, EventType, GeodeApiEventItem } from "@/lib/types"

import { parseLocationToContinent } from "@/lib/utils/geography"
import { slugify } from "@/lib/utils/url"

export const FETCH_EVENTS_TASK_ID = "fetch-events"

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
