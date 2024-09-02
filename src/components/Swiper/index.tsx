import { useTranslation } from "next-i18next"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { EffectCards, Keyboard, Navigation, Pagination } from "swiper/modules"
import { Swiper as SwiperParent, SwiperSlide } from "swiper/react"
import type { SwiperOptions } from "swiper/types"

import { cn } from "@/lib/utils/cn"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-cards"

type SwiperProps = {
  children: React.ReactNode[]
  options?: SwiperOptions
  className?: string
  swiperClass?: string
  sliderClass?: string
}
const Swiper = ({
  children,
  className,
  swiperClass,
  sliderClass,
  options,
}: SwiperProps) => {
  const { t } = useTranslation("common")
  return (
    <div className={cn("h-fit", className)}>
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
        className={swiperClass}
        {...options}
      >
        {children.map((child, index) => (
          <SwiperSlide className={sliderClass} key={index}>
            {child}
          </SwiperSlide>
        ))}

        <MdChevronLeft className="swiper-button-prev" />
        <div className="swiper-pagination" />
        <MdChevronRight className="swiper-button-next" />
      </SwiperParent>
    </div>
  )
}

export default Swiper
