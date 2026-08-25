"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("page-apps")
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
        // Swiper's `overflow: hidden` sits flush to the slides and would clip the
        // hover/focus outline; pad the clip box, cancel with the margin.
        className="-m-1 p-1"
      >
        {screenshots.map((screenshot, index) => (
          // me-4 duplicates spaceBetween, which Swiper only applies as an inline
          // margin once initialized -- without it the slides touch on first paint.
          <SwiperSlide key={index} className="me-4 w-auto!">
            {/* Accessible name comes from the sharp image's alt. overflow-hidden clips
                both copies to the border radius; it does not clip the outline. */}
            <button
              type="button"
              // --tile-h drives both the height and the 16:9 max width, so the tile
              // never grows wider than widescreen and a pre-load box is already 16:9.
              className="relative isolate overflow-hidden rounded-base border bg-background [--tile-h:--spacing(50)] hover:outline-2 hover:outline-primary-hover focus-visible:outline-2 focus-visible:outline-primary-hover md:[--tile-h:--spacing(87.5)]"
              onClick={() => {
                handleImageClick(index)
                trackCustomEvent({
                  eventCategory: "detail",
                  eventAction: "gallery_open",
                  eventName: `app name ${appName}`,
                })
              }}
            >
              {/* Blurred low-res backdrop fills the letterbox left by object-contain.
                  Decorative, so it stays out of the accessibility tree. */}
              <Image
                src={screenshot}
                alt=""
                aria-hidden
                width={640}
                height={360}
                sizes="64px"
                className="absolute inset-0 -z-10 size-full scale-110 object-cover blur-xl"
              />
              <Image
                src={screenshot}
                alt={t("page-apps-gallery-screenshot-alt", {
                  index: index + 1,
                  appName,
                })}
                // 16:9 so the loading box matches the tile it resolves into.
                width={640}
                height={360}
                sizes="(max-width: 640px) 356px, 622px"
                className="h-(--tile-h) w-auto max-w-[calc(var(--tile-h)*16/9)] object-contain"
              />
            </button>
          </SwiperSlide>
        ))}
        {screenshots.length > 1 && <SwiperNavigation />}
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
        title={t("page-apps-gallery-modal-title", { appName })}
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
                      alt={t("page-apps-gallery-screenshot-alt", {
                        index: index + 1,
                        appName,
                      })}
                      width={800}
                      height={1200}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                      className="max-h-[60vh] w-auto rounded-base object-contain md:max-h-[70vh]"
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
