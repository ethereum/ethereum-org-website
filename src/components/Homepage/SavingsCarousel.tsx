"use client"

import { useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
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

import borrowingImage from "@/public/images/homepage/savings/borrowing.png"
import defiImage from "@/public/images/homepage/savings/defi.png"
import remittancesImage from "@/public/images/homepage/savings/remittances.png"

type ApyData = {
  traditional: {
    label: string
    apy: number
  }
  ethereum: {
    label: string
    apyMin: number
    apyMax: number
  }
}

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
  description: string
  cta: string
  href: string
  image: typeof defiImage
  comparison: ComparisonData | "apy"
}

const slides: Slide[] = [
  {
    id: "defi",
    tag: "SAVINGS & INTEREST",
    title: "Ownership has financial benefits too",
    subtitle: "When there's no broker taking a cut, you gain more.",
    description:
      "Earn higher interest on funds using lending apps on Ethereum. You can withdraw your money 24/7.",
    cta: "See DeFi →",
    href: "/defi/",
    image: defiImage,
    comparison: "apy",
  },
  {
    id: "remittances",
    tag: "CROSS-BORDER PAYMENTS",
    title: "Send money home in 12 minutes",
    subtitle: "Skip the $50 wire fee and the 5+ day wait.",
    description:
      "Send stablecoins for just $0.2, and your family receives the funds almost instantly.",
    cta: "Send money →",
    href: "/stablecoins/",
    image: remittancesImage,
    comparison: {
      traditional: { label: "WIRE TRANSFER", value: "3-5 days" },
      ethereum: { label: "ETHEREUM", value: "12 minutes" },
    },
  },
  {
    id: "borrowing",
    tag: "FINANCIAL ACCESS",
    title: "Borrow without credit history",
    subtitle: "You don't need a credit score to get started.",
    description:
      "Using DeFi apps on Ethereum, you can provide collateral and access credit instantly, no permission required.",
    cta: "Try it yourself →",
    href: "/defi/",
    image: borrowingImage,
    comparison: {
      traditional: {
        label: "TRADITIONAL BANK",
        value: "Credit checks",
        smallText: true,
      },
      ethereum: {
        label: "ON ETHEREUM",
        value: "Based on collateral",
        smallText: true,
      },
    },
  },
]

const getComparison = (slide: Slide, apyData: ApyData): ComparisonData => {
  if (slide.comparison === "apy") {
    return {
      traditional: {
        label: apyData.traditional.label,
        value: `${apyData.traditional.apy}%`,
        suffix: "APY",
      },
      ethereum: {
        label: apyData.ethereum.label,
        value: `${apyData.ethereum.apyMin}-${apyData.ethereum.apyMax}%`,
        suffix: "APY",
      },
    }
  }
  return slide.comparison
}

type SavingsCarouselProps = {
  apyData: ApyData
  className?: string
}

type SlideContentProps = {
  slide: Slide
  apyData: ApyData
  isActive: boolean
}

const DesktopSlideContent = ({
  slide,
  apyData,
  isActive,
}: SlideContentProps) => {
  const comparison = getComparison(slide, apyData)
  const traditionalControls = useAnimationControls()
  const ethereumControls = useAnimationControls()

  useEffect(() => {
    if (isActive) {
      traditionalControls.start({ opacity: 1, x: 0, y: 0 })
      ethereumControls.start({ opacity: 1, x: 0, y: 0 })
    } else {
      traditionalControls.set({ opacity: 0, x: -20, y: 10 })
      ethereumControls.set({ opacity: 0, x: -30, y: 15 })
    }
  }, [isActive, traditionalControls, ethereumControls])

  return (
    <div className="flex w-full flex-row items-center justify-between gap-16">
      <SectionContent className="flex max-w-[660px] flex-col gap-10">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">{slide.tag}</SectionTag>
          <SectionHeader className="!mb-0 !mt-0">{slide.title}</SectionHeader>
        </div>

        <div className="flex flex-col gap-6 text-lg leading-relaxed text-body-medium lg:text-2xl lg:leading-relaxed">
          <p>{slide.subtitle}</p>
          <p>{slide.description}</p>
        </div>

        <Link href={slide.href} className="no-underline">
          {slide.cta}
        </Link>
      </SectionContent>

      <div className="relative shrink-0 md:w-96 lg:w-128">
        <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[700px]">
          <div className="absolute inset-y-0 right-0 w-full overflow-hidden rounded-4xl">
            <Image
              src={slide.image}
              alt=""
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={90}
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={traditionalControls}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="absolute -left-8 bottom-40 z-10 hidden w-[250px] flex-col justify-center rounded-3xl border bg-background px-6 py-4 shadow-lg md:flex lg:-left-12 lg:bottom-44 lg:w-[269px]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-body-medium lg:text-sm">
              {comparison.traditional.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-bold",
                  comparison.traditional.smallText
                    ? "text-2xl lg:text-3xl"
                    : "text-4xl lg:text-5xl"
                )}
              >
                {comparison.traditional.value}
              </span>
              {comparison.traditional.suffix && (
                <span className="text-base md:text-lg">
                  {comparison.traditional.suffix}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30, y: 15 }}
            animate={ethereumControls}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="absolute -left-12 bottom-10 z-10 hidden w-[280px] flex-col justify-center rounded-3xl bg-gradient-to-b from-[#5c1eb4] to-[#7b3fd8] px-6 py-4 text-white shadow-lg md:flex lg:-left-16 lg:w-[339px]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider lg:text-sm">
              {comparison.ethereum.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-bold",
                  comparison.ethereum.smallText
                    ? "text-2xl lg:text-3xl"
                    : "text-4xl lg:text-5xl"
                )}
              >
                {comparison.ethereum.value}
              </span>
              {comparison.ethereum.suffix && (
                <span className="text-base md:text-lg">
                  {comparison.ethereum.suffix}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const MobileSlideContent = ({
  slide,
  apyData,
  isActive,
}: SlideContentProps) => {
  const comparison = getComparison(slide, apyData)
  const traditionalControls = useAnimationControls()
  const ethereumControls = useAnimationControls()

  useEffect(() => {
    if (isActive) {
      traditionalControls.start({ opacity: 1, y: 0 })
      ethereumControls.start({ opacity: 1, y: 0 })
    } else {
      traditionalControls.set({ opacity: 0, y: 10 })
      ethereumControls.set({ opacity: 0, y: 15 })
    }
  }, [isActive, traditionalControls, ethereumControls])

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full overflow-hidden rounded-4xl">
        <Image
          src={slide.image}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">{slide.tag}</SectionTag>
          <SectionHeader className="!mb-0 !mt-0 text-4xl sm:text-5xl">
            {slide.title}
          </SectionHeader>
        </div>

        <div className="flex flex-col gap-4 text-lg leading-relaxed text-body-medium">
          <p>{slide.subtitle}</p>
          <p>{slide.description}</p>
        </div>

        <Link href={slide.href} className="no-underline">
          {slide.cta}
        </Link>

        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={traditionalControls}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center rounded-2xl border bg-background px-5 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-body-medium">
              {comparison.traditional.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-bold",
                  comparison.traditional.smallText ? "text-2xl" : "text-4xl"
                )}
              >
                {comparison.traditional.value}
              </span>
              {comparison.traditional.suffix && (
                <span className="text-base">
                  {comparison.traditional.suffix}
                </span>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={ethereumControls}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="flex flex-col justify-center rounded-2xl bg-gradient-to-b from-[#5c1eb4] to-[#7b3fd8] px-5 py-4 text-white"
          >
            <p className="text-xs font-semibold uppercase tracking-wider">
              {comparison.ethereum.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-bold",
                  comparison.ethereum.smallText ? "text-2xl" : "text-4xl"
                )}
              >
                {comparison.ethereum.value}
              </span>
              {comparison.ethereum.suffix && (
                <span className="text-base">{comparison.ethereum.suffix}</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const SavingsCarousel = ({ apyData, className }: SavingsCarouselProps) => {
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  const handleDesktopSlideChange = (swiper: SwiperType) => {
    setDesktopActiveIndex(swiper.activeIndex)
  }

  const handleMobileSlideChange = (swiper: SwiperType) => {
    setMobileActiveIndex(swiper.activeIndex)
  }

  return (
    <div className={cn("w-full", className)}>
      <SwiperContainer
        className={cn(
          "hidden md:block",
          "[&_.swiper]:!flex [&_.swiper]:flex-col [&_.swiper]:gap-6"
        )}
      >
        <Swiper
          navigationPlacement="bottom"
          onSlideChange={handleDesktopSlideChange}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <DesktopSlideContent
                slide={slide}
                apyData={apyData}
                isActive={index === desktopActiveIndex}
              />
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>

      <SwiperContainer
        className={cn(
          "md:hidden",
          "[&_.swiper]:!flex [&_.swiper]:flex-col [&_.swiper]:gap-6"
        )}
      >
        <Swiper
          navigationPlacement="bottom"
          onSlideChange={handleMobileSlideChange}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <MobileSlideContent
                slide={slide}
                apyData={apyData}
                isActive={index === mobileActiveIndex}
              />
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}

export default SavingsCarousel
