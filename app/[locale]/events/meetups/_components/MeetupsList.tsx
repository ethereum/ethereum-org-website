"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Tag } from "@/components/ui/tag"

import type { CommunityEvent } from "@/lib/events/types"

interface MeetupsListProps {
  events: CommunityEvent[]
}

const MeetupCard = ({ event }: { event: CommunityEvent }) => {
  const t = useTranslations("page-events")

  return (
    <Link
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-lg p-2 transition-colors hover:bg-background-highlight"
    >
      {/* Event logo */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-background-highlight">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary/10">
            <span className="text-xl font-bold text-primary">
              {event.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Event details */}
      <div className="flex flex-col gap-1">
        {/* Event type tag */}
        <Tag variant="outline" size="small" status="tag">
          {event.isRecurring
            ? t("page-events-recurring")
            : t(`page-events-${event.eventType}`)}
        </Tag>

        <h3 className="font-bold group-hover:text-primary">{event.title}</h3>

        <p className="text-sm text-body-medium">
          {event.isRecurring && event.recurringSchedule
            ? event.recurringSchedule
            : new Date(event.startDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
        </p>

        <p className="text-sm text-body-medium">{event.location}</p>
      </div>
    </Link>
  )
}

const MeetupsList = ({ events }: MeetupsListProps) => {
  const t = useTranslations("page-events")

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-body-light bg-background-highlight p-8">
        <p className="text-body-medium">{t("page-events-no-results")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <MeetupCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default MeetupsList
