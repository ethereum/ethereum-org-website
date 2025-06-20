"use client"

import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
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
            <div className="flex flex-col rounded-xl border">
              <LinkBox className="border-b p-4 hover:bg-background-highlight">
                <LinkOverlay
                  href={`/dapps/categories/${category}`}
                  className="text-body no-underline"
                >
                  <h3>{category}</h3>
                </LinkOverlay>
              </LinkBox>
              <div className="flex flex-col">
                {DAPPS_DATA[category].map((dapp) => (
                  <div key={dapp.name} className="border-b">
                    <DappCard dapp={dapp} imageSize={16} />
                  </div>
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
