import type { EventItem, EventType, GeodeApiEventItem } from "@/lib/types"

import { parseLocationToContinent } from "@/lib/utils/geography"
import { slugify } from "@/lib/utils/url"

import { uploadToS3 } from "../s3"

export const FETCH_EVENTS_TASK_ID = "fetch-events"

// Priority order for eventTypes
export const EVENT_TYPE_PRIORITY: EventType[] = [
  "conference",
  "hackathon",
  "meetup",
  "popup",
  "group",
]

// Map API tags to EventType values
export const TAG_TO_TYPE: Record<string, EventType> = {
  conference: "conference",
  hackathon: "hackathon",
  meetup: "meetup",
  "popup village/city": "popup",
  group: "group",
}

export function getEventTypes(tags: string[]): EventType[] {
  const lowerTags = tags.map((t) => t.toLowerCase())
  const types: EventType[] = []

  for (const type of EVENT_TYPE_PRIORITY) {
    const hasType = lowerTags.some((tag) => TAG_TO_TYPE[tag] === type)
    if (hasType) {
      types.push(type)
    }
  }

  return types.length > 0 ? types : ["other"]
}

function transformEvent(event: GeodeApiEventItem): EventItem {
  return {
    ...event,
    id: slugify(event.title),
    eventTypes: getEventTypes(event.tags),
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

    return uploadEventImages(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
}

async function uploadEventImages(events: EventItem[]): Promise<EventItem[]> {
  return Promise.all(
    events.map(async (event) => {
      const logoImage = event.logoImage
        ? ((await uploadToS3(event.logoImage, "events/logos")) ?? "")
        : event.logoImage
      const bannerImage = event.bannerImage
        ? ((await uploadToS3(event.bannerImage, "events/banners")) ?? "")
        : event.bannerImage

      return { ...event, logoImage, bannerImage }
    })
  )
}
