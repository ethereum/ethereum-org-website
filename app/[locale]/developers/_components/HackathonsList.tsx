"use client"

import { useEffect, useState } from "react"

import type { EventItem } from "@/lib/types"

import { Image } from "@/components/Image"
import CardImage from "@/components/Image/CardImage"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"

import { cn } from "@/lib/utils/cn"
import { formatDateRange } from "@/lib/utils/date"

import fallbackThumbnail from "@/public/images/eth-glyph-thumbnail.png"

const MAX_HACKATHONS = 5

const isUpcoming = (event: EventItem, now: number) =>
  new Date(event.endTime || event.startTime).getTime() >= now

type HackathonsListProps = {
  // Build-time list, embedded in the static HTML so the section has content and
  // SEO on first paint.
  initial: EventItem[]
  locale: string
}

/**
 * The developers page is statically rendered, so any build-time date filter
 * freezes and past events linger between deploys (see #18086). This client
 * component re-filters with a live clock on mount -- dropping events that ended
 * since the last deploy -- then pulls the freshest list from the data-layer so
 * newly-added events surface without a redeploy. Keeping this client-side lets
 * the page stay fully static (no route-level ISR, which would break the page's
 * public/content reads on Netlify's serverless runtime).
 */
const HackathonsList = ({ initial, locale }: HackathonsListProps) => {
  const [hackathons, setHackathons] = useState(initial)

  useEffect(() => {
    // Immediately prune build-time-stale events with the browser's clock.
    setHackathons(
      initial.filter((e) => isUpcoming(e, Date.now())).slice(0, MAX_HACKATHONS)
    )

    let cancelled = false
    fetch("/api/hackathons")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: EventItem[]) => {
        if (cancelled || !Array.isArray(data)) return
        setHackathons(
          data.filter((e) => isUpcoming(e, Date.now())).slice(0, MAX_HACKATHONS)
        )
      })
      // On failure keep the filtered seed -- never worse than the static page.
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [initial])

  return (
    <EdgeScrollContainer>
      {hackathons.map((event) => {
        const { title, link, bannerImage, location, startTime, endTime } = event

        return (
          <EdgeScrollItem
            key={event.id}
            asChild
            className={cn(
              "ms-4 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]",
              "*:max-w-md *:min-w-72 *:flex-1"
            )}
          >
            <Card
              href={link}
              customEventOptions={{
                eventCategory: "hackathons",
                eventAction: "click",
                eventName: title,
              }}
              variant="ghost"
              size="sm"
            >
              <CardHeader>
                <CardBanner size="sm">
                  {bannerImage ? (
                    <CardImage src={bannerImage} />
                  ) : (
                    <Image src={fallbackThumbnail} alt="" sizes="276px" />
                  )}
                </CardBanner>
              </CardHeader>
              <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardParagraph variant="subtitle" size="sm">
                  {formatDateRange(startTime, endTime, locale, {
                    year: "numeric",
                  })}
                </CardParagraph>
                <CardParagraph variant="subtitle" size="sm">
                  {location}
                </CardParagraph>
              </CardContent>
            </Card>
          </EdgeScrollItem>
        )
      })}
    </EdgeScrollContainer>
  )
}

export default HackathonsList
