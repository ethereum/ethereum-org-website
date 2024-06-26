import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord } from "react-icons/fa"

import type { Lang } from "@/lib/types"
import type { CommunityEvent } from "@/lib/interfaces"

import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import Link from "next/link"

const matomoEvent = (buttonType: string) => {
  trackCustomEvent({
    eventCategory: "CommunityEventsWidget",
    eventAction: "clicked",
    eventName: buttonType,
  })
}

type EventProps = {
  event: CommunityEvent
  type: "upcoming" | "past"
}

const Event = ({ event, type }: EventProps) => {
  const { locale } = useRouter()
  const { date, title, calendarLink } = event
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return (
    <div className="grid gap-6 grid-cols-[auto_1fr] mb-4">
      <div>
        <p className="text-body-medium m-0">
          {getLocaleTimestamp(locale! as Lang, date, options)}
        </p>
      </div>
      <div>
        <Link href={calendarLink} onClick={() => matomoEvent(type)}>
          {title}
        </Link>
      </div>
    </div>
  )
}

type CommunityEventsProps = {
  events: {
    pastEventData: CommunityEvent[]
    upcomingEventData: CommunityEvent[]
  }
}

const CommunityEvents = ({ events }: CommunityEventsProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-index")
  const { pastEventData, upcomingEventData } = events

  const reversedUpcomingEventData = upcomingEventData.slice().reverse()
  const reversedPastEventData = pastEventData.slice().reverse()

  return (
    <div className="w-full flex flex-col lg:flex-row p-0 sm:pt-8 lg:pt-8 lg:px-8">
      <div className="w-full lg:w-2/5 flex justify-center">
        <div className="pe-8 ps-8 lg:ps-0">
          <h2>{t("page-index:community-events-content-heading")}</h2>
          <p>
            <Translation id="page-index:community-events-content-1" />
          </p>
          <p>{t("page-index:community-events-content-2")}</p>
        </div>
      </div>
      <div className="w-full lg:w-3/5 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-layer2Gradient px-8 py-16 text-center flex flex-col">
          <div className="flex flex-col h-full gap-8">
            {reversedUpcomingEventData.length ? (
              <div className="flex-1">
                <p className="text-3xl font-bold leading-[1.4]">
                  {reversedUpcomingEventData[0].title}
                </p>
                <p className="m-0 text-xl">
                  {getLocaleTimestamp(
                    locale! as Lang,
                    reversedUpcomingEventData[0].date,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour12: false,
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>
                <p className="text-body-medium text-md">
                  ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold mb-8">
                {t("page-index:community-events-no-events-planned")}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <Link
                href="/discord/"
                className="gap-2"
                onClick={() => matomoEvent("discord")}
              >
                <FaDiscord className="text-2xl" />
                Join Discord
              </Link>
              {reversedUpcomingEventData[0] && (
                <Link
                  href={reversedUpcomingEventData[0].calendarLink}
                  onClick={() => matomoEvent("Add to calendar")}
                  className="font-bold"
                >
                  {t("community-events-add-to-calendar")}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-background-highlight p-8 flex flex-col">
          <p className="text-lg font-bold mb-2">
            {t("page-index:community-events-upcoming-calls")}
          </p>
          <hr className="mb-4" />
          {reversedUpcomingEventData.slice(1).length ? (
            reversedUpcomingEventData
              .slice(1)
              .map((item, idx) => (
                <Event key={idx} event={item} type="upcoming" />
              ))
          ) : (
            <p className="mx-auto">
              {t("page-index:community-events-no-upcoming-calls")}
            </p>
          )}
          <p className="text-lg font-bold mb-2 mt-4">
            {t("page-index:community-events-previous-calls")}
          </p>
          <hr className="mb-4" />
          {reversedPastEventData.length ? (
            reversedPastEventData.map((item, idx) => (
              <Event key={idx} event={item} type="past" />
            ))
          ) : (
            <p className="mx-auto">
              {t("page-index:community-events-there-are-no-past-calls")}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommunityEvents
