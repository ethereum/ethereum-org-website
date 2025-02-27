import { useRef, useState } from "react"
import type { SwiperRef } from "swiper/react"

import ConnectYourWallet from "@/components/StartWithEthereumFlow/ConnectYourWallet"
import DownloadAWallet from "@/components/StartWithEthereumFlow/DownloadAWallet"
import LetUseSomeApps from "@/components/StartWithEthereumFlow/LetUseSomeApps"
import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"

const StartWithEthereumFlow = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [totalSlides, setTotalSlides] = useState(0)

  const handleInit = (swiper) => {
    setTotalSlides(swiper.slides.length)
  }

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex + 1)
  }

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext()
  }

  return (
    <SwiperContainer
      className={cn(
        "-mx-8",
        "w-screen",
        "px-4 sm:px-8",
        "[&_.swiper-slide]:overflow-visible [&_.swiper-slide]:rounded-2xl",
        "[&_.swiper-slide]:min-h-[386px]",
        "[&_.swiper-slide-shadow]:!bg-transparent",
        "[&_.swiper]:mt-4 [&_.swiper]:!flex [&_.swiper]:h-fit [&_.swiper]:w-full [&_.swiper]:flex-col [&_.swiper]:items-center"
      )}
    >
      <Swiper
        ref={swiperRef}
        effect="cards"
        cardsEffect={{
          perSlideOffset: 6,
          perSlideRotate: 2,
          slideShadows: false,
        }}
        allowTouchMove={false}
        simulateTouch={false}
        preventInteractionOnTransition={true}
        onInit={handleInit}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide
          className={cn(
            "from-[#f4effe] to-[#faf6fe] dark:from-[#0f0a19] dark:to-[#0a0811]",
            "border border-[#ebe0fd] bg-gradient-to-r p-4 sm:p-12 dark:border-[#1c112f]"
          )}
        >
          <DownloadAWallet
            handleNext={handleNext}
            stepIndex={activeIndex}
            totalSteps={totalSlides}
          />
        </SwiperSlide>
        <SwiperSlide
          className={cn(
            "from-[#f4fbfa] to-[#e8f6f5] dark:from-[#02100f] dark:to-[#000908]",
            "border border-[#b2e2de] bg-gradient-to-b p-4 sm:p-12 dark:border-[#083935] dark:bg-gradient-to-t"
          )}
        >
          <ConnectYourWallet
            handleNext={handleNext}
            stepIndex={activeIndex}
            totalSteps={totalSlides}
          />
        </SwiperSlide>
        <SwiperSlide
          className={cn(
            "from-[#ecf1fd] to-[#f6f8fe] dark:from-[#070c18] dark:to-[#02060f]",
            "border border-[#d7e1fc] bg-gradient-to-b p-4 sm:p-12 dark:border-[#192853] dark:bg-gradient-to-t"
          )}
        >
          <LetUseSomeApps stepIndex={activeIndex} totalSteps={totalSlides} />
        </SwiperSlide>
      </Swiper>
    </SwiperContainer>
  )
}

export default StartWithEthereumFlow
