import type {
  CommunityEventsReturnType,
  ReqCommunityEvent,
} from "@/lib/interfaces"

export async function fetchCommunityEvents(): Promise<CommunityEventsReturnType> {
  const apiKey = process.env.GOOGLE_API_KEY
  const calendarId = process.env.GOOGLE_CALENDAR_ID

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

  const pastEventData = (pastEventsReqData ?? [])
    .filter((event) => event.start)
    .slice(-4)
    .map((event) => {
      return {
        date: event.start.dateTime,
        title: event.summary,
        calendarLink: event.htmlLink,
      }
    })
  const upcomingEventData = (futureEventsReqData ?? [])
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
}
