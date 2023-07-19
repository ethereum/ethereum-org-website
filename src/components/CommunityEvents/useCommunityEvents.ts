// Libraries
import { useEffect, useState } from "react"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../../constants"

// Utils
import { getData } from "../../utils/cache"

// Interface
export interface Event {
  date: string
  title: string
  calendarLink: string
  pastEventLink: string | undefined
}

interface State {
  pastEventData: Array<Event>
  upcomingEventData: Array<Event>
  loading: boolean
  hasError: boolean
}

interface ReqEvent {
  start: { dateTime: string }
  summary: string
  htmlLink: string
  location: string
}

interface ReqEvents {
  pastEvents: Array<ReqEvent>
  futureEvents: Array<ReqEvent>
}

export const useCommunityEvents = () => {
  const [state, setState] = useState<State>({
    pastEventData: [],
    upcomingEventData: [],
    loading: true,
    hasError: false,
  })

  useEffect(() => {
    const fetchCalendarData = async () => {
      let events: ReqEvents

      try {
        events = await getData<ReqEvents>(
          `${GATSBY_FUNCTIONS_PATH}/calendarEvents`
        )
      } catch {
        setState({ ...state, loading: false, hasError: true })
        return
      }

      const pastEventData = events.pastEvents.map((event) => {
        return {
          date: event.start.dateTime,
          title: event.summary,
          calendarLink: event.htmlLink,
          pastEventLink: event.location,
        }
      })
      const upcomingEventData = events.futureEvents.map((event) => {
        return {
          date: event.start.dateTime,
          title: event.summary,
          calendarLink: event.htmlLink,
          pastEventLink: event.location,
        }
      })

      setState({
        ...state,
        pastEventData,
        upcomingEventData,
        loading: false,
        hasError: false,
      })
    }
    fetchCalendarData()
  }, [])

  return state
}
