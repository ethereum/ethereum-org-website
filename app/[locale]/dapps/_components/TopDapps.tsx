"use client"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { breakpointAsNumber } from "@/lib/utils/screen"

import { DAPPS_DATA } from "@/data/dapps"

import DappCard from "./DappCard"

const TopDapps = () => {
  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={32}
        breakpoints={{
          [breakpointAsNumber.sm]: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          [breakpointAsNumber.md]: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          [breakpointAsNumber.lg]: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {Object.keys(DAPPS_DATA).map((category) => (
          <SwiperSlide key={category}>
            <div>
              <h3>{category}</h3>
              <div className="flex flex-col gap-4">
                {DAPPS_DATA[category].map((dapp) => (
                  <DappCard key={dapp.name} dapp={dapp} imageSize={24} />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}

export default TopDapps
