"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeftRight, User } from "lucide-react"
import { useIntersectionObserver } from "usehooks-ts"

import { Section, SectionHeader, SectionTag } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

type KPISectionProps = {
  accountHolders: number
  transactionsToday: number
  className?: string
}

/**
 * Animated counter hook that counts up from 0 to target value
 * Respects prefers-reduced-motion and only animates once when visible
 */
function useAnimatedCounter(
  target: number,
  isVisible: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // If reduced motion or already animated, show final value immediately
    if (prefersReducedMotion || hasAnimated.current) {
      setCount(target)
      return
    }

    // Only animate when visible
    if (!isVisible) return

    hasAnimated.current = true

    const startTime = performance.now()
    const startValue = 0

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(
        startValue + (target - startValue) * easedProgress
      )

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target, isVisible, duration])

  return count
}

/**
 * Format large numbers with M/B suffix
 */
function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}M`
  }
  if (value >= 1_000) {
    return new Intl.NumberFormat("en-US").format(value)
  }
  return value.toString()
}

/**
 * Format transaction count with spaces (European style: 21 400 433)
 */
function formatTransactions(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

/**
 * AnimatedNumber component - renders animated value with stable width
 * Uses a phantom element to reserve space for the final value
 */
function AnimatedNumber({
  value,
  finalValue,
  formatter,
  className,
}: {
  value: number
  finalValue: number
  formatter: (n: number) => string
  className?: string
}) {
  return (
    <p className={cn("relative whitespace-nowrap", className)}>
      {/* Phantom element - reserves width for final value, fully hidden */}
      <span className="opacity-0" aria-hidden="true">
        {formatter(finalValue)}
      </span>
      {/* Animated value - positioned on top, no width constraint */}
      <span className="absolute left-0 top-0">{formatter(value)}</span>
    </p>
  )
}

const KPISection = ({
  accountHolders,
  transactionsToday,
  className,
}: KPISectionProps) => {
  const { ref: sectionRef, isIntersecting: isVisible } =
    useIntersectionObserver({
      threshold: 0.3,
      freezeOnceVisible: true,
    })

  const animatedTransactions = useAnimatedCounter(
    transactionsToday,
    isVisible,
    2500
  )

  return (
    <Section
      ref={sectionRef}
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div className="flex w-full flex-col gap-10 lg:max-w-[823px]">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">The user-owned internet</SectionTag>

          <SectionHeader className="!mb-0 !mt-0">
            Ethereum gives back control of your assets
          </SectionHeader>
        </div>

        <p className="text-lg leading-relaxed text-body-medium lg:text-2xl lg:leading-[39px]">
          Your bank account is an entry in someone else&apos;s database. Your
          application is a file in someone else&apos;s server. Ethereum is an
          alternative network where you hold your assets directly.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
        <div className="hidden h-[267px] w-px bg-border lg:block" />

        <div className="flex w-[243px] flex-col gap-8">
          <div className="flex items-start gap-3">
            <User
              className="mt-[5.5px] size-8 text-body-medium"
              strokeWidth={1.5}
            />
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-bold leading-[1.2]">
                {formatNumber(accountHolders)}
              </p>
              <p className="text-base leading-[1.6] text-body-medium">
                ETH holders
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ArrowLeftRight
              className="mt-[5.5px] size-8 text-body-medium"
              strokeWidth={1.5}
            />
            <div className="flex flex-col gap-1">
              <AnimatedNumber
                value={animatedTransactions}
                finalValue={transactionsToday}
                formatter={formatTransactions}
                className="text-4xl font-bold leading-[1.2]"
              />
              <p className="text-base leading-[1.6] text-body-medium">
                Transactions today
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default KPISection
