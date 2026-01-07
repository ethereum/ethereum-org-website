"use client"

import { useState } from "react"
import { Globe } from "lucide-react"

import type { Continent, EventItem, SectionNavDetails } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import TabNav from "@/components/ui/TabNav"

import { cn } from "@/lib/utils/cn"

import Africa from "./svgs/africa.svg"
import Asia from "./svgs/asia.svg"
import Europe from "./svgs/europe.svg"
import MiddleEast from "./svgs/middle-east.svg"
import NorthAmerica from "./svgs/north-america.svg"
import Oceania from "./svgs/oceania.svg"
import SouthAmerica from "./svgs/south-america.svg"
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
const CONTINENT_ICONS: Record<Continent | "all", React.ReactNode> = {
  all: <Globe />,
  europe: <Europe />,
  asia: <Asia />,
  "north-america": <NorthAmerica />,
  "south-america": <SouthAmerica />,
  africa: <Africa />,
  "middle-east": <MiddleEast />,
  oceania: <Oceania />,
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

  const handleSelect = (key: string) => {
    setSelectedContinent(key as Continent | "all")
    setShowAll(false)
  }

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

  // Build sections for TabNav (no href = uses onSelect)
  const sections: SectionNavDetails[] = CONTINENT_VALUES.map((value) => {
    const count = getContinentCount(value)
    return {
      key: value,
      label: showCounts ? `${labels[value]} (${count})` : labels[value],
      icon: CONTINENT_ICONS[value],
    }
  })

  return (
    <div className={cn("space-y-14", className)}>
      <TabNav
        sections={sections}
        activeSection={selectedContinent}
        onSelect={handleSelect}
        useMotion
      />

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
