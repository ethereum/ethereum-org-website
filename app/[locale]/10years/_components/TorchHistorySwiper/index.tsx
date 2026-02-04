"use client"

import { EffectCoverflow, Navigation } from "swiper/modules"
import { SwiperSlide } from "swiper/react"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
} from "@/components/atoms/swiper"

import TorchHistoryCard from "../TorchHistoryCard"
import { type TorchHolder } from "../torchHoldersData"

type TorchHistorySwiperProps = {
  holders: TorchHolder[]
}

const TorchHistorySwiper = ({ holders }: TorchHistorySwiperProps) => {
  return (
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
        {holders.map((holder, idx) => {
          // For past holders, "to" is the timestamp of the next holder's event
          // For the last holder (burned), "to" is undefined
          const toTimestamp =
            idx < holders.length - 1
              ? holders[idx + 1].event.timestamp
              : undefined

          return (
            <SwiperSlide
              key={idx}
              className="flex !min-h-[400px] !w-60 justify-center"
            >
              <TorchHistoryCard
                className="!min-h-[400px]"
                name={holder.name}
                role={holder.role}
                avatar={holder.avatarPath}
                twitter={holder.twitter}
                from={holder.event.timestamp}
                to={toTimestamp}
                transactionHash={holder.event.transactionHash}
                isCurrentHolder={false}
                isPlaceholder={false}
              />
            </SwiperSlide>
          )
        })}
        <SwiperNavigation className="mt-8" />
      </Swiper>
    </SwiperContainer>
  )
}

export default TorchHistorySwiper
