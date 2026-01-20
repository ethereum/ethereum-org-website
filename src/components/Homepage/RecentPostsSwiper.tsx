"use client"

import type { RSSItem } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"
import { breakpointAsNumber } from "@/lib/utils/screen"

import CardImage from "../Image/CardImage"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "../ui/card"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "../ui/swiper"

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
  <SwiperContainer className={className}>
    <Swiper
      spaceBetween={32}
      breakpoints={{
        [breakpointAsNumber.sm]: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        [breakpointAsNumber.lg]: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      }}
      slidesPerView={1}
      slidesPerGroup={1}
    >
      {rssItems.map(({ pubDate, title, source, link, imgSrc }) => (
        <SwiperSlide key={title}>
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
        </SwiperSlide>
      ))}
      <SwiperNavigation />
    </Swiper>
  </SwiperContainer>
)

RecentPostsSwiper.displayName = "RecentPostsSwiper"

export default RecentPostsSwiper
