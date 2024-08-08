import { useEffect, useState } from "react"
import _ from "lodash"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Box, Grid, Heading } from "@chakra-ui/react"

import type { CommunityConference, Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import EventCard from "@/components/EventCard"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"

import communityEvents from "@/data/community-events.json"

const UpcomingEventsList = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-community")
  const monthsPerLoad = 2

  const [monthGroupedEvents, setMonthGroupedEvents] = useState({})

  const [maxRange, setMaxRange] = useState<number>(monthsPerLoad)

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
    const groupedEvents = _.groupBy(formattedEvents, ({ startDate }) => {
      // .replace(/-/g, "/") ==> Fixes Safari Invalid date
      const start = new Date(startDate.replace(/-/g, "/"))
      const formatYearMonth = new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric",
      }).format(start)
      return `${formatYearMonth}`
    })

    setMonthGroupedEvents(groupedEvents)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMoreEvents = () => {
    setMaxRange((counter) => {
      if (counter + monthsPerLoad > Object.keys(monthGroupedEvents)?.length)
        return Object.keys(monthGroupedEvents)?.length
      return counter + monthsPerLoad
    })
    trackCustomEvent({
      eventCategory: "more events button",
      eventAction: "click",
      eventName: "load more",
    })
  }

  if (Object.keys(monthGroupedEvents)?.length === 0) {
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
      {Object.keys(monthGroupedEvents)
        ?.slice(0, maxRange)
        ?.map((month) => {
          const events = monthGroupedEvents[month]
          return (
            <Box key={`events_in_${month}`}>
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                py={8}
                fontWeight="semibold"
                lineHeight={1.4}
              >
                {month}
              </Heading>
              <Grid
                width={{ base: "100%" }}
                templateColumns={{
                  base: "repeat(1,1fr)",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }}
                justifyContent={"center"}
                alignItems={"center"}
                alignSelf={"center"}
                gap={5}
                overflow={"hidden"}
              >
                {events.map(
                  (
                    {
                      title,
                      to,
                      href,
                      formattedDetails,
                      date,
                      location,
                      imageUrl,
                      startDate,
                      endDate,
                    },
                    idx
                  ) => (
                    <EventCard
                      key={idx}
                      title={title}
                      href={to || href}
                      date={date}
                      description={formattedDetails}
                      location={location}
                      imageUrl={imageUrl}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  )
                )}
              </Grid>
            </Box>
          )
        })}

      <Box
        width="100%"
        margin="30px auto"
        position="relative"
        padding="0 10px"
        transition="all 0.4s ease"
      ></Box>
      {Object.keys(monthGroupedEvents)?.length !== maxRange && (
        <Box
          display="flex"
          justifyContent="center"
          maxWidth="620px"
          marginTop="5"
          paddingY="8"
        >
          <Button onClick={loadMoreEvents}>
            {t("page-community-upcoming-events-load-more")}
          </Button>
        </Box>
      )}
    </>
  )
}

export default UpcomingEventsList
