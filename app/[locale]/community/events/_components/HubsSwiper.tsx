"use client"

import { ReactNode } from "react"

import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

import { breakpointAsNumber } from "@/lib/utils/screen"

interface HubsSwiperProps {
  cards: ReactNode[]
  className?: string
}

export default function HubsSwiper({ cards, className }: HubsSwiperProps) {
  console.log(cards.length)
  return (
    <SwiperContainer className={className}>
      <Swiper
        slidesPerView={1.2}
        className="[&_.swiper-wrapper]:items-stretch"
        breakpoints={{
          [breakpointAsNumber["md"]]: {
            slidesPerView: 2.3,
          },
          [breakpointAsNumber["lg"]]: {
            slidesPerView: 3.2,
          },
          [breakpointAsNumber["xl"]]: {
            slidesPerView: cards.length > 4 ? 4.2 : 4,
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="!h-auto">
            {card}
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}
