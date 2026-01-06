"use client"

import { useState } from "react"

import type { Continent, EventItem } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"

import EventCard from "./EventCard"

export const CONTINENT_VALUES: (Continent | "all")[] = [
  "all",
  "europe",
  "asia",
  "north-america",
  "south-america",
  "africa",
  "middle-east",
  "oceania",
]

// Continent icons/emojis as shown in design
const CONTINENT_ICONS: Record<Continent | "all", string> = {
  all: "🌐",
  europe: "🇪🇺",
  asia: "🌏",
  "north-america": "🗽",
  "south-america": "🌎",
  africa: "🌍",
  "middle-east": "🕌",
  oceania: "🦘",
}

interface ContinentTabsProps {
  events: EventItem[]
  labels: Record<Continent | "all", string>
  locale: string
  noEventsMessage: string
  seeAllLabel?: string
  maxEvents?: number
  displayMode?: "grid" | "row"
  showCounts?: boolean
  showSeeAll?: boolean
  className?: string
}

export default function ContinentTabs({
  events,
  labels,
  locale,
  noEventsMessage,
  seeAllLabel = "See all",
  maxEvents = 12,
  displayMode = "grid",
  showCounts = true,
  showSeeAll = false,
  className,
}: ContinentTabsProps) {
  const [selectedContinent, setSelectedContinent] = useState<Continent | "all">(
    "all"
  )
  const [showAll, setShowAll] = useState(false)

  const filteredEvents =
    selectedContinent === "all"
      ? events
      : events.filter((event) => event.continent === selectedContinent)

  const displayedEvents = showAll
    ? filteredEvents
    : filteredEvents.slice(0, maxEvents)

  const hasMore = filteredEvents.length > maxEvents && !showAll

  // Count events per continent
  const getContinentCount = (continent: Continent | "all"): number => {
    if (continent === "all") return events.length
    return events.filter((event) => event.continent === continent).length
  }

  return (
    <div className={cn(className)}>
      <Tabs
        value={selectedContinent}
        onValueChange={(value) => {
          setSelectedContinent(value as Continent | "all")
          setShowAll(false)
        }}
      >
        <TabsList className="mb-6 justify-start">
          {CONTINENT_VALUES.map((value) => {
            const count = getContinentCount(value)
            return (
              <TabsTrigger key={value} value={value} className="gap-1.5">
                <span>{CONTINENT_ICONS[value]}</span>
                <span>{labels[value]}</span>
                {showCounts && (
                  <span className="text-body-medium">({count})</span>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
      {filteredEvents.length === 0 ? (
        <p className="py-8 text-center text-body-medium">{noEventsMessage}</p>
      ) : displayMode === "row" ? (
        <div className="flex flex-col">
          {displayedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="row"
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
            />
          ))}
        </div>
      )}

      {/* See all button */}
      {showSeeAll && hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={() => setShowAll(true)}>
            {seeAllLabel} ({filteredEvents.length})
          </Button>
        </div>
      )}
    </div>
  )
}
