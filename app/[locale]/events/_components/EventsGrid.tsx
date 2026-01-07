"use client"

import { useState } from "react"
import { Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import type { CommunityEvent } from "@/lib/events/types"

interface EventsGridProps {
  events: CommunityEvent[]
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startDay = start.getDate()
  const endDay = end.getDate()
  const month = start.toLocaleDateString("en-US", { month: "long" })
  const year = start.getFullYear()

  if (startDay === endDay) {
    return `${startDay} ${month} ${year}`
  }

  return `${startDay} - ${endDay} ${month} ${year}`
}

const EventCard = ({ event }: { event: CommunityEvent }) => {
  const t = useTranslations("page-events")

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-body-light bg-background">
      {/* Date badge */}
      <div className="flex items-center gap-2 border-b border-body-light px-4 py-3">
        <Calendar className="h-4 w-4 text-body-medium" />
        <span className="text-sm text-body-medium">
          {formatDateRange(event.startDate, event.endDate)}
        </span>
      </div>

      {/* Event image */}
      <div className="h-32 w-full overflow-hidden bg-background-highlight">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-2xl font-bold text-primary/50">
              {event.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Event content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title and location */}
        <div className="flex flex-col gap-1 text-center">
          <h3 className="font-bold text-body">{event.title}</h3>
          <p className="text-sm text-body-medium">{event.location}</p>
        </div>

        {/* Description */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-body-medium">
          {event.description}
        </p>

        {/* CTA Button */}
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={event.href} target="_blank" rel="noopener noreferrer">
            {t("page-events-website")}
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    </article>
  )
}

const EventsGrid = ({ events }: EventsGridProps) => {
  const t = useTranslations("page-events")
  const [showAll, setShowAll] = useState(false)

  // Show 9 events initially (3x3 grid), or all if showAll is true
  const displayedEvents = showAll ? events : events.slice(0, 9)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length > 9 && !showAll && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            {t("page-events-load-more")}
          </Button>
        </div>
      )}
    </div>
  )
}

export default EventsGrid
