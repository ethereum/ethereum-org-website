import { useRouter } from "next/router"

import type { EventCardProps } from "@/lib/types"

import { TwImage } from "@/components/Image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"

import EventFallback from "@/public/images/event-fallback.png"

const EventPreviewCard = ({
  title,
  href,
  location,
  description,
  startDate,
  endDate,
  imageUrl,
  className,
}: EventCardProps) => {
  const { locale } = useRouter()
  return (
    <a
      href={href}
      className={cn("no-underline md:w-1/3 md:max-w-128", className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card
        className={cn(
          "w-full space-y-4",
          "border-none shadow-none",
          "transition-transform duration-100 hover:scale-105 hover:transition-transform hover:duration-100"
        )}
      >
        <CardHeader className="h-48 w-full self-stretch overflow-hidden rounded-2xl bg-gradient-main p-0">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt=""
              className="max-w-full object-cover object-center"
            />
          ) : (
            <TwImage
              src={EventFallback}
              alt=""
              className="size-full object-cover text-body"
            />
          )}
        </CardHeader>
        <CardContent className="space-y-8 p-2 text-body">
          <div>
            <p className="text-lg">{title}</p>
            <p className="text-sm italic text-body-medium">
              {(isValidDate(startDate) || isValidDate(endDate)) &&
                new Intl.DateTimeFormat(locale, {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }).formatRange(
                  new Date(isValidDate(startDate) ? startDate : endDate),
                  new Date(isValidDate(endDate) ? endDate : startDate)
                )}
            </p>
            <p className="text-sm italic text-body-medium">{location}</p>
          </div>
          <p>{description}</p>
        </CardContent>
      </Card>
    </a>
  )
}

export default EventPreviewCard
