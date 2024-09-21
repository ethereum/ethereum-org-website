import * as React from "react"
import { useTranslation } from "next-i18next"
import { EffectCards, Keyboard, Navigation, Pagination } from "swiper/modules"
import {
  Swiper as SwiperReact,
  type SwiperProps as SwiperReactProps,
  SwiperRef,
  SwiperSlide,
} from "swiper/react"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"

import { cn } from "@/lib/utils/cn"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-cards"

const SwiperContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("h-fit", className)} {...props} />
))
SwiperContainer.displayName = "SwiperContainer"

type SwiperProps = SwiperReactProps & {
  children: React.ReactNode[]
}
const Swiper = React.forwardRef<SwiperRef, SwiperProps>(
  ({ children, ...props }, ref) => {
    const { t } = useTranslation("common")
    return (
      <SwiperReact
        ref={ref}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        a11y={{
          prevSlideMessage: t("previous"),
          nextSlideMessage: t("next"),
        }}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        keyboard
        modules={[Navigation, Pagination, Keyboard, EffectCards]}
        slidesPerView={1}
        slidesPerGroup={1}
        lazyPreloadPrevNext={0}
        slideClass="swiper-slide"
        {...props}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}

        <ChevronPrev className="swiper-button-prev" />
        <div className="swiper-pagination" />
        <ChevronNext className="swiper-button-next" />
      </SwiperReact>
    )
  }
)
Swiper.displayName = "Swiper"

export { Swiper, SwiperContainer }
