"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { useLocale } from "next-intl"

import type { EventItem } from "@/lib/types"

import { Alert, AlertContent } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import EventCard from "../_components/EventCard"

import useTranslation from "@/hooks/useTranslation"

type FilterProps = { events: EventItem[] }

export default function FilterEvents({ events }: FilterProps) {
  const locale = useLocale()
  const { t } = useTranslation("page-community-events")
  const [filter, setFilter] = useState<string>("")

  const filterEvents = (query: string): EventItem[] => {
    if (!query) return events

    return events.filter((e) => {
      const sanitizeRegEx = /(\W|\s+)/g
      const isOnline = e.isOnline ? t("page-events-tag-online") : ""
      const searchable = [e.title, e.location, e.continent, isOnline, ...e.tags]
        .join(" ")
        .toLowerCase()
        .replace(sanitizeRegEx, " ")

      const sanitizedQuery = query.toLowerCase().replace(sanitizeRegEx, "")

      return searchable.includes(sanitizedQuery)
    })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value)
    // trackCustomEvent({
    //   eventCategory: "events search",
    //   eventAction: "click",
    //   eventName: event.target.value,
    // })
  }

  const filteredEvents = filterEvents(filter)

  const MAX_RESULTS = 6
  const Results = () => {
    if (!filter) return <></>

    if (!filteredEvents.length)
      return (
        <Alert variant="warning" className="mx-auto max-w-xl justify-center">
          <Info className="size-6 !text-current" />
          <AlertContent className="flex-none">
            {t("page-events-search-no-results")}
          </AlertContent>
        </Alert>
      )

    return (
      <>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_24rem),_1fr))] gap-8">
          {filteredEvents.slice(0, MAX_RESULTS).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
              showTypeTag
            />
          ))}
        </div>
        {filteredEvents.length > MAX_RESULTS && (
          <div className="flex justify-center">
            <ButtonLink
              href={`/community/events/search?q=${encodeURIComponent(filter)}`}
              size="lg"
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
