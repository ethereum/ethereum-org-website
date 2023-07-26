// Libraries
import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"

// Components
import EventCard from "./EventCard"
import InfoBanner from "./InfoBanner"
import Link from "./Link"
import Translation from "./Translation"
import Button from "./Button"

// Data
import events from "../data/community-events.json"

// Utils
import { trackCustomEvent } from "../utils/matomo"

interface ICommunityEventData {
  title: string
  to: string
  sponsor: string | null
  location: string
  description: string
  startDate: string
  endDate: string
}

interface IOrderedUpcomingEventType extends ICommunityEventData {
  date: string
  formattedDetails: string
}

export interface IProps {}

const UpcomingEventsList: React.FC<IProps> = () => {
  const eventsPerLoad = 10
  const [orderedUpcomingEvents, setOrderedUpcomingEvents] = useState<
    Array<IOrderedUpcomingEventType>
  >([])
  const [maxRange, setMaxRange] = useState<number>(eventsPerLoad)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  // Create Date object from each YYYY-MM-DD JSON date string
  const dateParse = (dateString: string): Date => {
    const parts = dateString.split("-")
    return new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    )
  }

  useEffect(() => {
    const eventsList: Array<ICommunityEventData> = [...events]
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    // Remove events that have ended
    const upcomingEvents = eventsList.filter(({ endDate }) => {
      return dateParse(endDate) > yesterday
    })

    // Sort events by start date
    const orderedEvents = upcomingEvents.sort(
      (a, b) =>
        dateParse(a.startDate).getTime() - dateParse(b.startDate).getTime()
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
    setIsVisible(maxRange + eventsPerLoad <= orderedUpcomingEvents.length)
    trackCustomEvent({
      eventCategory: "more events button",
      eventAction: "click",
      eventName: "load more",
    })
  }

  if (orderedUpcomingEvents.length === 0) {
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
      <Box
        width="100%"
        margin="30px auto"
        position="relative"
        padding="0 10px"
        transition="all 0.4s ease"
        _before={{
          content: '""',
          position: "absolute",
          width: "3px",
          height: "full",
          background: "primary.base",
          top: 0,
          left: "50%",
        }}
        _after={{
          content: '""',
          display: "table",
          width: "100%",
          clear: "both",
        }}
      >
        {orderedUpcomingEvents
          ?.slice(0, maxRange)
          .map(({ title, to, formattedDetails, date, location }, idx) => {
            return (
              <EventCard
                key={idx}
                title={title}
                to={to}
                date={date}
                description={formattedDetails}
                location={location}
                isEven={(idx + 1) % 2 === 0}
              />
            )
          })}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        maxWidth="620px"
        marginTop="5"
      >
        {isVisible && (
          <Button onClick={loadMoreEvents}>
            <Translation id="page-community-upcoming-events-load-more" />
          </Button>
        )}
      </Box>
    </>
  )
}

export default UpcomingEventsList
