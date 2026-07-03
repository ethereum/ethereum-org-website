"use client"

import { useState } from "react"
import { useLocale } from "next-intl"

import type { EventItem } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import Input from "@/components/ui/input"

import { sanitize } from "../utils"

import EventCard from "./event-card"
import NoResultsAlert from "./no-results-alert"

import useTranslation from "@/hooks/useTranslation"

const MAX_RESULTS = 6

type FilterProps = { events: EventItem[] }

export default function FilterEvents({ events }: FilterProps) {
  const locale = useLocale()

  const { t } = useTranslation("page-community-events")

  const [filter, setFilter] = useState<string>("")

  const filterEvents = (query: string): EventItem[] => {
    if (!query) return events

    return events.filter((e) => {
      const isOnline = e.isOnline ? t("page-events-tag-online") : ""
      const searchable = [
        e.title,
        e.location,
        e.continent,
        isOnline,
        ...e.tags,
      ].join(" ")

      return sanitize(searchable).includes(sanitize(query))
    })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value)
  }

  const filteredEvents = filterEvents(filter)

  const Results = () => {
    if (!filter) return <></>

    if (!filteredEvents.length)
      return (
        <NoResultsAlert variant="center">
          {t("page-events-search-no-results")}
        </NoResultsAlert>
      )

    return (
      <>
        <Grid columns={3} className="text-start">
          {filteredEvents.slice(0, MAX_RESULTS).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
              showTypeTag
              customEventOptions={{
                eventCategory: "Events",
                eventAction: "events_clicked",
                eventName: "search results",
              }}
            />
          ))}
        </Grid>
        {filteredEvents.length > MAX_RESULTS && (
          <div className="flex justify-center">
            <ButtonLink
              href={`/community/events/search?q=${encodeURIComponent(filter)}`}
              size="lg"
              className="max-md:w-full"
            >
              {t("page-events-see-all")} ({filteredEvents.length})
            </ButtonLink>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className="flex justify-center">
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
      </div>

      <Results />
    </>
  )
}
