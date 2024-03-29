import type {
  CommunityEventsReturnType,
  ReqCommunityEvent,
} from "@/lib/interfaces"

import { IS_DEV } from "@/lib/utils/env"

export async function fetchCommunityEvents(): Promise<CommunityEventsReturnType> {
  const apiKey = process.env.GOOGLE_API_KEY
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  try {
    const futureEventsReq = await fetch(
      `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${new Date().toISOString()}&maxResults=3&singleEvents=true&orderby=starttime`
    )
    const futureEvents = await futureEventsReq.json()
    const futureEventsReqData: ReqCommunityEvent[] = futureEvents.items

    const pastEventsReq = await fetch(
      `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMax=${new Date().toISOString()}&orderby=starttime`
    )
    const pastEvents = await pastEventsReq.json()
    const pastEventsReqData: ReqCommunityEvent[] = pastEvents.items

    const pastEventData = pastEventsReqData
      .filter((event) => event.start)
      .slice(-4)
      .map((event) => {
        return {
          date: event.start.dateTime,
          title: event.summary,
          calendarLink: event.htmlLink,
        }
      })
    const upcomingEventData = futureEventsReqData
      .filter((event) => event.start)
      .reverse()
      .map((event) => {
        return {
          date: event.start.dateTime,
          title: event.summary,
          calendarLink: event.htmlLink,
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
