import { useTranslation } from "next-i18next"
import { EffectCards, Keyboard, Navigation, Pagination } from "swiper/modules"
import {
  Swiper as SwiperParent,
  type SwiperProps as SwiperParentProps,
  SwiperSlide,
} from "swiper/react"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"

import { cn } from "@/lib/utils/cn"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-cards"

type SwiperProps = SwiperParentProps & {
  children: React.ReactNode[]
  /**
   * Additional class names for the container element.
   */
  containerClassName?: string
  /**
   * Additional class names for the slider element.
   */
  sliderClass?: string
}

const Swiper = ({
  children,
  containerClassName,
  sliderClass,
  ...props
}: SwiperProps) => {
  const { t } = useTranslation("common")
  return (
    <div className={cn("h-fit", containerClassName)}>
      <SwiperParent
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        a11y={{
          prevSlideMessage: t("previous"),
          nextSlideMessage: t("next"),
        }}
        pagination={{ clickable: true }}
        keyboard
        modules={[Navigation, Pagination, Keyboard, EffectCards]}
        slidesPerView={1}
        slidesPerGroup={1}
        {...props}
      >
        {children.map((child, index) => (
          <SwiperSlide className={sliderClass} key={index}>
            {child}
          </SwiperSlide>
        ))}

        <ChevronPrev className="swiper-button-prev" />
        <div className="swiper-pagination" />
        <ChevronNext className="swiper-button-next" />
      </SwiperParent>
    </div>
  )
}

export default Swiper
