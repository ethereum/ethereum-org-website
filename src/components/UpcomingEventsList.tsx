import { useEffect, useState } from "react"
import _ from "lodash"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { CommunityConference, Lang } from "@/lib/types"

import EventCard from "@/components/EventCard"
import InfoBanner from "@/components/InfoBanner"
import { Button } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"

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
      const start = new Date(startDate.replace(/-/g, "/"))
      const formatYearMonth = new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric",
      }).format(start)
      return `${formatYearMonth}`
    })

    setMonthGroupedEvents(groupedEvents)
  }, [locale])

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
        <Link href="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-events.json">
          {t("page-community-please-add-to-page")}
        </Link>
      </InfoBanner>
    )
  }

  return (
    <div>
      {Object.keys(monthGroupedEvents)
        ?.slice(0, maxRange)
        ?.map((month) => {
          const events = monthGroupedEvents[month]
          return (
            <div key={`events_in_${month}`}>
              <h3 className="py-8">{month}</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {events.map(
                  (
                    {
                      title,
                      to,
                      href,
                      formattedDetails,
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
                      description={formattedDetails}
                      location={location}
                      imageUrl={imageUrl}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  )
                )}
              </div>
            </div>
          )
        })}

      {Object.keys(monthGroupedEvents)?.length !== maxRange && (
        <div className="flex justify-center py-8">
          <Button onClick={loadMoreEvents}>
            {t("page-community-upcoming-events-load-more")}
          </Button>
        </div>
      )}
    </div>
  )
}

export default UpcomingEventsList
