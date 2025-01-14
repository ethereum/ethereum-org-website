import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsCalendar3 } from "react-icons/bs"

import type { EventCardProps } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import { TwImage } from "./Image"

import EventFallback from "@/public/images/events/event-placeholder.png"

const EventCard: React.FC<EventCardProps> = ({
  title,
  href,
  description,
  className,
  location,
  imageUrl,
  endDate,
  startDate,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-community")

  const formatedDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
  }).formatRange(
    new Date(startDate?.replace(/-/g, "/")),
    new Date(endDate?.replace(/-/g, "/"))
  )

  return (
    <Card className={cn("flex h-full flex-col rounded-md border", className)}>
      <CardHeader className="flex flex-row items-center justify-center rounded-t-md border-b border-primary bg-[#FCFCFC] p-2 dark:bg-[#272627]">
        <BsCalendar3 className="me-2 h-6 w-6 text-primary" />
        <span className="!mt-0 text-right text-sm text-primary">
          {formatedDate}
        </span>
      </CardHeader>
      <div className="flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = EventFallback.src
            }}
            className="max-h-[224px] w-full object-cover xl:h-[124px]"
          />
        ) : (
          <TwImage src={EventFallback} alt="" />
        )}
      </div>
      <CardContent className="flex-grow p-4">
        <div className="text-center">
          <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
          <span className="text-sm opacity-60">{location}</span>
        </div>
        <p className="line-clamp-6 md:text-sm md:leading-[1.6rem]">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <ButtonLink href={href} variant="outline" className="w-full text-sm">
          {t("page-community-upcoming-events-view-event")}
        </ButtonLink>
      </CardFooter>
    </Card>
  )
}

export default EventCard
