"use client"

import { Image } from "@/components/Image"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

interface ScreenshotSwiperProps {
  screenshots: string[]
  dappName: string
}

const ScreenshotSwiper = ({ screenshots, dappName }: ScreenshotSwiperProps) => {
  return (
    <SwiperContainer>
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
      >
        {screenshots.map((screenshot, index) => (
          <SwiperSlide key={screenshot}>
            <Image
              src={screenshot}
              alt={`Screenshot ${index + 1} of ${dappName} showing the application interface`}
              width={340}
              height={700}
              className="h-[350px] w-[170px] rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}

export default ScreenshotSwiper
