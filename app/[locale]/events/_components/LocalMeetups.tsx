"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import type { CommunityEvent } from "@/lib/events/types"

interface LocalMeetupsProps {
  events: CommunityEvent[]
}

const MeetupRow = ({ event }: { event: CommunityEvent }) => {
  // Extract city from location (format: "City, Country")
  const city = event.location.split(",")[0].trim()

  return (
    <Link
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between border-b border-body-light py-3 transition-colors hover:bg-background-highlight"
    >
      <span className="font-medium text-body group-hover:text-primary">
        {event.title}
      </span>
      <span className="flex items-center gap-2 text-sm text-body-medium">
        {city}
        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
    </Link>
  )
}

const LocalMeetups = ({ events }: LocalMeetupsProps) => {
  const t = useTranslations("page-events")

  // Show only first 10 events
  const displayedEvents = events.slice(0, 10)

  return (
    <div className="flex flex-col gap-6">
      {/* Search input */}
      <div className="max-w-md">
        <Input
          type="search"
          placeholder={t("page-events-search-meetups")}
          size="md"
        />
      </div>

      {/* Meetup list table */}
      <div className="flex flex-col">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-body-light py-3">
          <span className="text-sm font-medium text-body-medium">
            {t("page-events-meetup-name")}
          </span>
          <span className="text-sm font-medium text-body-medium">
            {t("page-events-meetup-city")}
          </span>
        </div>

        {/* Meetup rows */}
        {displayedEvents.map((event) => (
          <MeetupRow key={event.id} event={event} />
        ))}
      </div>

      {events.length > 10 && (
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/events/meetups">
              {t("page-events-view-all-meetups")}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default LocalMeetups
