import { NextResponse } from "next/server"

import { getEventsData } from "@/lib/data"

// Cached 24h to match the source cadence: fetchEvents runs once daily
// (Trigger.dev DAILY task) and getEventsData is unstable_cache'd for 24h, so a
// shorter TTL would only trigger redundant regenerations of identical data. No
// date filter here on purpose -- a cached response would freeze `now` and could
// resurface a just-ended event, so the client filters with a live clock.
export const revalidate = 86400

export async function GET() {
  const events = (await getEventsData()) ?? []
  // Mirrors the hackathon predicate in app/[locale]/developers/utils.tsx.
  const hackathons = events.filter(
    (event) =>
      event.eventTypes?.includes("hackathon") ||
      event.tags?.some((tag) => tag.toLowerCase() === "hackathon")
  )
  return NextResponse.json(hackathons)
}
