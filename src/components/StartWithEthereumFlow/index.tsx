"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { SwiperRef } from "swiper/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { Wallet } from "@/lib/types"

import ConnectYourWallet from "@/components/StartWithEthereumFlow/ConnectYourWallet"
import DownloadAWallet from "@/components/StartWithEthereumFlow/DownloadAWallet"
import LetUseSomeApps from "@/components/StartWithEthereumFlow/LetUseSomeApps"
import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"

import { Skeleton, SkeletonLines } from "../ui/skeleton"

// Dynamically import Wagmi/RainbowKit components
const WalletProviders = dynamic(() => import("@/components/WalletProviders"), {
  ssr: false,
  loading: () => (
    <Skeleton className="grid h-[32rem] grid-cols-1 rounded-2xl bg-primary/20 p-12 md:grid-cols-2">
      <div className="">
        <SkeletonLines
          noOfLines={5}
          className="flex h-full flex-col justify-center opacity-20"
        />
      </div>
      <Skeleton className="h-full rounded-2xl bg-background" />
    </Skeleton>
  ),
})

const queryClient = new QueryClient()

const StartWithEthereumFlow = ({
  newToCryptoWallets,
  locale,
}: {
  newToCryptoWallets: Wallet[]
  locale: string
}) => {
  const swiperRef = useRef<SwiperRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [totalSlides, setTotalSlides] = useState(0)
  const [slideHeights, setSlideHeights] = useState<number[]>([0, 0, 0]) // Default values matching your slide count

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      updateSlideHeights(swiperRef.current.swiper)
    }
  }, [activeIndex]) // Re-check heights when active slide changes

  const handleInit = (swiper) => {
    setTotalSlides(swiper.slides.length)

    updateSlideHeights(swiper)

    const resizeObserver = new ResizeObserver(() => {
      updateSlideHeights(swiper)
    })

    swiper.slides.forEach((slide) => {
      resizeObserver.observe(slide)
    })

    swiper.on("destroy", () => {
      resizeObserver.disconnect()
    })
  }

  // Separate function to update slide heights
  const updateSlideHeights = (swiper) => {
    const heights = swiper.slides.map((slide) => slide.offsetHeight)
    setSlideHeights(heights)
  }

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex + 1)
  }

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext()

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      window.scrollTo({
        top: window.scrollY + containerRect.top - 90,
        behavior: "smooth",
      })
    }
  }

  const getStyleFromIndex = (index: number) => {
    const maxHeight = `calc(${slideHeights[activeIndex - 1]}px - ${activeIndex - 1 === index ? 0 : 100}px)`
    return { maxHeight }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProviders locale={locale}>
        <SwiperContainer
          ref={containerRef}
          className={cn(
            "-mx-8",
            "w-screen",
            "max-w-screen-2xl",
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
              <div style={getStyleFromIndex(0)}>
                <DownloadAWallet
                  handleNext={handleNext}
                  stepIndex={activeIndex}
                  totalSteps={totalSlides}
                  newToCryptoWallets={newToCryptoWallets}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
              className={cn(
                "from-[#f4fbfa] to-[#e8f6f5] dark:from-[#02100f] dark:to-[#000908]",
                "border border-[#b2e2de] bg-gradient-to-b p-4 sm:p-12 dark:border-[#083935] dark:bg-gradient-to-t"
              )}
            >
              <div style={getStyleFromIndex(1)}>
                <ConnectYourWallet
                  handleNext={handleNext}
                  stepIndex={activeIndex}
                  totalSteps={totalSlides}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
              className={cn(
                "from-[#ecf1fd] to-[#f6f8fe] dark:from-[#070c18] dark:to-[#02060f]",
                "border border-[#d7e1fc] bg-gradient-to-b p-4 sm:p-12 dark:border-[#192853] dark:bg-gradient-to-t"
              )}
            >
              <div style={getStyleFromIndex(2)}>
                <LetUseSomeApps
                  stepIndex={activeIndex}
                  totalSteps={totalSlides}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </SwiperContainer>
      </WalletProviders>
    </QueryClientProvider>
  )
}

export default StartWithEthereumFlow
