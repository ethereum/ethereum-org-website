"use client"

import type { Lang, RSSItem } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"
import { breakpointAsNumber } from "@/lib/utils/screen"

import ImageClientSide from "../Image/ImageClientSide"
import {
  Card,
  CardBanner,
  CardContent,
  CardHighlight,
  CardSubTitle,
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
  locale: Lang
  className?: string
}
const RecentPostsSwiper = ({
  rssItems,
  eventCategory,
  className,
  locale,
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
            <CardBanner>
              {/* CLIENT SIDE */}
              <ImageClientSide src={imgSrc} />
            </CardBanner>
            <CardContent>
              <CardTitle>{title}</CardTitle>
              {isValidDate(pubDate) && (
                <CardSubTitle>
                  {new Intl.DateTimeFormat(locale, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(pubDate))}
                </CardSubTitle>
              )}
              <CardHighlight>{source}</CardHighlight>
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
