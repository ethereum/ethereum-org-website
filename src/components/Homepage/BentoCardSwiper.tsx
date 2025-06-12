"use client"

import { SwiperSlide } from "swiper/react"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Swiper, SwiperContainer, SwiperNavigation } from "../ui/swiper"

import BentoCard from "./BentoCard"
import { BentoItem } from "./utils"

type BentoCardSwiperProps = {
  bentoItems: BentoItem[]
  eventCategory: string
}

const BentoCardSwiper = ({
  bentoItems,
  eventCategory,
}: BentoCardSwiperProps) => (
  <SwiperContainer
    className={cn(
      "lg:hidden", // Mobile only
      "[&_.swiper-slide]:overflow-visible [&_.swiper-slide]:rounded-2xl [&_.swiper-slide]:shadow-card-hover",
      "[&_.swiper-slide-shadow]:!bg-transparent",
      "[&_.swiper]:mx-auto [&_.swiper]:mt-4 [&_.swiper]:!flex [&_.swiper]:h-fit [&_.swiper]:max-w-128 [&_.swiper]:flex-col [&_.swiper]:items-center"
    )}
  >
    <Swiper
      effect="cards"
      onSlideChange={({ activeIndex }) => {
        trackCustomEvent({
          eventCategory,
          eventAction: "mobile use cases",
          eventName: `swipe to card ${activeIndex + 1}`,
        })
      }}
    >
      {bentoItems.map(({ className, ...item }) => (
        <SwiperSlide key={item.title}>
          <BentoCard
            imgHeight={220}
            {...item}
            className={cn(className, "bg-background text-body")}
            imgWidth={undefined} // Intentionally last to override box
            eventCategory={eventCategory}
          />
        </SwiperSlide>
      ))}
      <SwiperNavigation />
    </Swiper>
  </SwiperContainer>
)

BentoCardSwiper.displayName = "BentoCardSwiper"

export default BentoCardSwiper
