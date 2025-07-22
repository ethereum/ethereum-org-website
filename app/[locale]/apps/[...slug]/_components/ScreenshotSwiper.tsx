"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { breakpointAsNumber } from "@/lib/utils/screen"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

interface ScreenshotSwiperProps {
  screenshots: string[]
  appName: string
}

const ScreenshotSwiper = ({ screenshots, appName }: ScreenshotSwiperProps) => {
  const lazyPreloadPrevNext = useBreakpointValue({ base: 1, sm: 2, md: 4 })
  return (
    <SwiperContainer>
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        lazyPreloadPrevNext={lazyPreloadPrevNext}
        breakpoints={{
          [breakpointAsNumber.sm]: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          [breakpointAsNumber.lg]: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          [breakpointAsNumber.xl]: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={index}>
            <Image
              src={screenshot}
              alt={`Screenshot ${index + 1} of ${appName} showing the application interface`}
              width={340}
              height={700}
              sizes="170px"
              className="h-[350px] w-[170px] rounded-lg object-contain"
            />
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}

export default ScreenshotSwiper
