"use client"

import { useEffect, useState } from "react"
import { motion, useAnimationControls } from "motion/react"
import { useLocale, useTranslations } from "next-intl"
import type { Swiper as SwiperType } from "swiper"
import { SwiperSlide } from "swiper/react"

import { Image } from "@/components/Image"
import Link from "@/components/ui/Link"
import {
  SectionContent,
  SectionHeader,
  SectionTag,
} from "@/components/ui/section"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
} from "@/components/ui/swiper"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { formatPriceUSD, numberFormat } from "@/lib/utils/numbers"

import FloatingCard from "./FloatingCard"

import borrowingImage from "@/public/images/homepage/savings/borrowing.png"
import defiImage from "@/public/images/homepage/savings/defi.png"
import remittancesImage from "@/public/images/homepage/savings/remittances.png"

type ComparisonItem = {
  label: string
  value: string
  suffix?: string
  smallText?: boolean
}

type ComparisonData = {
  traditional: ComparisonItem
  ethereum: ComparisonItem
}

type Slide = {
  id: string
  tag: string
  title: string
  subtitle: string
  description: string | React.ReactNode
  cta: string
  href: string
  image: typeof defiImage
  comparison: ComparisonData
}

function useSlides(): Slide[] {
  const t = useTranslations("page-index")
  const locale = useLocale()

  const fmt = (value: number, options?: Intl.NumberFormatOptions) =>
    numberFormat(locale, options).format(value)

  const wireFee = fmt(50, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
  const txFee = formatPriceUSD(0.02, locale)
  const twelve = fmt(12)

  return [
    {
      id: "privacy",
      tag: t("page-index-carousel-privacy-tag"),
      title: t("page-index-carousel-privacy-title"),
      subtitle: t("page-index-carousel-privacy-subtitle"),
      description: t("page-index-carousel-privacy-description"),
      cta: t("page-index-carousel-privacy-cta"),
      href: "/apps/categories/privacy/",
      image: defiImage,
      comparison: {
        traditional: {
          label: t("page-index-carousel-privacy-traditional-label"),
          value: t("page-index-carousel-privacy-traditional-value"),
          smallText: true,
        },
        ethereum: {
          label: t("page-index-carousel-privacy-ethereum-label"),
          value: t("page-index-carousel-privacy-ethereum-value"),
          smallText: true,
        },
      },
    },
    {
      id: "remittances",
      tag: t("page-index-carousel-remittances-tag"),
      title: t("page-index-carousel-remittances-title", { minutes: twelve }),
      subtitle: t("page-index-carousel-remittances-subtitle", {
        wireFee,
        days: fmt(5),
      }),
      description: t.rich("page-index-carousel-remittances-description", {
        txFee,
        stablecoinsLink: (chunks) => (
          <Link
            href="/stablecoins/"
            className="no-underline"
            customEventOptions={{
              eventCategory: "Homepage",
              eventAction: "section_click",
              eventName: "savings_carousel/stablecoins_inline",
            }}
          >
            {chunks}
          </Link>
        ),
      }),
      cta: t("page-index-carousel-remittances-cta"),
      href: "/payments/",
      image: remittancesImage,
      comparison: {
        traditional: {
          label: t("page-index-carousel-remittances-traditional-label"),
          value: t("page-index-carousel-remittances-traditional-value", {
            min: fmt(3),
            max: fmt(5),
          }),
        },
        ethereum: {
          label: t("page-index-carousel-remittances-ethereum-label"),
          value: t("page-index-carousel-remittances-ethereum-value", {
            minutes: twelve,
          }),
        },
      },
    },
    {
      id: "borrowing",
      tag: t("page-index-carousel-borrowing-tag"),
      title: t("page-index-carousel-borrowing-title"),
      subtitle: t("page-index-carousel-borrowing-subtitle"),
      description: t("page-index-carousel-borrowing-description"),
      cta: t("page-index-carousel-borrowing-cta"),
      href: "/defi/",
      image: borrowingImage,
      comparison: {
        traditional: {
          label: t("page-index-carousel-borrowing-traditional-label"),
          value: t("page-index-carousel-borrowing-traditional-value"),
          smallText: true,
        },
        ethereum: {
          label: t("page-index-carousel-borrowing-ethereum-label"),
          value: t("page-index-carousel-borrowing-ethereum-value"),
          smallText: true,
        },
      },
    },
  ]
}

type SavingsCarouselProps = {
  className?: string
  eventCategory?: string
}

type ComparisonCardProps = {
  item: ComparisonItem
  variant: "default" | "primary"
  controls: ReturnType<typeof useAnimationControls>
  initial: { opacity: number; x?: number; y: number }
  transition: { duration: number; delay: number; ease: "easeOut" }
  className?: string
}

const ComparisonCard = ({
  item,
  variant,
  controls,
  initial,
  transition,
  className,
}: ComparisonCardProps) => {
  const isPrimary = variant === "primary"

  return (
    <motion.div
      initial={initial}
      animate={controls}
      transition={transition}
      className={className}
    >
      <FloatingCard variant={variant}>
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-wider",
            !isPrimary && "text-body-medium"
          )}
        >
          {item.label}
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              "font-bold",
              item.smallText ? "text-2xl" : "text-4xl lg:text-5xl"
            )}
          >
            {item.value}
          </span>
          {item.suffix && (
            <span className="text-base md:text-lg">{item.suffix}</span>
          )}
        </div>
      </FloatingCard>
    </motion.div>
  )
}

type SlideContentProps = {
  slide: Slide
  isActive: boolean
  eventCategory: string
}

const SlideContent = ({
  slide,
  isActive,
  eventCategory,
}: SlideContentProps) => {
  const comparison = slide.comparison
  const traditionalControls = useAnimationControls()
  const ethereumControls = useAnimationControls()

  useEffect(() => {
    if (isActive) {
      // Mobile: animate Y only; Desktop: animate X and Y
      traditionalControls.start({ opacity: 1, x: 0, y: 0 })
      ethereumControls.start({ opacity: 1, x: 0, y: 0 })
    } else {
      // Desktop uses x offset, mobile doesn't (hidden via CSS anyway)
      traditionalControls.set({ opacity: 0, x: -20, y: 10 })
      ethereumControls.set({ opacity: 0, x: -30, y: 15 })
    }
  }, [isActive, traditionalControls, ethereumControls])

  return (
    <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-16">
      {/* Content section - appears second on mobile, first on desktop */}
      <SectionContent className="order-2 flex flex-col gap-6 md:order-1 md:max-w-[660px] md:gap-10">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">{slide.tag}</SectionTag>
          <SectionHeader className="!mb-0 !mt-0 md:text-6xl">
            {slide.title}
          </SectionHeader>
        </div>

        <div className="flex flex-col gap-4 text-lg leading-relaxed text-body-medium md:gap-6 lg:text-2xl lg:leading-relaxed">
          <p>{slide.subtitle}</p>
          <p>{slide.description}</p>
        </div>

        <Link
          href={slide.href}
          className="no-underline"
          customEventOptions={{
            eventCategory,
            eventAction: "section_click",
            eventName: `savings_carousel/${slide.id}`,
          }}
        >
          {slide.cta}
        </Link>

        {/* Mobile comparison cards - stacked below content */}
        <div className="flex flex-col gap-5 md:hidden">
          <ComparisonCard
            item={comparison.traditional}
            variant="default"
            controls={traditionalControls}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          />
          <ComparisonCard
            item={comparison.ethereum}
            variant="primary"
            controls={ethereumControls}
            initial={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          />
        </div>
      </SectionContent>

      {/* Image section - appears first on mobile, second on desktop */}
      <div className="relative order-1 shrink-0 md:order-2 md:w-96 lg:w-128">
        {/* Mobile: simple rounded image */}
        <div className="w-full overflow-hidden rounded-4xl md:hidden">
          <Image
            src={slide.image}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Desktop: image with overlapping comparison cards */}
        <div className="relative hidden min-h-[500px] md:block lg:min-h-[700px]">
          <div className="absolute inset-y-0 right-0 w-full overflow-hidden rounded-4xl">
            <Image
              src={slide.image}
              alt=""
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -start-12 bottom-10 z-10 flex flex-col gap-5 lg:-start-16">
            <ComparisonCard
              item={comparison.traditional}
              variant="default"
              controls={traditionalControls}
              initial={{ opacity: 0, x: -20, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="ms-4 w-[357px]"
            />
            <ComparisonCard
              item={comparison.ethereum}
              variant="primary"
              controls={ethereumControls}
              initial={{ opacity: 0, x: -30, y: 15 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
              className="w-[339px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const SavingsCarousel = ({
  className,
  eventCategory = "Homepage",
}: SavingsCarouselProps) => {
  const t = useTranslations("page-index")
  const slides = useSlides()
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
    trackCustomEvent({
      eventCategory,
      eventAction: "cta_swipe",
      eventName: String(swiper.activeIndex + 1),
    })
  }

  return (
    <section
      className={cn("w-full", className)}
      aria-roledescription="carousel"
      aria-label={t("page-index-carousel-label")}
    >
      <SwiperContainer className="[&_.swiper]:!flex [&_.swiper]:flex-col [&_.swiper]:gap-6">
        <Swiper
          navigationPlacement="bottom"
          onSlideChange={handleSlideChange}
          spaceBetween={32}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <SlideContent
                slide={slide}
                isActive={index === activeIndex}
                eventCategory={eventCategory}
              />
            </SwiperSlide>
          ))}
          <SwiperNavigation
            prevLabel={t("page-index-carousel-previous-slide")}
            nextLabel={t("page-index-carousel-next-slide")}
          />
        </Swiper>
      </SwiperContainer>
    </section>
  )
}

export default SavingsCarousel
