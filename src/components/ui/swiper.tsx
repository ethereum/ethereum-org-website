import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"
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
      "mx-auto flex h-6 w-fit items-center gap-4 rounded-full bg-background-highlight",
      className
    )}
    {...props}
  />
))
SwiperNavContainer.displayName = "SwiperNavContainer"

const SwiperNavigation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <SwiperNavContainer ref={ref} {...props}>
    <SwiperPrevButton />
    <SwiperPaginationDots />
    <SwiperNextButton />
  </SwiperNavContainer>
))
SwiperNavigation.displayName = "SwiperNavigation"

const variants = cva("!flex gap-y-6", {
  variants: {
    navigationPlacement: {
      top: "flex-col-reverse",
      bottom: "flex-col",
    },
  },
  defaultVariants: {
    navigationPlacement: "bottom",
  },
})

export type SwiperProps = SwiperReactProps & VariantProps<typeof variants>
const Swiper = React.forwardRef<SwiperRef, SwiperProps>(
  ({ className, children, navigationPlacement, ...props }, ref) => {
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
        className={cn(variants({ navigationPlacement, className }))}
        {...props}
      >
        {children}
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
  SwiperNavigation,
  SwiperNextButton,
  SwiperPaginationDots,
  SwiperPrevButton,
  SwiperSlide,
}
