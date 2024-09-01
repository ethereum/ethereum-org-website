import { useTranslation } from "next-i18next"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Keyboard, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { SwiperOptions } from "swiper/types"

import { cn } from "@/lib/utils/cn"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type SlidingSwiperProps = {
  children: React.ReactNode[]
  options?: SwiperOptions
  className?: string
}
const SlidingSwiper = ({
  children,
  className,
  options,
}: SlidingSwiperProps) => {
  const { t } = useTranslation("common")
  return (
    <div className={cn("h-fit", className)}>
      <Swiper
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
        spaceBetween={32}
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={1}
        slidesPerGroup={1}
        {...options}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}

        <MdChevronLeft className="swiper-button-prev" />
        <div className="swiper-pagination" />
        <MdChevronRight className="swiper-button-next" />
      </Swiper>
    </div>
  )
}

export default SlidingSwiper
