"use client"

import { useState } from "react"
import { useLocale } from "next-intl"

import type { EventItem } from "@/lib/types"

import { Grid } from "@/components/ui/grid"
import Input from "@/components/ui/input"

import EventCard from "../../_components/event-card"
import NoResultsAlert from "../../_components/no-results-alert"
import { sanitize } from "../../utils"

import useTranslation from "@/hooks/useTranslation"

type FilterMeetupsProps = { events: EventItem[] }

export default function FilterMeetups({ events }: FilterMeetupsProps) {
  const locale = useLocale()
  const { t } = useTranslation("page-community-events")
  const [filter, setFilter] = useState<string>("")

  const filterEvents = (query: string): EventItem[] => {
    if (!query) return events

    return events.filter((e) => {
      const searchable = [e.title, e.location, e.continent].join(" ")
      return sanitize(searchable).includes(sanitize(query))
    })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value)
  }

  const filteredEvents = filterEvents(filter)

  return (
    <>
      <Input
        className="w-full max-w-xl"
        onChange={handleSearch}
        placeholder={t("page-events-search-placeholder")}
        aria-label={t("page-events-search-placeholder")}
        aria-describedby="input-instruction"
      />
      {/* hidden for attachment to input only */}
      <span id="input-instruction" className="sr-only">
        {t("page-events-search-sr-text")}
      </span>
      {filteredEvents.length ? (
        <Grid>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
              showTypeTag
              customEventOptions={{
                eventCategory: "Events_meetups",
                eventAction: "events_clicked",
                eventName: event.title,
              }}
            />
          ))}
        </Grid>
      ) : (
        <NoResultsAlert>{t("page-events-search-no-results")}</NoResultsAlert>
      )}
    </>
  )
}
