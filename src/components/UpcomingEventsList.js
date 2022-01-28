// Libraries
import React, { useEffect, useState } from "react"
import styled from "styled-components"

// Components
import EventCard from "../components/EventCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import Translation from "../components/Translation"
import ButtonLink from "../components/ButtonLink"

// Data
import events from "../data/community-events.json"

const EventList = styled.ul`
  margin: 0;
`

const EventListItem = styled.li`
  list-style-type: none;
`

const ButtonLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 620px;
  margin-top: 1.25rem;
`

const UpcomingEventsList = () => {
  const eventsPerLoad = 10
  const [orderedUpcomingEvents, setOrderedUpcomingEvents] = useState()
  const [maxRange, setMaxRange] = useState(eventsPerLoad)
  const [isVisible, setIsVisible] = useState(true)

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

      const details = `${event.sponsor ? "(" + event.sponsor + ")" : ""} ${
        event.description
      }`

      return {
        ...event,
        date: dateRange,
        formattedDetails: details,
      }
    })

    setOrderedUpcomingEvents(formattedEvents)
  }, [])

  const loadMoreEvents = () => {
    setMaxRange((counter) => counter + eventsPerLoad)
    setIsVisible(maxRange + eventsPerLoad <= orderedUpcomingEvents?.length)
  }

  if (orderedUpcomingEvents?.length === 0) {
    return (
      <InfoBanner emoji=":information_source:">
        <Translation id="page-community-upcoming-events-no-events" />{" "}
        <Link to="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-events.json">
          <Translation id="page-community-please-add-to-page" />
        </Link>
      </InfoBanner>
    )
  }

  return (
    <>
      <EventList>
        {orderedUpcomingEvents
          ?.slice(0, maxRange)
          .map(({ title, to, formattedDetails, date, location }, idx) => {
            return (
              <EventListItem key={idx}>
                <EventCard
                  title={title}
                  to={to}
                  date={date}
                  description={formattedDetails}
                  location={location}
                />
              </EventListItem>
            )
          })}
      </EventList>
      <ButtonLinkContainer>
        {isVisible && (
          <ButtonLink onClick={loadMoreEvents}>Load More</ButtonLink>
        )}
      </ButtonLinkContainer>
    </>
  )
}

export default UpcomingEventsList
