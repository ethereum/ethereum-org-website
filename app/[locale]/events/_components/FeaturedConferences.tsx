"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import type { CommunityEvent } from "@/lib/events/types"

interface FeaturedConferencesProps {
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

const FeaturedConferences = ({ events }: FeaturedConferencesProps) => {
  const t = useTranslations("page-events")

  if (events.length === 0) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {events.map((event) => (
          <CarouselItem
            key={event.id}
            className="pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <Link
              href={event.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article className="flex flex-col gap-4">
                {/* Banner image */}
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-background-highlight">
                  {event.bannerUrl ? (
                    <img
                      src={event.bannerUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <span className="text-4xl font-bold text-primary/50">
                        {event.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Event info */}
                <div className="flex gap-3">
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
                        <span className="text-xl font-bold text-primary">
                          {event.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-body group-hover:text-primary">
                      {event.title}
                    </h3>
                    <p className="text-sm text-body-medium">{event.location}</p>
                    <p className="text-sm text-body-medium">
                      {event.startDate && event.endDate
                        ? formatDateRange(event.startDate, event.endDate)
                        : t("page-events-tbd")}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}

export default FeaturedConferences
