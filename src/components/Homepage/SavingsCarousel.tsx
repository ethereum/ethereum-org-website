"use client"

import { useEffect, useState } from "react"
import { AnimationControls, motion, useAnimationControls } from "framer-motion"
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

const APY_DATA = {
  traditional: {
    label: "Traditional Savings",
    apy: 0.5,
  },
  ethereum: {
    label: "Ethereum Apps",
    apyMin: 4,
    apyMax: 8,
  },
} as const

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
    href: "/apps/categories/defi/",
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

const getComparison = (slide: Slide): ComparisonData => {
  if (slide.comparison === "apy") {
    return {
      traditional: {
        label: APY_DATA.traditional.label,
        value: `${APY_DATA.traditional.apy}%`,
        suffix: "APY",
      },
      ethereum: {
        label: APY_DATA.ethereum.label,
        value: `${APY_DATA.ethereum.apyMin}-${APY_DATA.ethereum.apyMax}%`,
        suffix: "APY",
      },
    }
  }
  return slide.comparison
}

type SavingsCarouselProps = {
  className?: string
}

type ComparisonCardProps = {
  item: ComparisonItem
  variant: "traditional" | "ethereum"
  controls: AnimationControls
  initial: { opacity: number; x?: number; y: number }
  transition: { duration: number; delay: number; ease: string }
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
  const isEthereum = variant === "ethereum"

  return (
    <motion.div
      initial={initial}
      animate={controls}
      transition={transition}
      className={cn(
        "flex flex-col justify-center px-5 py-4 md:px-6",
        // Mobile: stacked cards
        "rounded-2xl md:rounded-3xl",
        // Desktop: absolutely positioned with shadow
        isEthereum
          ? "bg-gradient-to-b from-[#5c1eb4] to-[#7b3fd8] text-white md:shadow-lg"
          : "border bg-background md:shadow-lg",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wider lg:text-sm",
          !isEthereum && "text-body-medium"
        )}
      >
        {item.label}
      </p>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-bold",
            item.smallText ? "text-2xl lg:text-3xl" : "text-4xl lg:text-5xl"
          )}
        >
          {item.value}
        </span>
        {item.suffix && (
          <span className="text-base md:text-lg">{item.suffix}</span>
        )}
      </div>
    </motion.div>
  )
}

type SlideContentProps = {
  slide: Slide
  isActive: boolean
}

const SlideContent = ({ slide, isActive }: SlideContentProps) => {
  const comparison = getComparison(slide)
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
          <SectionHeader className="!mb-0 !mt-0 text-4xl sm:text-5xl md:text-6xl">
            {slide.title}
          </SectionHeader>
        </div>

        <div className="flex flex-col gap-4 text-lg leading-relaxed text-body-medium md:gap-6 lg:text-2xl lg:leading-relaxed">
          <p>{slide.subtitle}</p>
          <p>{slide.description}</p>
        </div>

        <Link href={slide.href} className="no-underline">
          {slide.cta}
        </Link>

        {/* Mobile comparison cards - stacked below content */}
        <div className="flex flex-col gap-3 md:hidden">
          <ComparisonCard
            item={comparison.traditional}
            variant="traditional"
            controls={traditionalControls}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          />
          <ComparisonCard
            item={comparison.ethereum}
            variant="ethereum"
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
              quality={90}
              className="h-full w-full object-cover"
            />
          </div>

          <ComparisonCard
            item={comparison.traditional}
            variant="traditional"
            controls={traditionalControls}
            initial={{ opacity: 0, x: -20, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="absolute -left-8 bottom-40 z-10 w-[250px] lg:-left-12 lg:bottom-44 lg:w-[269px]"
          />
          <ComparisonCard
            item={comparison.ethereum}
            variant="ethereum"
            controls={ethereumControls}
            initial={{ opacity: 0, x: -30, y: 15 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="absolute -left-12 bottom-10 z-10 w-[280px] lg:-left-16 lg:w-[339px]"
          />
        </div>
      </div>
    </div>
  )
}

const SavingsCarousel = ({ className }: SavingsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
  }

  return (
    <div className={cn("w-full", className)}>
      <SwiperContainer className="[&_.swiper]:!flex [&_.swiper]:flex-col [&_.swiper]:gap-6">
        <Swiper navigationPlacement="bottom" onSlideChange={handleSlideChange}>
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <SlideContent slide={slide} isActive={index === activeIndex} />
            </SwiperSlide>
          ))}
          <SwiperNavigation />
        </Swiper>
      </SwiperContainer>
    </div>
  )
}

export default SavingsCarousel
