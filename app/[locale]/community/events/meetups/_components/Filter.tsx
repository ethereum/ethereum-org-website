"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { useLocale } from "next-intl"

import type { EventItem } from "@/lib/types"

import { Alert, AlertContent } from "@/components/ui/alert"
import Input from "@/components/ui/input"

import EventCard from "../../_components/EventCard"

import useTranslation from "@/hooks/useTranslation"

export default function Filter({ events }: { events: EventItem[] }) {
  const locale = useLocale()
  const { t } = useTranslation("page-community-events")
  const [filter, setFilter] = useState<string>("")

  const filterMeetups = (query: string): EventItem[] => {
    if (!query) return events

    return events.filter((e) => {
      const sanitizeRegEx = /[\s\W]/g
      const searchable = [e.title, e.location, e.continent]
        .join("")
        .toLowerCase()
        .replace(sanitizeRegEx, "")

      const sanitizedQuery = query
        .toLocaleLowerCase()
        .replace(sanitizeRegEx, "")

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

  const filteredMeetups = filterMeetups(filter)

  return (
    <>
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
      {filteredMeetups.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_24rem),_1fr))] gap-8">
          {filteredMeetups.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <Alert variant="warning">
          <Info className="size-6 !text-current" />
          <AlertContent>{t("page-events-search-no-results")}</AlertContent>
        </Alert>
      )}
    </>
  )
}
