import React, { useEffect, useState } from "react"
import Link from "../components/Link"
import events from "../data/community-events.json"

const UpcomingEventsList = () => {
  const [orderedUpcomingEvents, setOrderedUpcomingEvents] = useState()

  // Create Date object from each YYYY-MM-DD JSON date string
  const dateParse = (dateString) => {
    const parts = dateString.split("-")
    return new Date(parts[0], parts[1] - 1, parts[2])
  }

  useEffect(() => {
    const eventsList = [...events]
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    // Remove events that have ended
    const upcomingEvents = eventsList.filter(({ endDate }) => {
      return dateParse(endDate) > yesterday
    })

    // Sort events by start date
    const orderedEvents = upcomingEvents.sort(
      (a, b) => dateParse(a.startDate) - dateParse(b.startDate)
    )

    // Add formatted string to display
    const formattedEvents = orderedEvents.map((event) => {
      const dateRange =
        event.startDate === event.endDate
          ? dateParse(event.startDate).toLocaleDateString()
          : `${dateParse(event.startDate).toLocaleDateString()} - ${dateParse(
              event.endDate
            ).toLocaleDateString()}`

      const details = `${event.sponsor ? "(" + event.sponsor + ")" : ""} - ${
        event.description
      } (${dateRange})`

      return {
        ...event,
        formattedDetails: details,
      }
    })

    setOrderedUpcomingEvents(formattedEvents)
  }, [])

  return (
    <ul>
      {orderedUpcomingEvents?.map(({ title, to, formattedDetails }, idx) => {
        return (
          <li key={idx}>
            <Link to={to}>{title}</Link>
            {formattedDetails}
          </li>
        )
      })}
    </ul>
  )
}

export default UpcomingEventsList
