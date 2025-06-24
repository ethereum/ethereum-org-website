"use client"

import { Folder } from "lucide-react"

import { ButtonLink } from "@/components/ui/buttons/Button"
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

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const TopDapps = () => {
  const cardStyling = useBreakpointValue({
    base: {
      isVertical: true,
      imageSize: 12,
    },
    sm: {
      isVertical: true,
      imageSize: 12,
    },
    md: {
      isVertical: true,
      imageSize: 12,
    },
    lg: {
      isVertical: false,
      imageSize: 16,
    },
    xl: {
      isVertical: false,
      imageSize: 16,
    },
    "2xl": {
      isVertical: false,
      imageSize: 16,
    },
  })

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
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg border p-2">
                        <Folder className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-bold text-body no-underline group-hover:text-primary">
                        {category}
                      </p>
                    </div>
                    <div>
                      <ButtonLink
                        variant="outline"
                        isSecondary
                        size="sm"
                        href={`/dapps/categories/${category}`}
                        className="w-fit"
                      >
                        <p className="text-sm">See all</p>
                      </ButtonLink>
                    </div>
                  </div>
                </LinkOverlay>
              </LinkBox>
              <div className="flex flex-col">
                {DAPPS_DATA[category].map((dapp) => (
                  <div key={dapp.name} className="border-b">
                    <DappCard
                      dapp={dapp}
                      imageSize={cardStyling.imageSize}
                      isVertical={cardStyling.isVertical}
                    />
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
