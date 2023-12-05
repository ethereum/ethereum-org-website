import type {
  CommunityEventsReturnType,
  ReqCommunityEvent,
} from "@/lib/interfaces"

import { IS_DEV } from "@/lib/utils/env"

export async function fetchCommunityEvents(): Promise<CommunityEventsReturnType> {
  const apiKey = process.env.GOOGLE_API_KEY
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  try {
    const futureEventsReq: ReqCommunityEvent[] = await fetch(
      `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${new Date().toISOString()}&maxResults=3`
    ).then(response => response.json())
    .then(data => data.items)

    const pastEventsReq: ReqCommunityEvent[] = await fetch(
      `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMax=${new Date().toISOString()}&maxResults=4`
    ).then(response => response.json())
    .then(data => data.items)

    const pastEventData = pastEventsReq.map((event) => {
      return {
        date: event.start.dateTime,
        title: event.summary,
        calendarLink: event.htmlLink,
        pastEventLink: event.location,
      }
    })
    const upcomingEventData = futureEventsReq.map((event) => {
      return {
        date: event.start.dateTime,
        title: event.summary,
        calendarLink: event.htmlLink,
        pastEventLink: event.location,
      }
    })

    return {
      pastEventData,
      upcomingEventData,
    }
  } catch (error) {
    // To improve DX, return empty arrays if we are in dev mode
    if (IS_DEV) {
      console.warn(
        "The community events fetch failed most probably because you are missing some env vars"
      )

      return {
        pastEventData: [],
        upcomingEventData: [],
      }
    }

    // In production mode, throw an error to stop the build in case this fetch fails
    console.error(error)
    throw new Error(
      "Something went wrong with requesting the calendar events data."
    )
  }
}
