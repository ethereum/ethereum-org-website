import { getLocale } from "next-intl/server"

import type { EventItem } from "@/lib/types"

import { Image } from "@/components/Image"
import CardImage from "@/components/Image/CardImage"
import {
  Card,
  CardBanner,
  CardContent,
  CardHighlight,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"

import { formatDateRange } from "@/lib/utils/date"

import EventFallback from "@/public/images/events/event-placeholder.png"

type HackathonCardProps = {
  event: EventItem
  className?: string
}

const HackathonCard = async ({ event, className }: HackathonCardProps) => {
  const locale = await getLocale()
  const { title, link, bannerImage, location, startTime, endTime } = event
  const formattedDate = formatDateRange(startTime, endTime, locale, {
    year: "numeric",
  })

  return (
    <Card
      href={link}
      customEventOptions={{
        eventCategory: "hackathons",
        eventAction: "click",
        eventName: title,
      }}
      className={className}
    >
      <CardBanner className="h-36">
        {bannerImage ? (
          <CardImage src={bannerImage} />
        ) : (
          <Image src={EventFallback} alt="" sizes="276px" />
        )}
      </CardBanner>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardSubTitle>{formattedDate}</CardSubTitle>
        <CardHighlight>{location}</CardHighlight>
      </CardContent>
    </Card>
  )
}

export default HackathonCard
