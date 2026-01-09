"use client"

import { ReactNode } from "react"

import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

interface EventsSwiperProps {
  cards: ReactNode[]
  className?: string
}

export default function EventsSwiper({ cards, className }: EventsSwiperProps) {
  return (
    <SwiperContainer className={className}>
      <Swiper
        slidesPerView={1.2}
        breakpoints={{
          480: {
            slidesPerView: 1.4,
          },
          640: {
            slidesPerView: 2.2,
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>{card}</SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  )
}
