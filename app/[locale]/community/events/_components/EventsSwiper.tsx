"use client"

import { ReactNode } from "react"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

interface EventsSwiperProps {
  cards: ReactNode[]
  className?: string
}

export default function EventsSwiper({ cards, className }: EventsSwiperProps) {
  return (
    <SwiperContainer className={className}>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>{card}</SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}
