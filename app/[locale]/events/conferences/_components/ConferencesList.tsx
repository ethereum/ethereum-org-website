"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Tag } from "@/components/ui/tag"

import type { CommunityEvent } from "@/lib/events/types"

interface ConferencesListProps {
  events: CommunityEvent[]
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startMonth = start.toLocaleDateString("en-US", { month: "short" })
  const startDay = start.getDate()
  const endDay = end.getDate()

  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay} - ${endDay}`
  }

  const endMonth = end.toLocaleDateString("en-US", { month: "short" })
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
}

const ConferenceRow = ({ event }: { event: CommunityEvent }) => {
  return (
    <Link
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 rounded-lg border border-body-light bg-background p-4 transition-colors hover:border-primary"
    >
      <div className="flex items-center gap-4">
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
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold group-hover:text-primary">
              {event.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-body-medium" />
          </div>
          <p className="text-sm text-body-medium">{event.location}</p>
        </div>
      </div>

      {/* Date and tags */}
      <div className="hidden items-center gap-4 md:flex">
        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} variant="outline" size="small" status="tag">
              {tag}
            </Tag>
          ))}
        </div>
        <p className="min-w-[100px] text-right text-sm text-body-medium">
          {formatDateRange(event.startDate, event.endDate)}
        </p>
      </div>
    </Link>
  )
}

const ConferencesList = ({ events }: ConferencesListProps) => {
  const t = useTranslations("page-events")

  // Sort by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  if (sortedEvents.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-body-light bg-background-highlight p-8">
        <p className="text-body-medium">{t("page-events-no-results")}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {sortedEvents.map((event) => (
        <ConferenceRow key={event.id} event={event} />
      ))}
    </div>
  )
}

export default ConferencesList
