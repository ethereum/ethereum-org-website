"use client"

import { useState } from "react"
import { ExternalLink, Globe } from "lucide-react"

import type {
  Continent,
  EventItem,
  MatomoEventOptions,
  SectionNavDetails,
} from "@/lib/types"
import type { EventType } from "@/lib/types"

import Discord from "@/components/icons/discord.svg"
import Farcaster from "@/components/icons/farcaster.svg"
import Telegram from "@/components/icons/telegram.svg"
import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import Link from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import TabNav from "@/components/ui/TabNav"
import { Tag, TagProps } from "@/components/ui/tag"

const tagStatusMapping: Record<EventType, TagProps["status"]> = {
  conference: "accent-a",
  hackathon: "accent-b",
  meetup: "accent-c",
  group: "primary",
}

import { cn } from "@/lib/utils/cn"
import { formatDateRange } from "@/lib/utils/date"

import Africa from "./svgs/africa.svg"
import Asia from "./svgs/asia.svg"
import Europe from "./svgs/europe.svg"
import MiddleEast from "./svgs/middle-east.svg"
import NorthAmerica from "./svgs/north-america.svg"
import Oceania from "./svgs/oceania.svg"
import SouthAmerica from "./svgs/south-america.svg"

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
  all: <Globe className="stroke-1" />,
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
  onlineLabel: string
  maxEvents?: number
  className?: string
  matomoNavOptions: Pick<MatomoEventOptions, "eventCategory" | "eventAction">
  matomoLinkOptions: Pick<MatomoEventOptions, "eventCategory"> &
    Partial<Pick<MatomoEventOptions, "eventName">>
}

export default function ContinentTabs({
  events,
  labels,
  locale,
  noEventsMessage,
  onlineLabel,
  maxEvents = Infinity,
  className,
  matomoNavOptions,
  matomoLinkOptions,
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
      label: `${labels[value]} (${count})`,
      icon: CONTINENT_ICONS[value],
    }
  })

  return (
    <div className={cn("space-y-4 lg:space-y-14", className)}>
      <TabNav
        sections={sections}
        activeSection={selectedContinent}
        onSelect={handleSelect}
        useMotion
        className="[&>nav]:mx-0 md:[&>nav]:max-w-full"
        customEventOptions={matomoNavOptions}
      />

      {filteredEvents.length === 0 ? (
        <p className="py-8 text-center text-body-medium">{noEventsMessage}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_3fr_2fr_auto]">
          {displayedEvents.map((event) => {
            const socials = [
              { url: event.discord, Icon: Discord, label: "Discord" },
              { url: event.telegram, Icon: Telegram, label: "Telegram" },
              { url: event.farcaster, Icon: Farcaster, label: "Farcaster" },
              { url: event.twitter, Icon: Twitter, label: "Twitter" },
            ].filter((s) => s.url)

            return (
              <div
                key={event.id}
                className="col-span-full grid grid-cols-subgrid items-center gap-x-8 gap-y-4 border-b px-6 py-4 md:px-8 lg:py-2 xl:gap-x-16"
              >
                {/* Date */}
                <div className="max-lg:-mb-2">
                  {formatDateRange(event.startTime, event.endTime, locale)}
                </div>

                {/* Logo + Title + Location */}
                <LinkBox className="group rounded-xl p-2 hover:bg-background-highlight max-lg:-m-2">
                  <LinkOverlay
                    href={event.link}
                    className="flex min-w-0 items-center gap-4 no-underline"
                    hideArrow
                    customEventOptions={{
                      eventAction: "events_clicked",
                      eventName: event.title,
                      ...matomoLinkOptions,
                    }}
                  >
                    <div className="flex size-12 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={event.logoImage}
                        alt={event.title}
                        className="size-full object-contain"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 font-bold text-body group-hover:text-primary">
                        {event.title}
                        <ExternalLink className="size-4 shrink-0" />
                      </p>
                      <p className="text-body-medium">{event.location}</p>
                    </div>
                  </LinkOverlay>
                </LinkBox>

                {/* Tags */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {event.isOnline && <Tag status="tag">{onlineLabel}</Tag>}
                  {event.eventTypes.map((type, index) => (
                    <Tag key={type} status={tagStatusMapping[type]}>
                      {event.eventTypesLabels?.[index] || type}
                    </Tag>
                  ))}
                </div>

                {/* Socials */}
                {socials.length > 0 && (
                  <div className="relative flex items-center gap-10 lg:justify-end">
                    {socials.map(({ url, Icon, label }) => (
                      <Link
                        key={label}
                        href={url!}
                        aria-label={label}
                        hideArrow
                      >
                        <Icon className="size-8" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
