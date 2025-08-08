"use client"

import { ReactNode } from "react"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

interface AppsSwiperProps {
  cards: ReactNode[]
}

const AppsSwiper = ({ cards }: AppsSwiperProps) => {
  return (
    <SwiperContainer className="md:hidden">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={16}
        breakpoints={{
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

export default AppsSwiper
