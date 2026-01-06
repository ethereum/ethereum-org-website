import { ExternalLink, Send } from "lucide-react"

import type { EventItem } from "@/lib/types"

import Discord from "@/components/icons/discord.svg"
import Farcaster from "@/components/icons/farcaster.svg"
import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

interface EventCardProps {
  event: EventItem
  variant: "grid" | "row" | "highlight"
  className?: string
  locale?: string
}

const EVENT_TYPE_VARIANTS: Record<
  EventItem["eventType"],
  "tag" | "success" | "warning"
> = {
  conference: "tag",
  hackathon: "success",
  meetup: "warning",
}

function formatDateRange(
  startTime: string,
  endTime: string | null,
  locale: string = "en"
): string {
  const start = new Date(startTime)
  const end = endTime ? new Date(endTime) : null

  const monthDayOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  }

  const dayOnlyOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
  }

  const startStr = start.toLocaleDateString(locale, monthDayOptions)

  // Single day event or no end date
  if (!end || start.toDateString() === end.toDateString()) {
    return startStr
  }

  // Same month - show "May 7 - 9"
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    const endDay = end.toLocaleDateString(locale, dayOnlyOptions)
    return `${startStr} - ${endDay}`
  }

  // Different months - show "May 7 - Jun 9"
  const endStr = end.toLocaleDateString(locale, monthDayOptions)
  return `${startStr} - ${endStr}`
}

function SocialIcons({ event }: { event: EventItem }) {
  const socials = [
    { url: event.twitter, Icon: Twitter, label: "Twitter" },
    { url: event.discord, Icon: Discord, label: "Discord" },
    { url: event.telegram, Icon: Send, label: "Telegram" },
    { url: event.farcaster, Icon: Farcaster, label: "Farcaster" },
  ].filter((s) => s.url)

  if (socials.length === 0) return null

  return (
    <div className="relative z-20 flex items-center gap-3">
      {socials.map(({ url, Icon, label }) => (
        <a
          key={label}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors hover:text-primary-hover"
          aria-label={label}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  )
}

function EventCardGrid({ event, locale }: EventCardProps) {
  return (
    <LinkBox className="group rounded-xl p-2 hover:bg-background-highlight">
      <LinkOverlay
        href={event.link}
        className="no-underline"
        isExternal
        hideArrow
      >
        <div className="flex gap-3">
          <div className="flex size-16 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={event.logoImage}
              alt={event.title}
              className="size-full object-contain"
              width={64}
              height={64}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-wrap gap-1">
              <Tag size="small" status={EVENT_TYPE_VARIANTS[event.eventType]}>
                {event.eventType}
              </Tag>
              {event.isOnline && (
                <Tag size="small" status="normal">
                  Online
                </Tag>
              )}
            </div>
            <p className="text-lg font-bold leading-tight text-body group-hover:text-primary">
              {event.title}
            </p>
            <p className="text-sm text-body-medium">
              {formatDateRange(event.startTime, event.endTime, locale)}
            </p>
            <p className="text-sm text-body-medium">{event.location}</p>
          </div>
        </div>
      </LinkOverlay>
    </LinkBox>
  )
}

function EventCardRow({ event, locale }: EventCardProps) {
  return (
    <LinkBox className="group grid grid-cols-[100px_1fr_auto_auto] items-center gap-6 border-b border-body-light py-4 hover:bg-background-highlight">
      {/* Date column */}
      <div className="text-sm text-body-medium">
        {formatDateRange(event.startTime, event.endTime, locale)}
      </div>

      {/* Logo + Name + Location column */}
      <LinkOverlay
        href={event.link}
        className="flex min-w-0 items-center gap-4 no-underline"
        isExternal
        hideArrow
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
          <p className="text-sm text-body-medium">{event.location}</p>
        </div>
      </LinkOverlay>

      {/* Tags column */}
      <div className="flex shrink-0 items-center gap-2">
        {event.isOnline && (
          <Tag size="small" status="normal">
            Online
          </Tag>
        )}
        <Tag size="small" status={EVENT_TYPE_VARIANTS[event.eventType]}>
          {event.eventType}
        </Tag>
      </div>

      {/* Social icons column */}
      <SocialIcons event={event} />
    </LinkBox>
  )
}

function EventCardHighlight({ event, locale }: EventCardProps) {
  return (
    <LinkBox className="group w-full rounded-xl p-3 hover:bg-background-highlight">
      <LinkOverlay
        href={event.link}
        className="no-underline"
        isExternal
        hideArrow
      >
        <div className="relative mb-3 aspect-[2/1] w-full overflow-hidden rounded-xl">
          <Image
            src={event.bannerImage || event.logoImage}
            alt={`${event.title} banner`}
            fill
            className="object-cover"
          />
        </div>
        <div className="mb-3 flex flex-wrap gap-1">
          <Tag size="small" status={EVENT_TYPE_VARIANTS[event.eventType]}>
            {event.eventType}
          </Tag>
          {event.isOnline && (
            <Tag size="small" status="normal">
              Online
            </Tag>
          )}
        </div>
        <div className="flex gap-3">
          <div className="flex size-12 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={event.logoImage}
              alt={event.title}
              className="size-full object-contain"
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-lg font-bold leading-tight text-body group-hover:text-primary">
              {event.title}
            </p>
            <p className="text-sm text-body-medium">
              {formatDateRange(event.startTime, event.endTime, locale)} •{" "}
              {event.location}
            </p>
          </div>
        </div>
      </LinkOverlay>
    </LinkBox>
  )
}

export default function EventCard({
  event,
  variant,
  className,
  locale = "en",
}: EventCardProps) {
  const Component = {
    grid: EventCardGrid,
    row: EventCardRow,
    highlight: EventCardHighlight,
  }[variant]

  return (
    <div className={cn(className)}>
      <Component event={event} variant={variant} locale={locale} />
    </div>
  )
}
