import { google } from "googleapis"

import type { HandlerResponse } from "@netlify/functions"

export const lambda = async (
  apiKey: string,
  calenderId: string
): Promise<HandlerResponse> => {
  try {
    const calendar = google.calendar({ version: "v3", auth: apiKey })
    const futureEvents = await calendar.events.list({
      calendarId: calenderId,
      timeMin: new Date().toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: "startTime",
    })
    const pastEvents = await calendar.events.list({
      calendarId: calenderId,
      timeMax: new Date().toISOString(),
      maxResults: 4,
      singleEvents: true,
      orderBy: "startTime",
    })

    const response = {
      pastEvents: pastEvents.data.items,
      futureEvents: futureEvents.data.items,
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
