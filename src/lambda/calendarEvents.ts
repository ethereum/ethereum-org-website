import axios from "axios"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (
  apiKey: string,
  calenderId: string
): Promise<HandlerResponse> => {
  try {
    const futureEventsReq = await axios.get(
      `https://content.googleapis.com/calendar/v3/calendars/${calenderId}/events`,
      {
        params: {
          key: apiKey,
          timeMin: new Date().toISOString(),
          maxResults: 3,
          singleEvents: true,
          orderBy: "startTime",
        },
      }
    )

    const pastEventsReq = await axios.get(
      `https://content.googleapis.com/calendar/v3/calendars/${calenderId}/events`,
      {
        params: {
          key: apiKey,
          timeMax: new Date().toISOString(),
          maxResults: 4,
          singleEvents: true,
          orderBy: "startTime",
        },
      }
    )

    const response = {
      pastEvents: pastEventsReq.data.items,
      futureEvents: futureEventsReq.data.items,
    }
    return { statusCode: 200, body: JSON.stringify(response) }
  } catch (error) {
    console.error(error)
    // @ts-ignore
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Something went wrong with requesting the calendar events data.",
      }),
    }
  }
}

export const handler = (): Promise<HandlerResponse> => {
  let apiKey = process.env.GOOGLE_API_KEY
  let calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!apiKey) {
    throw new Error("required env GOOGLE_API_KEY not set")
  }

  if (!calendarId) {
    throw new Error("require env GOOGLE_CALENDAR_ID not set")
  }

  return lambda(apiKey, calendarId)
}
