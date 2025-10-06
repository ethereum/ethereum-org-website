"use client"

import type { CommunityConference } from "@/lib/types"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import HackathonCard from "../HackathonCard"

type HackathonSwiperProps = {
  events: CommunityConference[]
}

const HackathonSwiper = ({ events }: HackathonSwiperProps) => (
  <Swiper spaceBetween={16} slidesPerView={1.25}>
    {events.map((event, idx) => (
      <SwiperSlide key={idx} className="max-2xl:first:ms-8 max-2xl:last:pe-16">
        <HackathonCard event={event} />
      </SwiperSlide>
    ))}
  </Swiper>
)

export default HackathonSwiper
