"use client"

import type { RSSItem } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"

import CardImage from "../Image/CardImage"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "../ui/card"
import { Carousel, CarouselItem } from "../ui/carousel"

type RecentPostsSwiperProps = {
  rssItems: RSSItem[]
  eventCategory: string
  className?: string
}

const RecentPostsSwiper = ({
  rssItems,
  eventCategory,
  className,
}: RecentPostsSwiperProps) => (
  <Carousel className={className}>
    {rssItems.map(({ pubDate, title, source, link, imgSrc }) => (
      <CarouselItem
        key={title}
        asChild
        className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
      >
        <Card
          href={link}
          customEventOptions={{
            eventCategory,
            eventAction: "blogs_posts",
            eventName: source,
          }}
        >
          <CardBanner background="accent-a">
            <CardImage src={imgSrc} />
          </CardBanner>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            {isValidDate(pubDate) && (
              <CardParagraph variant="subtitle" size="sm">
                {pubDate}
              </CardParagraph>
            )}
            <CardParagraph variant="uppercase" size="sm">
              {source}
            </CardParagraph>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </Carousel>
)

RecentPostsSwiper.displayName = "RecentPostsSwiper"

export default RecentPostsSwiper
