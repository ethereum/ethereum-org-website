import axios from "axios"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

async function handler(
  __req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
): Promise<void> {
  const apiKey = process.env.GOOGLE_API_KEY
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  try {
    const futureEventsReq = await axios.get(
      `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
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
      `https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
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

    res.status(200).send(JSON.stringify(response))
  } catch (error) {
    console.error(error)
    res.status(500).send(
      JSON.stringify({
        msg: "Something went wrong with requesting the calendar events data.",
      })
    )
  }
}

export default handler
