import type { EventItem } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag, TagProps } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { formatDate, formatDateRange } from "@/lib/utils/date"

interface EventCardProps {
  event: EventItem
  variant?: "grid" | "highlight"
  className?: string
  locale?: string
  showTypeTag?: boolean
}

function EventCardGrid({ event, showTypeTag, locale }: EventCardProps) {
  const tagStatusMapping: Record<EventItem["eventType"], TagProps["status"]> = {
    conference: "accent-a",
    hackathon: "accent-b",
    meetup: "accent-c",
  }
  const formattedDate =
    event.startTime === event.endTime
      ? formatDate(event.startTime, locale, { year: undefined })
      : formatDateRange(event.startTime, event.endTime, locale)

  return (
    <LinkBox className="group rounded-xl p-2 hover:bg-background-highlight">
      <LinkOverlay href={event.link} className="no-underline" hideArrow>
        <div className="flex gap-3">
          <div className="flex size-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-body/5 to-body/10 dark:from-body/10 dark:to-body/20">
            <Image
              src={event.logoImage}
              alt={event.title}
              className="size-full object-contain"
              width={64}
              height={64}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            {showTypeTag && (
              <Tag
                size="small"
                variant="solid"
                status={tagStatusMapping[event.eventType]}
                className="w-fit"
              >
                {event.eventTypeLabel || event.eventType}
              </Tag>
            )}
            <p className="text-lg font-bold leading-tight text-body group-hover:text-primary">
              {event.title}
            </p>
            <p className="text-body">{formattedDate}</p>
            <p className="text-sm text-body-medium">{event.location}</p>
          </div>
        </div>
      </LinkOverlay>
    </LinkBox>
  )
}

function EventCardHighlight({ event, locale }: EventCardProps) {
  return (
    <LinkBox className="group w-full rounded-xl p-3 hover:bg-background-highlight">
      <LinkOverlay
        href={event.link}
        className="space-y-6 text-body no-underline"
        hideArrow
      >
        <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-body/5 to-body/10 dark:from-body/10 dark:to-body/20">
          <Image
            src={event.bannerImage || event.logoImage}
            alt={`${event.title} banner`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex size-16 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={event.logoImage}
              alt={event.title}
              className="size-full object-contain"
              width={64}
              height={64}
            />
          </div>
          <div className="space-y-1">
            <h3>{event.title}</h3>
            <p className="text-sm text-body-medium">{event.location}</p>
            <p className="text-sm text-body-medium">
              {formatDateRange(event.startTime, event.endTime, locale)}
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
  showTypeTag,
}: EventCardProps) {
  const Component = {
    grid: EventCardGrid,
    highlight: EventCardHighlight,
  }[variant ?? "grid"]

  return (
    <div className={cn(className)}>
      <Component
        event={event}
        variant={variant}
        locale={locale}
        showTypeTag={showTypeTag}
      />
    </div>
  )
}
