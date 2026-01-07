"use client"

import { Calendar, ExternalLink, MapPin } from "lucide-react"
import Link from "next/link"

import { Tag } from "@/components/ui/tag"

import type { CommunityEvent } from "@/lib/events/types"

interface CityEventsListProps {
  events: CommunityEvent[]
  isPast?: boolean
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  if (start.toDateString() === end.toDateString()) {
    return start.toLocaleDateString("en-US", options)
  }

  const startMonth = start.toLocaleDateString("en-US", { month: "short" })
  const startDay = start.getDate()
  const endDay = end.getDate()
  const year = start.getFullYear()

  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`
  }

  const endMonth = end.toLocaleDateString("en-US", { month: "short" })
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
}

const CityEventsList = ({ events, isPast = false }: CityEventsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {events.map((event) => (
        <Link
          key={event.id}
          href={event.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex gap-4 rounded-lg border border-body-light bg-background p-4 transition-colors hover:border-primary ${
            isPast ? "opacity-70" : ""
          }`}
        >
          {/* Event logo */}
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background-highlight">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary/10">
                <span className="text-lg font-bold text-primary">
                  {event.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-body group-hover:text-primary">
                {event.title}
              </h3>
              <ExternalLink className="h-4 w-4 shrink-0 text-body-medium" />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-body-medium">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {event.isRecurring
                  ? event.recurringSchedule
                  : formatDateRange(event.startDate, event.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <Tag variant="outline" size="small" status="tag">
                {event.eventType}
              </Tag>
              {event.isRecurring && (
                <Tag variant="solid" size="small" status="success">
                  Recurring
                </Tag>
              )}
              {event.tags.slice(0, 2).map((tag) => (
                <Tag key={tag} variant="outline" size="small" status="tag">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CityEventsList
