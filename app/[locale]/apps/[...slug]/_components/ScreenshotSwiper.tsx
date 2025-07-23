"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

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
        slidesPerView="auto"
        spaceBetween={16}
        lazyPreloadPrevNext={lazyPreloadPrevNext}
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <Image
              src={screenshot}
              alt={`Screenshot ${index + 1} of ${appName} showing the application interface`}
              width={300}
              height={600}
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px"
              className="h-[200px] w-auto rounded-lg object-contain md:h-[350px]"
            />
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}

export default ScreenshotSwiper
