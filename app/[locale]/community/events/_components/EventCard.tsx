"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

import type { EventItem, MatomoEventOptions } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { formatDate, formatDateRange } from "@/lib/utils/date"

import { TAG_STATUS_MAPPING } from "../utils"

interface EventCardProps {
  event: EventItem
  variant?: "grid" | "highlight"
  className?: string
  locale: string
  showTypeTag?: boolean
  customEventOptions?: MatomoEventOptions
}

function EventCardGrid({
  event,
  showTypeTag,
  locale,
  customEventOptions,
}: EventCardProps) {
  const [logoError, setLogoError] = useState(false)

  const primaryType = event.eventTypes?.[0]

  const hasDate = Boolean(event.startTime)
  const formattedDate = hasDate
    ? event.startTime === event.endTime
      ? formatDate(event.startTime, locale, { year: undefined })
      : formatDateRange(event.startTime, event.endTime, locale)
    : null

  return (
    <LinkBox className="hover:bg-background-highlight group rounded-xl p-2">
      <LinkOverlay
        href={event.link}
        className="no-underline"
        hideArrow
        matomoEvent={customEventOptions}
      >
        <div className="flex gap-3">
          <div className="from-body/5 to-body/10 dark:from-body/10 dark:to-body/20 bg-linear-to-b flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl text-2xl">
            {event.logoImage && !logoError ? (
              <Image
                src={event.logoImage}
                alt={event.title}
                className="size-full object-cover"
                width={64}
                height={64}
                onError={() => setLogoError(true)}
              />
            ) : (
              <MapPin className="text-body-medium size-8" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            {showTypeTag && primaryType && (
              <Tag
                size="small"
                variant="solid"
                status={TAG_STATUS_MAPPING[primaryType]}
                className="w-fit"
              >
                {event.eventTypesLabels?.[0] || primaryType}
              </Tag>
            )}
            <p className="text-body group-hover:text-primary text-lg font-bold leading-tight">
              {event.title}
            </p>
            {formattedDate && <p className="text-body">{formattedDate}</p>}
            <p className="text-body-medium text-sm">{event.location}</p>
          </div>
        </div>
      </LinkOverlay>
    </LinkBox>
  )
}

function EventCardHighlight({
  event,
  locale,
  customEventOptions,
}: EventCardProps) {
  const [logoError, setLogoError] = useState(false)
  const [bannerError, setBannerError] = useState(false)

  const bannerSrc = event.bannerImage || event.logoImage

  return (
    <LinkBox className="hover:bg-background-highlight group w-full rounded-xl p-3">
      <LinkOverlay
        href={event.link}
        className="text-body space-y-6 no-underline"
        hideArrow
        matomoEvent={customEventOptions}
      >
        <div className="from-body/5 to-body/10 dark:from-body/10 dark:to-body/20 bg-linear-to-b relative h-[200px] w-full overflow-hidden rounded-xl">
          {bannerSrc && !bannerError ? (
            <Image
              src={bannerSrc}
              alt={`${event.title} banner`}
              fill
              className="object-cover"
              onError={() => setBannerError(true)}
            />
          ) : (
            <div className="text-body-medium flex size-full items-center justify-center">
              <MapPin className="size-16" />
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <div className="bg-body/5 dark:bg-body/10 flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg">
            {event.logoImage && !logoError ? (
              <Image
                src={event.logoImage}
                alt={event.title}
                className="size-full object-contain"
                width={64}
                height={64}
                onError={() => setLogoError(true)}
              />
            ) : (
              <MapPin className="text-body-medium size-8" />
            )}
          </div>
          <div className="space-y-1">
            <h3>{event.title}</h3>
            <p className="text-body-medium text-sm">{event.location}</p>
            <p className="text-body-medium text-sm">
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
  locale,
  showTypeTag,
  customEventOptions,
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
        customEventOptions={customEventOptions}
      />
    </div>
  )
}
