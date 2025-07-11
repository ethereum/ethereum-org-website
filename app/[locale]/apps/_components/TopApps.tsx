"use client"

import { Folder } from "lucide-react"

import { DappCategory, DappData } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { breakpointAsNumber } from "@/lib/utils/screen"
import { slugify } from "@/lib/utils/url"

import AppCard from "./AppCard"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import { useIsClient } from "@/hooks/useIsClient"

interface TopAppsProps {
  appsData: Record<DappCategory, DappData[]>
}

const TopApps = ({ appsData }: TopAppsProps) => {
  const isClient = useIsClient()
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

  // Use fallback values during SSR to prevent hydration mismatch
  const imageSize = isClient ? cardStyling.imageSize : 12
  const isVertical = isClient ? cardStyling.isVertical : true

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
        {Object.keys(appsData).map((category) => (
          <SwiperSlide key={category}>
            <div className="flex flex-col rounded-xl border">
              <LinkBox className="border-b p-4 hover:bg-background-highlight">
                <LinkOverlay
                  href={`/apps/categories/${slugify(category)}`}
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
                      <Button
                        variant="outline"
                        isSecondary
                        size="sm"
                        className="w-fit"
                      >
                        <p className="text-sm">See all</p>
                      </Button>
                    </div>
                  </div>
                </LinkOverlay>
              </LinkBox>
              <div className="flex flex-col">
                {appsData[category].slice(0, 5).map((app) => (
                  <div key={app.name} className="border-b last:border-b-0">
                    <AppCard
                      app={app}
                      imageSize={imageSize}
                      isVertical={isVertical}
                      hideTag={true}
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

export default TopApps
