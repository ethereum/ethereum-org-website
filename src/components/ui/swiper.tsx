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

import { Button, type ButtonProps } from "./buttons/Button"

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

const SwiperNavButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      className={cn("px-2", className)}
      {...props}
    >
      {children}
    </Button>
  )
)
SwiperNavButton.displayName = "SwiperNavButton"

const SwiperNextButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <SwiperNavButton
      ref={ref}
      className={cn("ui-swiper-button-next", className)}
      {...props}
    >
      {children || <ChevronNext />}
    </SwiperNavButton>
  )
)
SwiperNextButton.displayName = "SwiperNextButton"

const SwiperPrevButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <SwiperNavButton
      ref={ref}
      className={cn("ui-swiper-button-prev", className)}
      {...props}
    >
      {children || <ChevronPrev />}
    </SwiperNavButton>
  )
)
SwiperPrevButton.displayName = "SwiperPrevButton"

const SwiperPaginationDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ui-swiper-pagination flex w-fit flex-row",
      "[&_.swiper-pagination-bullet]:bg-primary-high-contrast",
      "[&_.swiper-pagination-bullet-active]:bg-primary-hover",
      className
    )}
    {...props}
  />
))
SwiperPaginationDots.displayName = "SwiperPaginationDots"

const SwiperNavContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto mt-6 flex h-6 w-fit items-center gap-4 rounded-full bg-background-highlight",
      className
    )}
    {...props}
  />
))
SwiperNavContainer.displayName = "SwiperNavContainer"

type SwiperProps = SwiperReactProps & {
  navigation?: React.ReactNode
  children: React.ReactNode[]
}
const Swiper = React.forwardRef<SwiperRef, SwiperProps>(
  ({ children, navigation, ...props }, ref) => {
    const { t } = useTranslation("common")
    return (
      <SwiperReact
        ref={ref}
        navigation={{
          nextEl: ".ui-swiper-button-next",
          prevEl: ".ui-swiper-button-prev",
        }}
        a11y={{
          prevSlideMessage: t("previous"),
          nextSlideMessage: t("next"),
        }}
        pagination={{
          clickable: true,
          el: ".ui-swiper-pagination",
        }}
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
        {navigation || (
          <SwiperNavContainer>
            <SwiperPrevButton />
            <SwiperPaginationDots />
            <SwiperNextButton />
          </SwiperNavContainer>
        )}
      </SwiperReact>
    )
  }
)
Swiper.displayName = "Swiper"

export {
  Swiper,
  SwiperContainer,
  SwiperNavButton,
  SwiperNavContainer,
  SwiperNextButton,
  SwiperPaginationDots,
  SwiperPrevButton,
}
