"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { Swiper as SwiperType } from "swiper"
import type { SwiperRef } from "swiper/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { Wallet } from "@/lib/types"

import { Skeleton, SkeletonLines } from "@/components/ui/skeleton"
import { Swiper, SwiperContainer, SwiperSlide } from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"

import ConnectYourWallet from "./ConnectYourWallet"
import DownloadAWallet from "./DownloadAWallet"
import LetUseSomeApps from "./LetUseSomeApps"

// Dynamically import Wagmi/RainbowKit components
const WalletProviders = dynamic(() => import("@/components/WalletProviders"), {
  ssr: false,
  loading: () => (
    <Skeleton className="grid h-[32rem] grid-cols-1 rounded-base bg-primary/20 p-12 md:grid-cols-2">
      <div className="">
        <SkeletonLines
          noOfLines={5}
          className="flex h-full flex-col justify-center opacity-20"
        />
      </div>
      <Skeleton className="h-full rounded-base bg-background" />
    </Skeleton>
  ),
})

const queryClient = new QueryClient()

const StartWithEthereumFlow = ({
  newToCryptoWallets,
}: {
  newToCryptoWallets: Wallet[]
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

  const handleInit = (swiper: SwiperType) => {
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
  const updateSlideHeights = (swiper: SwiperType) => {
    const heights = swiper.slides.map((slide) => slide.offsetHeight)
    setSlideHeights(heights)
  }

  const handleSlideChange = (swiper: SwiperType) => {
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
    // Active slide renders at natural height so the card's padding is fully
    // respected. Only inactive slides are clamped shorter (and clipped by the
    // slide's overflow-hidden) so they peek out behind the active card.
    if (activeIndex - 1 === index) return {}
    const maxHeight = `calc(${slideHeights[activeIndex - 1]}px - 100px)`
    return { maxHeight }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProviders>
        <SwiperContainer
          ref={containerRef}
          className={cn(
            "-mx-page",
            "w-screen",
            "max-w-screen-2xl",
            "px-page",
            // Cards effect requires overflow-hidden on slides: the maxHeight
            // stacking trick (getStyleFromIndex) only hides inactive-slide
            // content if it's clipped
            "[&_.swiper-slide]:overflow-hidden [&_.swiper-slide]:rounded-base",
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
                "bg-background from-primary/10 to-primary/5",
                "border border-primary/10 bg-linear-to-r p-4 sm:p-12"
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
                "bg-background from-accent-a/10 to-accent-a/5",
                "border border-accent-a/10 bg-linear-to-b p-4 sm:p-12"
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
                "bg-background from-accent-b/10 to-accent-b/5",
                "border border-accent-b/10 bg-linear-to-b p-4 sm:p-12"
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
