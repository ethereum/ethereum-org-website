import { CommunityConference } from "@/lib/types"

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

import EventFallback from "@/public/images/events/event-placeholder.png"

type HackathonCardProps = {
  event: CommunityConference
  className?: string
}

const HackathonCard = ({ event, className }: HackathonCardProps) => {
  const { title, href, description, imageUrl, formattedDate, location } = event
  return (
    <Card
      href={href}
      key={title + description}
      customEventOptions={{
        eventCategory: "hackathons",
        eventAction: "click",
        eventName: title,
      }}
      className={className}
    >
      <CardBanner className="h-36">
        {imageUrl ? (
          <CardImage src={imageUrl} />
        ) : (
          <Image src={EventFallback} alt="" sizes="276px" />
        )}
      </CardBanner>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardSubTitle>{formattedDate} </CardSubTitle>
        <CardHighlight>{location}</CardHighlight>
      </CardContent>
    </Card>
  )
}

export default HackathonCard
