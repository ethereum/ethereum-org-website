"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import type { CommunityEvent } from "@/lib/events/types"

interface UpcomingConferencesProps {
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
    <div className="group flex items-center justify-between gap-4 rounded-lg border border-body-light bg-background p-4 transition-colors hover:border-primary">
      <Link
        href={event.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center gap-4"
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
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-body group-hover:text-primary">
              {event.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-body-medium" />
          </div>
          <p className="text-sm text-body-medium">{event.location}</p>
        </div>
      </Link>

      {/* Date and tags */}
      <div className="flex items-center gap-4">
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

      {/* Social links */}
      {event.socialLinks && (
        <div className="hidden items-center gap-2 lg:flex">
          {event.socialLinks.twitter && (
            <Link
              href={event.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-medium hover:text-primary"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          )}
          {event.socialLinks.telegram && (
            <Link
              href={event.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-medium hover:text-primary"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

const UpcomingConferences = ({ events }: UpcomingConferencesProps) => {
  const t = useTranslations("page-events")

  // Sort by date and show only first 6
  const sortedEvents = [...events]
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 6)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {sortedEvents.map((event) => (
          <ConferenceRow key={event.id} event={event} />
        ))}
      </div>

      {events.length > 6 && (
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/events/conferences">
              {t("page-events-view-all-conferences")}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default UpcomingConferences
