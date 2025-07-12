"use client"

import type { CommunityConference } from "@/lib/types"

import { Swiper, SwiperSlide } from "@/components/ui/swiper"

import HackathonCard from "../HackathonCard"

type HackathonSwiperProps = {
  events: CommunityConference[]
  eventCategory: string
}

const HackathonSwiper = ({ events, eventCategory }: HackathonSwiperProps) => (
  <Swiper spaceBetween={16} slidesPerView={1.25}>
    {events.map((event, idx) => (
      <SwiperSlide key={idx} className="max-2xl:first:ms-8 max-2xl:last:pe-16">
        <HackathonCard event={event} eventCategory={eventCategory} />
      </SwiperSlide>
    ))}
  </Swiper>
)

export default HackathonSwiper
