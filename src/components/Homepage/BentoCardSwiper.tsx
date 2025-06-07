"use client"

import { SwiperSlide } from "swiper/react"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Skeleton } from "../ui/skeleton"
import { Swiper, SwiperContainer, SwiperNavigation } from "../ui/swiper"

import BentoCard from "./BentoCard"
import { BentoItem } from "./utils"

import { useIsClient } from "@/hooks/useIsClient"

type BentoCardSwiperProps = {
  bentoItems: BentoItem[]
  eventCategory: string
}

const BentoCardSwiper = ({
  bentoItems,
  eventCategory,
}: BentoCardSwiperProps) => {
  const mounted = useIsClient()

  if (!mounted)
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="mx-auto mt-4 h-[476px] w-[512px] max-w-128 rounded-2xl border-primary/10 bg-background bg-gradient-to-b from-primary/10 from-20% to-primary/5 to-60% p-4 opacity-50 shadow-card-hover lg:hidden dark:from-primary/20 dark:to-primary/10" />
        <Skeleton className="h-6 w-[12rem] rounded-full" />
      </div>
    )

  return (
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
}

BentoCardSwiper.displayName = "BentoCardSwiper"

export default BentoCardSwiper
