"use client"

import { useState } from "react"

import { Image } from "@/components/Image"
import Modal from "@/components/ui/dialog-modal"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

interface ScreenshotSwiperProps {
  screenshots: string[]
  appName: string
}

const ScreenshotSwiper = ({ screenshots, appName }: ScreenshotSwiperProps) => {
  const lazyPreloadPrevNext = useBreakpointValue({ base: 1, sm: 2, md: 4 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  )

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

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
              className="h-[200px] w-auto cursor-pointer rounded-lg object-contain transition-transform hover:scale-105 md:h-[350px]"
              onClick={() => {
                handleImageClick(index)
                trackCustomEvent({
                  eventCategory: "detail",
                  eventAction: "gallery_open",
                  eventName: `app name ${appName}`,
                })
              }}
            />
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>

      <Modal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) {
            setCurrentImageIndex(null)
          }
        }}
        size="xl"
        title={`${appName} Screenshots`}
        contentProps={{
          className: "max-w-[95vw] max-h-[95vh] p-2 md:p-8",
        }}
      >
        <div className="relative">
          <SwiperContainer>
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              initialSlide={currentImageIndex ?? 0}
            >
              {screenshots.map((screenshot, index) => (
                <SwiperSlide key={index} className="!w-full">
                  <div className="flex items-center justify-center">
                    <Image
                      src={screenshot}
                      alt={`Screenshot ${index + 1} of ${appName}`}
                      width={800}
                      height={1200}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                      className="max-h-[60vh] w-auto rounded-lg object-contain md:max-h-[70vh]"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <SwiperNavigation />
            </Swiper>
          </SwiperContainer>
        </div>
      </Modal>
    </SwiperContainer>
  )
}

export default ScreenshotSwiper
