import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Box } from "@chakra-ui/react"

import type { CommunityConference, Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import EventCard from "@/components/EventCard"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"

import communityEvents from "@/data/community-events.json"

type OrderedUpcomingEvent = CommunityConference & {
  date: string
  formattedDetails: string
}

const UpcomingEventsList = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-community")
  const eventsPerLoad = 10
  const [orderedUpcomingEvents, setOrderedUpcomingEvents] = useState<
    OrderedUpcomingEvent[]
  >([])
  const [maxRange, setMaxRange] = useState<number>(eventsPerLoad)

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
    const eventsList = communityEvents as CommunityConference[]
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
      const getDate = (date) =>
        getLocaleTimestamp(locale! as Lang, dateParse(date).toString(), {})

      const dateRange =
        event.startDate === event.endDate
          ? getDate(event.startDate)
          : `${getDate(event.startDate)} - ${getDate(event.endDate)}`

      const details = `${event.description}`

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
    trackCustomEvent({
      eventCategory: "more events button",
      eventAction: "click",
      eventName: "load more",
    })
  }

  if (orderedUpcomingEvents.length === 0) {
    return (
      <InfoBanner emoji=":information_source:">
        {t("page-community-upcoming-events-no-events")}{" "}
        <InlineLink href="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-events.json">
          {t("page-community-please-add-to-page")}
        </InlineLink>
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
          insetInlineStart: "50%",
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
        {maxRange <= orderedUpcomingEvents.length && (
          <Button onClick={loadMoreEvents}>
            {t("page-community-upcoming-events-load-more")}
          </Button>
        )}
      </Box>
    </>
  )
}

export default UpcomingEventsList
