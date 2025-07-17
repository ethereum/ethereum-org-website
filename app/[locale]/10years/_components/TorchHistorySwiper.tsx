"use client"

import { EffectCoverflow, Navigation } from "swiper/modules"
import { SwiperSlide } from "swiper/react"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
} from "@/components/ui/swiper"

import TorchHistoryCard from "./TorchHistoryCard"

import { getBlockieImage, HolderEvent } from "@/lib/torch"

type TorchHistorySwiperProps = {
  holders: HolderEvent[]
}

const TorchHistorySwiper = ({ holders }: TorchHistorySwiperProps) => (
  <SwiperContainer className="w-full">
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      initialSlide={holders.length - 1}
      coverflowEffect={{
        rotate: 0,
        stretch: -50,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Navigation]}
      className="w-full"
    >
      {holders.map((holder, idx) => (
        <SwiperSlide key={idx} className="flex !h-[400px] !w-60 justify-center">
          <TorchHistoryCard
            className="!h-[400px]"
            name={holder.name}
            role={holder.role}
            avatar={getBlockieImage(holder.address)}
            from={holder.event.timestamp}
            to={holder.event.timestamp}
            transactionHash={holder.event.transactionHash}
          />
        </SwiperSlide>
      ))}
      <SwiperNavigation className="mt-8" />
    </Swiper>
  </SwiperContainer>
)

export default TorchHistorySwiper
